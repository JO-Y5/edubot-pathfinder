import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Answer {
  id: string;
  value: number;
}

interface CATResponse {
  riasec: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  big5: {
    O: number;
    C: number;
    E: number;
    A: number;
    N: number;
  };
  confidence: number;
  done: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, answers, maxQuestions = 30, stopAt = 0.9 } = await req.json();

    if (!user_id || !answers || !Array.isArray(answers)) {
      return new Response(
        JSON.stringify({ error: 'user_id and answers array are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`CAT Assessment for user ${user_id}: ${answers.length} answers`);

    // Simple CAT-lite algorithm: calculate RIASEC and Big5 scores from answers
    const riasec = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const big5 = { O: 0, C: 0, E: 0, A: 0, N: 0 };

    // Simulate scoring based on answer patterns
    let totalScore = 0;
    answers.forEach((answer: Answer, idx: number) => {
      const val = answer.value || 0;
      totalScore += val;
      
      // Distribute scores across RIASEC (simplified)
      const riasecKeys = Object.keys(riasec);
      riasec[riasecKeys[idx % 6] as keyof typeof riasec] += val;
      
      // Distribute scores across Big5 (simplified)
      const big5Keys = Object.keys(big5);
      big5[big5Keys[idx % 5] as keyof typeof big5] += val;
    });

    // Normalize scores to 0-1 range
    const maxPossible = answers.length * 5; // assuming 5-point scale
    Object.keys(riasec).forEach(key => {
      riasec[key as keyof typeof riasec] = riasec[key as keyof typeof riasec] / maxPossible;
    });
    Object.keys(big5).forEach(key => {
      big5[key as keyof typeof big5] = big5[key as keyof typeof big5] / maxPossible;
    });

    // Calculate confidence based on number of answers and score variance
    const avgScore = totalScore / answers.length;
    const variance = answers.reduce((acc: number, ans: Answer) => {
      const diff = (ans.value || 0) - avgScore;
      return acc + diff * diff;
    }, 0) / answers.length;
    
    const confidence = Math.min(
      (answers.length / maxQuestions) * 0.7 + (1 - Math.sqrt(variance) / 5) * 0.3,
      1.0
    );

    // Determine if assessment should stop
    const done = answers.length >= maxQuestions || confidence >= stopAt;

    console.log(`Confidence: ${confidence.toFixed(2)}, Done: ${done}`);

    const response: CATResponse = {
      riasec,
      big5,
      confidence: Math.round(confidence * 100) / 100,
      done
    };

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('CAT Assessment error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
