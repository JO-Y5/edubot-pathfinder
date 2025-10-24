import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecommendationItem {
  id: string;
  title: string;
  score: number;
  rationale: string;
  explain: {
    have: string[];
    need: string[];
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { user_id, limit } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'user_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user profile and plan
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('plan')
      .eq('user_id', user_id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch user profile' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userPlan = profile?.plan || 'basic';
    const maxItems = userPlan === 'basic' ? 5 : (limit || 20);

    // Get user's assessment results
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessment_results')
      .select('track_id, answers')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (assessmentError) {
      console.log('No assessment found, using default recommendations');
    }

    // Generate hybrid recommendations (content-based + collaborative filtering simulation)
    const recommendations: RecommendationItem[] = [];
    
    const tracks = [
      { id: 'ai', title: 'الذكاء الاصطناعي وعلم البيانات', keywords: ['python', 'ml', 'data'] },
      { id: 'web', title: 'تطوير الويب', keywords: ['javascript', 'react', 'nodejs'] },
      { id: 'cyber', title: 'الأمن السيبراني', keywords: ['security', 'penetration', 'network'] },
      { id: 'design', title: 'التصميم وتجربة المستخدم', keywords: ['ui', 'ux', 'figma'] },
      { id: 'business', title: 'إدارة الأعمال', keywords: ['management', 'strategy', 'analytics'] }
    ];

    const userTrack = assessment?.track_id || 'ai';
    
    for (const track of tracks) {
      const isUserTrack = track.id === userTrack;
      const baseScore = isUserTrack ? 0.9 : Math.random() * 0.7;
      
      recommendations.push({
        id: track.id,
        title: track.title,
        score: baseScore,
        rationale: isUserTrack 
          ? `يتوافق بشكل كبير مع نتائج تقييمك الشخصي`
          : `قد يكون مفيداً لتنويع مهاراتك`,
        explain: {
          have: isUserTrack 
            ? ['مهارات تحليلية قوية', 'اهتمام بالتكنولوجيا']
            : ['أساسيات تقنية'],
          need: isUserTrack
            ? ['تعمق أكثر في التطبيقات العملية']
            : track.keywords.map(k => `تعلم ${k}`)
        }
      });
    }

    // Sort by score and limit
    recommendations.sort((a, b) => b.score - a.score);
    const limitedRecs = recommendations.slice(0, maxItems);

    console.log(`Returning ${limitedRecs.length} recommendations for user ${user_id} (plan: ${userPlan})`);

    return new Response(
      JSON.stringify({
        plan: userPlan,
        limit: maxItems,
        items: limitedRecs
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Recommendations error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
