import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    const { user_id, kind = "major", limit = 10 } = await req.json();
    
    console.log(`Getting recommendations for user: ${user_id}, kind: ${kind}, limit: ${limit}`);

    const { data, error } = await supabase.rpc("recs_by_user", {
      p_user_id: user_id,
      p_kind: kind,
      p_limit: limit
    });

    if (error) throw error;

    console.log(`Returning ${data?.length || 0} recommendations`);

    return new Response(
      JSON.stringify({ items: data || [] }),
      { headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  } catch (e) {
    console.error('Recommendations error:', e);
    return new Response(
      JSON.stringify({ items: [], error: String(e) }),
      { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }
});
