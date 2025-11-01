-- Enable pgvector extension for embeddings
create extension if not exists vector;

-- Add new columns to existing user_profiles table
alter table public.user_profiles 
  add column if not exists stage text check (stage in ('high_school','university')),
  add column if not exists interests text[] default '{}',
  add column if not exists strengths text[] default '{}',
  add column if not exists target_roles text[] default '{}',
  add column if not exists lang text default 'ar';

-- Assessment answers storage (new table)
create table if not exists public.assessment_answers (
  id bigserial primary key,
  user_id uuid not null,
  question_id text not null,
  value jsonb not null,
  track text,
  created_at timestamptz default now()
);

alter table public.assessment_answers enable row level security;

create policy "Users can view their own answers"
  on public.assessment_answers for select
  using (auth.uid() = user_id);

create policy "Users can insert their own answers"
  on public.assessment_answers for insert
  with check (auth.uid() = user_id);

-- User events for behavior tracking (new table)
create table if not exists public.user_events (
  id bigserial primary key,
  user_id uuid,
  event_type text,
  payload jsonb,
  created_at timestamptz default now()
);

alter table public.user_events enable row level security;

create policy "Users can view their own events"
  on public.user_events for select
  using (auth.uid() = user_id);

create policy "Service can insert events"
  on public.user_events for insert
  with check (true);

-- Catalog items (majors, careers, courses) - new table
create table if not exists public.catalog_items (
  id uuid primary key default gen_random_uuid(),
  kind text check (kind in ('major','career','course')),
  title text not null,
  description text default '',
  tags text[] default '{}',
  country text,
  level text,
  popularity int default 0,
  embedding vector(1536)
);

alter table public.catalog_items enable row level security;

create policy "Catalog items are viewable by everyone"
  on public.catalog_items for select
  using (true);

-- User embeddings for personalization - new table
create table if not exists public.user_embeddings(
  user_id uuid primary key,
  embedding vector(1536)
);

alter table public.user_embeddings enable row level security;

create policy "Users can view their own embedding"
  on public.user_embeddings for select
  using (auth.uid() = user_id);

-- Function to upsert user embeddings
create or replace function upsert_user_embedding(p_user_id uuid, p_vec vector)
returns void as $$
begin
  insert into public.user_embeddings(user_id, embedding)
  values (p_user_id, p_vec)
  on conflict (user_id) do update set embedding = excluded.embedding;
end;
$$ language plpgsql security definer;

-- Function to get recommendations by user
create or replace function recs_by_user(p_user_id uuid, p_kind text, p_limit int default 10)
returns table (
  id uuid,
  title text,
  description text,
  tags text[],
  kind text,
  popularity int,
  sim float8
) as $$
begin
  return query
  select ci.id, ci.title, ci.description, ci.tags, ci.kind, ci.popularity,
         1 - (ci.embedding <=> ue.embedding) as sim
  from catalog_items ci
  join user_embeddings ue on ue.user_id = p_user_id
  where ci.kind = p_kind and ci.embedding is not null
  order by ci.embedding <=> ue.embedding asc, popularity desc
  limit p_limit;
end;
$$ language plpgsql stable security definer;