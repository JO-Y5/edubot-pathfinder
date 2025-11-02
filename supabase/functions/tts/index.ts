import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const AZURE_KEY = Deno.env.get("AZURE_SPEECH_KEY");
const AZURE_REGION = Deno.env.get("AZURE_SPEECH_REGION");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const voices: Record<string, string> = {
  "ar": "ar-EG-SalmaNeural",
  "en": "en-US-JennyNeural"
};

function ssml(text: string, lang: string) {
  const voice = voices[lang.startsWith("ar") ? "ar" : "en"] || voices["en"];
  return `<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.0" xml:lang="${lang}">
  <voice name="${voice}">${text}</voice>
</speak>`;
}

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
    if (!AZURE_KEY || !AZURE_REGION) {
      throw new Error("Azure Speech credentials not configured. Please set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION.");
    }

    const { text, lang = "ar" } = await req.json();
    if (!text) throw new Error("Missing text");

    console.log(`TTS request for lang: ${lang}`);

    const TTS_URL = `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const r = await fetch(TTS_URL, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-48khz-192kbitrate-mono-mp3"
      },
      body: ssml(text, lang)
    });
    
    const buf = new Uint8Array(await r.arrayBuffer());
    if (!r.ok) throw new Error(`Azure TTS error: ${r.status}`);
    
    const b64 = btoa(String.fromCharCode(...buf));
    
    console.log(`TTS audio generated successfully`);

    return new Response(JSON.stringify({ 
      ok: true, 
      audio_base64: b64, 
      mime: "audio/mpeg" 
    }), {
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  } catch (e) {
    console.error('TTS error:', e);
    return new Response(JSON.stringify({ 
      ok: false, 
      error: String(e) 
    }), {
      status: 400, 
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }
});
