import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const trackEventSchema = z.object({
  user_id: z.string().uuid(),
  event_type: z.string().min(1).max(100),
  payload: z.record(z.any()).optional()
});

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

    const body = await req.json();
    const validated = trackEventSchema.parse(body);
    const { user_id, event_type, payload } = validated;
    
    console.log(`Tracking event: ${event_type} for user: ${user_id}`);

    const { error } = await supabase
      .from("user_events")
      .insert({ user_id, event_type, payload });

    if (error) throw error;

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  } catch (e) {
    console.error('Track error:', e);
    const status = e instanceof z.ZodError ? 400 : 500;
    return new Response(
      JSON.stringify({ ok: false, error: String(e) }),
      { status, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }
});
