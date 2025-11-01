import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;

async function embeddingFor(text: string) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text.slice(0, 6000)
    })
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('OpenAI API error:', json);
    throw new Error(JSON.stringify(json));
  }

  return json.data[0].embedding;
}

function buildProfileText(profile: any, answers: any[], events: any[]) {
  const a = (answers || [])
    .map((x: any) => `${x.question_id}:${JSON.stringify(x.value)}`)
    .join("\n");
  const e = (events || [])
    .map((x: any) => `${x.event_type}:${JSON.stringify(x.payload)}`)
    .join("\n");

  return `Stage:${profile?.stage || 'unknown'}
Interests:${(profile?.interests || []).join(',')}
Strengths:${(profile?.strengths || []).join(',')}
Targets:${(profile?.target_roles || []).join(',')}
Answers:
${a}
Behavior:
${e}`;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { user_id } = await req.json();
    
    console.log(`Upserting profile for user: ${user_id}`);

    // Fetch user data
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();

    const { data: answers } = await supabase
      .from("assessment_answers")
      .select("question_id,value")
      .eq("user_id", user_id)
      .limit(200);

    const { data: events } = await supabase
      .from("user_events")
      .select("event_type,payload")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(200);

    // Build summary and generate embedding
    const summary = buildProfileText(profile, answers || [], events || []);
    console.log(`Generated summary for ${user_id}, length: ${summary.length}`);

    const vec = await embeddingFor(summary);
    console.log(`Generated embedding for ${user_id}, dimensions: ${vec.length}`);

    // Upsert embedding
    const { error } = await supabase.rpc("upsert_user_embedding", {
      p_user_id: user_id,
      p_vec: vec
    });

    if (error) throw error;

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  } catch (e) {
    console.error('Profile upsert error:', e);
    return new Response(
      JSON.stringify({ ok: false, error: String(e) }),
      { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }
});
