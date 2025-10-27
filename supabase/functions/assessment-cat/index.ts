import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Answer {
  id: string;
  value: number | string | string[];
  category?: string;
}

interface CATResponse {
  riasec: {
    R: number;  // Realistic (عملي، تقني)
    I: number;  // Investigative (تحليلي، بحثي)
    A: number;  // Artistic (فني، إبداعي)
    S: number;  // Social (اجتماعي، خدمي)
    E: number;  // Enterprising (قيادي، ريادي)
    C: number;  // Conventional (منظم، إداري)
  };
  big5: {
    O: number;  // Openness (الانفتاح)
    C: number;  // Conscientiousness (الضمير والدقة)
    E: number;  // Extraversion (الانبساط)
    A: number;  // Agreeableness (الوداد)
    N: number;  // Neuroticism (العصابية)
  };
  tracks: {
    [key: string]: number;
  };
  confidence: number;
  done: boolean;
  recommendations: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, answers, track = 'uni', maxQuestions = 25, stopAt = 0.85 } = await req.json();

    if (!user_id || !answers || !Array.isArray(answers)) {
      return new Response(
        JSON.stringify({ error: 'user_id and answers array are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`CAT Assessment for user ${user_id}: ${answers.length} answers, track: ${track}`);

    // Initialize scoring structures
    const riasec = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const big5 = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    const tracks: { [key: string]: number } = {};
    
    // Category weights for RIASEC mapping
    const categoryRIASEC: { [key: string]: { [key in keyof typeof riasec]?: number } } = {
      // Technical/Practical skills
      'skills': { R: 0.3, I: 0.2, E: 0.2, C: 0.3 },
      'tech_interest': { R: 0.4, I: 0.4, A: 0.2 },
      'logical_thinking': { I: 0.5, R: 0.3, C: 0.2 },
      
      // Creative/Artistic
      'interests': { A: 0.3, S: 0.2, I: 0.2, E: 0.3 },
      'hobbies': { A: 0.3, S: 0.2, R: 0.2, E: 0.3 },
      'problem_solving': { I: 0.4, R: 0.3, A: 0.3 },
      
      // Social/Leadership
      'teamwork': { S: 0.5, E: 0.3, A: 0.2 },
      'leadership': { E: 0.5, S: 0.3, C: 0.2 },
      'presentation': { S: 0.4, E: 0.4, A: 0.2 },
      
      // Systematic/Organized
      'learning_style': { C: 0.3, I: 0.3, R: 0.2, S: 0.2 },
      'decision_making': { I: 0.3, C: 0.3, E: 0.2, A: 0.2 },
      'planning': { C: 0.4, I: 0.3, E: 0.3 },
      
      // Investigative/Research
      'academic_strength': { I: 0.5, R: 0.2, C: 0.3 },
      'learning_motivation': { I: 0.4, O: 0.3, C: 0.3 },
      
      // Enterprising/Business
      'entrepreneurship': { E: 0.5, I: 0.2, R: 0.3 },
      'career_values': { E: 0.3, S: 0.3, A: 0.2, C: 0.2 },
      
      // Default
      'default': { R: 0.16, I: 0.16, A: 0.17, S: 0.17, E: 0.17, C: 0.17 }
    };

    // Track recommendations based on RIASEC and goals
    const trackMappings: { [key: string]: { riasec: string[], weight: number } } = {
      'computer_science': { riasec: ['I', 'R', 'C'], weight: 1.0 },
      'engineering': { riasec: ['R', 'I', 'C'], weight: 1.0 },
      'medicine': { riasec: ['I', 'S', 'R'], weight: 0.9 },
      'business': { riasec: ['E', 'C', 'S'], weight: 0.9 },
      'design': { riasec: ['A', 'I', 'E'], weight: 0.85 },
      'education': { riasec: ['S', 'A', 'C'], weight: 0.8 },
      'arts': { riasec: ['A', 'S', 'E'], weight: 0.8 },
      'science': { riasec: ['I', 'R', 'C'], weight: 0.9 },
      'social_sciences': { riasec: ['S', 'I', 'A'], weight: 0.8 },
      'law': { riasec: ['E', 'I', 'C'], weight: 0.85 }
    };

    // Process each answer with sophisticated scoring
    let scaleCount = 0;
    let scaleSum = 0;
    
    answers.forEach((answer: Answer) => {
      const category = answer.id.split('_')[0] + '_' + (answer.id.split('_')[1] || 'default');
      const weights = categoryRIASEC[category] || categoryRIASEC['default'];
      
      // Handle different answer types
      if (typeof answer.value === 'number') {
        // Scale questions (1-5)
        const normalizedValue = answer.value / 5; // 0-1 range
        scaleCount++;
        scaleSum += answer.value;
        
        // Distribute to RIASEC based on category
        Object.entries(weights).forEach(([key, weight]) => {
          riasec[key as keyof typeof riasec] += normalizedValue * (weight || 0);
        });
        
        // Big5 mapping
        if (category.includes('openness') || category.includes('tech_interest')) {
          big5.O += normalizedValue;
        }
        if (category.includes('planning') || category.includes('organized')) {
          big5.C += normalizedValue;
        }
        if (category.includes('teamwork') || category.includes('social')) {
          big5.E += normalizedValue;
        }
        if (category.includes('values') || category.includes('helping')) {
          big5.A += normalizedValue;
        }
        
      } else if (typeof answer.value === 'string') {
        // Single choice questions
        const optionValue = 0.8; // Strong indicator
        Object.entries(weights).forEach(([key, weight]) => {
          riasec[key as keyof typeof riasec] += optionValue * (weight || 0);
        });
        
      } else if (Array.isArray(answer.value)) {
        // Multi-choice questions
        const optionValue = 0.6 / answer.value.length; // Distributed across choices
        answer.value.forEach(() => {
          Object.entries(weights).forEach(([key, weight]) => {
            riasec[key as keyof typeof riasec] += optionValue * (weight || 0);
          });
        });
      }
    });

    // Normalize RIASEC scores
    const riasecTotal = Object.values(riasec).reduce((sum, val) => sum + val, 0);
    if (riasecTotal > 0) {
      Object.keys(riasec).forEach(key => {
        riasec[key as keyof typeof riasec] = riasec[key as keyof typeof riasec] / riasecTotal;
      });
    }

    // Normalize Big5 scores
    const big5Total = Object.values(big5).reduce((sum, val) => sum + val, 0);
    if (big5Total > 0) {
      Object.keys(big5).forEach(key => {
        big5[key as keyof typeof big5] = big5[key as keyof typeof big5] / big5Total;
      });
    }

    // Calculate track scores based on RIASEC profile
    Object.entries(trackMappings).forEach(([trackName, mapping]) => {
      let score = 0;
      mapping.riasec.forEach((code, index) => {
        const weight = index === 0 ? 0.5 : (index === 1 ? 0.3 : 0.2);
        score += riasec[code as keyof typeof riasec] * weight;
      });
      tracks[trackName] = score * mapping.weight;
    });

    // Calculate confidence
    const avgScale = scaleCount > 0 ? scaleSum / scaleCount : 3;
    const variance = answers.reduce((acc: number, ans: Answer) => {
      if (typeof ans.value === 'number') {
        const diff = ans.value - avgScale;
        return acc + diff * diff;
      }
      return acc;
    }, 0) / Math.max(scaleCount, 1);
    
    const completionFactor = Math.min(answers.length / maxQuestions, 1.0);
    const consistencyFactor = 1 - Math.min(Math.sqrt(variance) / 5, 1.0);
    const confidence = Math.min(
      completionFactor * 0.6 + consistencyFactor * 0.4,
      1.0
    );

    // Determine if assessment should stop
    const done = answers.length >= maxQuestions || confidence >= stopAt;

    // Generate recommendations
    const sortedTracks = Object.entries(tracks)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    
    const recommendations = sortedTracks.map(([trackName]) => trackName);

    console.log(`Confidence: ${confidence.toFixed(2)}, Done: ${done}`);
    console.log(`Top RIASEC: ${Object.entries(riasec).sort(([,a],[,b]) => b - a).slice(0, 3).map(([k]) => k).join(', ')}`);
    console.log(`Top tracks: ${recommendations.join(', ')}`);

    const response: CATResponse = {
      riasec,
      big5,
      tracks,
      confidence: Math.round(confidence * 100) / 100,
      done,
      recommendations
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
