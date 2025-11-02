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
    const openaiKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting catalog embedding backfill...');

    // Fetch all catalog items without embeddings
    const { data: items, error: fetchError } = await supabase
      .from('catalog_items')
      .select('*')
      .is('embedding', null);

    if (fetchError) throw fetchError;

    console.log(`Found ${items?.length || 0} items to embed`);

    let processed = 0;
    for (const item of items || []) {
      const text = `${item.title}\n${item.description}\n${(item.tags || []).join(' ')}`;
      
      const res = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiKey}`,
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
        continue;
      }

      const embedding = json.data[0].embedding;

      const { error: updateError } = await supabase
        .from('catalog_items')
        .update({ embedding })
        .eq('id', item.id);

      if (updateError) {
        console.error(`Failed to update item ${item.id}:`, updateError);
      } else {
        processed++;
        console.log(`Processed ${processed}/${items.length}: ${item.title}`);
      }
    }

    return new Response(
      JSON.stringify({ ok: true, processed }),
      { headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  } catch (e) {
    console.error('Embed catalog error:', e);
    return new Response(
      JSON.stringify({ ok: false, error: String(e) }),
      { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }
});
