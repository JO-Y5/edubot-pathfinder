import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrackWeights {
  [key: string]: {
    [key: string]: number;
  };
}

const TRACK_WEIGHTS: TrackWeights = {
  'ai-ml': {
    'problem_solving': 0.25,
    'analytical': 0.25,
    'tech_learning': 0.20,
    'data_skills': 0.20,
    'innovation': 0.10
  },
  'web-dev': {
    'tech_learning': 0.25,
    'creative': 0.20,
    'problem_solving': 0.20,
    'detail_oriented': 0.20,
    'teamwork': 0.15
  },
  'cybersecurity': {
    'analytical': 0.25,
    'detail_oriented': 0.25,
    'problem_solving': 0.20,
    'tech_learning': 0.20,
    'patience': 0.10
  },
  'design': {
    'creative': 0.30,
    'visual_skills': 0.25,
    'detail_oriented': 0.20,
    'innovation': 0.15,
    'teamwork': 0.10
  },
  'business': {
    'leadership': 0.25,
    'communication': 0.25,
    'teamwork': 0.20,
    'organization': 0.20,
    'innovation': 0.10
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate scores for each track
    const scores: { [key: string]: number } = {};
    
    for (const [trackId, weights] of Object.entries(TRACK_WEIGHTS)) {
      let score = 0;
      let totalWeight = 0;
      
      for (const [skill, weight] of Object.entries(weights)) {
        const answerValue = answers[skill] || 0;
        score += answerValue * weight;
        totalWeight += weight;
      }
      
      scores[trackId] = totalWeight > 0 ? (score / totalWeight) * 100 : 0;
    }

    // Find the best matching track
    const bestTrack = Object.entries(scores).reduce((a, b) => 
      a[1] > b[1] ? a : b
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Save result to database
    const { error: insertError } = await supabase
      .from('assessment_results')
      .insert({
        user_id: user.id,
        track_id: bestTrack[0],
        score: bestTrack[1],
        answers: answers
      });

    if (insertError) {
      console.error('Error saving result:', insertError);
    }

    return new Response(JSON.stringify({
      scores,
      recommendedTrack: bestTrack[0],
      confidenceScore: bestTrack[1]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in assessment-score:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});