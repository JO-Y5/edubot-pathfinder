-- Fix search_path for ensure_default_conversation function
DROP FUNCTION IF EXISTS ensure_default_conversation(UUID);

CREATE OR REPLACE FUNCTION ensure_default_conversation(p_user UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE cid UUID;
BEGIN
  SELECT id INTO cid FROM conversations WHERE user_id = p_user ORDER BY created_at ASC LIMIT 1;
  IF cid IS NULL THEN
    INSERT INTO conversations(user_id, title) VALUES (p_user, 'My Mentor Chat') RETURNING id INTO cid;
  END IF;
  RETURN cid;
END;
$$;