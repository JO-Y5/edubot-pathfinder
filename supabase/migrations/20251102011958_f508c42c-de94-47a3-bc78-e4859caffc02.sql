-- Conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT DEFAULT 'New Chat',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID,
  role TEXT CHECK (role IN ('user','assistant','system')) NOT NULL,
  content TEXT NOT NULL,
  lang TEXT DEFAULT 'ar',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for better performance
CREATE INDEX IF NOT EXISTS idx_messages_conv_created ON public.messages(conversation_id, created_at);

-- User insights table for saving helpful responses
CREATE TABLE IF NOT EXISTS public.user_insights (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source_message_id BIGINT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_insights_user ON public.user_insights(user_id);

-- Helper function to ensure default conversation
CREATE OR REPLACE FUNCTION ensure_default_conversation(p_user UUID)
RETURNS UUID AS $$
DECLARE cid UUID;
BEGIN
  SELECT id INTO cid FROM conversations WHERE user_id = p_user ORDER BY created_at ASC LIMIT 1;
  IF cid IS NULL THEN
    INSERT INTO conversations(user_id, title) VALUES (p_user, 'My Mentor Chat') RETURNING id INTO cid;
  END IF;
  RETURN cid;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can manage their own conversations"
ON public.conversations
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can manage their own messages"
ON public.messages
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for insights
CREATE POLICY "Users can manage their own insights"
ON public.user_insights
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);