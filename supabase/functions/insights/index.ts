import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    if (req.method === "POST") {
      const { 
        user_id, 
        title, 
        content, 
        tags = [], 
        source_message_id = null 
      } = await req.json();
      
      if (!user_id || !title || !content) {
        throw new Error("Missing required fields: user_id, title, or content");
      }

      console.log(`Saving insight for user: ${user_id}`);

      const { error } = await supabase.from("user_insights").insert({ 
        user_id, 
        title, 
        content, 
        tags, 
        source_message_id 
      });
      
      if (error) throw error;

      return new Response(JSON.stringify({ ok: true }), { 
        headers: { ...corsHeaders, "content-type": "application/json" }
      });
    }
    
    if (req.method === "GET") {
      const user_id = url.searchParams.get("user_id");
      if (!user_id) throw new Error("Missing user_id parameter");

      console.log(`Fetching insights for user: ${user_id}`);

      const { data, error } = await supabase
        .from("user_insights")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;

      return new Response(JSON.stringify({ ok: true, items: data || [] }), { 
        headers: { ...corsHeaders, "content-type": "application/json" }
      });
    }
    
    return new Response("Method Not Allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  } catch (e) {
    console.error('Insights error:', e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { 
      status: 400, 
      headers: { ...corsHeaders, "content-type": "application/json" }
    });
  }
});
