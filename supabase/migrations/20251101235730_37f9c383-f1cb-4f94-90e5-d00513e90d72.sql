-- Fix security warnings by setting search_path for functions

-- Update upsert_user_embedding function with security definer and search_path
create or replace function upsert_user_embedding(p_user_id uuid, p_vec vector)
returns void 
language plpgsql 
security definer
set search_path = public
as $$
begin
  insert into public.user_embeddings(user_id, embedding)
  values (p_user_id, p_vec)
  on conflict (user_id) do update set embedding = excluded.embedding;
end;
$$;

-- Update recs_by_user function with security definer and search_path
create or replace function recs_by_user(p_user_id uuid, p_kind text, p_limit int default 10)
returns table (
  id uuid,
  title text,
  description text,
  tags text[],
  kind text,
  popularity int,
  sim float8
) 
language plpgsql 
stable 
security definer
set search_path = public
as $$
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
$$;