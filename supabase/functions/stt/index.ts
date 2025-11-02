import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;
const OPENAI_STT_URL = "https://api.openai.com/v1/audio/transcriptions";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const form = await req.formData();
    const audio = form.get("audio") as File | null;
    const lang = (form.get("lang") as string) || "ar";
    
    if (!audio) throw new Error("Missing audio file");

    console.log(`STT request for lang: ${lang}`);

    const fd = new FormData();
    fd.append("file", audio, "audio.webm");
    fd.append("model", "whisper-1");
    fd.append("language", lang.startsWith("ar") ? "ar" : "en");

    const r = await fetch(OPENAI_STT_URL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${OPENAI_API_KEY}` },
      body: fd
    });
    
    const j = await r.json();
    if (!r.ok) throw new Error(JSON.stringify(j));

    console.log(`STT transcription successful`);

    return new Response(JSON.stringify({ ok: true, text: j.text || "" }), {
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  } catch (e) {
    console.error('STT error:', e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 400, 
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }
});
