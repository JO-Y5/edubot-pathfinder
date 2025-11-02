import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getProfile(user_id: string) {
  const { data } = await supabase.from("user_profiles").select("*").eq("user_id", user_id).single();
  return data || {};
}

async function getRecentMessages(conversation_id: string, limit = 15) {
  const { data } = await supabase
    .from("messages")
    .select("role,content,lang,created_at")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data || []).reverse();
}

async function getRecs(user_id: string) {
  const kinds = ["major", "career", "course"] as const;
  const results: Record<string, any[]> = {};
  for (const kind of kinds) {
    const { data, error } = await supabase.rpc("recs_by_user", { 
      p_user_id: user_id, 
      p_kind: kind, 
      p_limit: 5 
    });
    if (!error) {
      results[kind] = (data || []).map((x: any) => ({ 
        title: x.title, 
        tags: x.tags, 
        sim: x.sim 
      }));
    }
  }
  return results;
}

function buildSystemPrompt(profile: any, recs: any, lang: string) {
  const isAr = (lang || profile?.lang || "ar").toLowerCase().startsWith("ar");
  const instructions = isAr ? `
أنت مرشد أكاديمي ذكي لطلاب العالم العربي. 
- استخدم لغة مبسطة، هادئة، ومشجعة.
- اعتمد على بيانات الطالب (المرحلة، الاهتمامات، نقاط القوة).
- قدّم توصيات واضحة: تخصصات، وظائف، وكورسات مناسبة، وسبب الترشيح.
- إن كان السؤال خارج النطاق، ارشد الطالب لما ينفعه أكاديمياً.

صيغة لمقترح سريع:
- التخصص الأنسب: …
- السبب: …
- 3 دورات مقترحة: …
- مهارات لتقويتها: …
` : `
You are an academic & career mentor.
- Speak simply and encouragingly.
- Use the student's profile (stage, interests, strengths).
- Return clear suggestions: majors, careers, relevant courses, and the rationale.
- If off-topic, redirect to useful academic guidance.

Quick suggestion format:
- Best-fit major: …
- Why: …
- 3 suggested courses: …
- Skills to improve: …
`;
  const profileText = JSON.stringify({
    stage: profile?.stage, 
    interests: profile?.interests, 
    strengths: profile?.strengths, 
    targets: profile?.target_roles
  });
  const recsText = JSON.stringify(recs);
  return `${instructions}

[Student Profile]
${profileText}

[Current Recommendations Snapshot]
${recsText}
`;
}

async function openaiChat(messages: any[]) {
  const r = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.7
    })
  });
  const j = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(j));
  return j.choices?.[0]?.message?.content || "";
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { user_id, message, lang = "ar", system: extraSystem } = await req.json();
    if (!user_id || !message) throw new Error("Missing user_id or message");

    console.log(`AI Chat request from user: ${user_id}, lang: ${lang}`);

    // Ensure conversation
    const { data: convIdData } = await supabase.rpc("ensure_default_conversation", { 
      p_user: user_id 
    });
    const conversation_id = convIdData || null;

    // Save user message
    if (conversation_id) {
      await supabase.from("messages").insert({
        conversation_id, 
        user_id, 
        role: "user", 
        content: message, 
        lang
      });
    }

    // Build context
    const profile = await getProfile(user_id);
    const recs = await getRecs(user_id);
    const history = conversation_id ? await getRecentMessages(conversation_id) : [];

    const sys = buildSystemPrompt(profile, recs, lang);
    const systemPrompt = sys + (extraSystem && String(extraSystem).trim() 
      ? "\n\n[Extra Instruction]\n" + extraSystem 
      : "");

    const messagesPayload = [
      { role: "system", content: systemPrompt },
      ...history.map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message }
    ];

    const reply = await openaiChat(messagesPayload);

    // Save assistant message
    if (conversation_id) {
      await supabase.from("messages").insert({
        conversation_id, 
        user_id, 
        role: "assistant", 
        content: reply, 
        lang
      });
    }

    console.log(`AI Chat response generated successfully`);

    return new Response(JSON.stringify({ ok: true, reply }), {
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  } catch (e) {
    console.error('AI Chat error:', e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 400, 
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }
});
