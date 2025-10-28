import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Answer {
  id: string;
  value: number | string | string[];
  category?: string;
  tracks?: Record<string, number>;
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

    if (!answers || !Array.isArray(answers)) {
      return new Response(
        JSON.stringify({ error: 'answers array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`CAT Assessment for user ${user_id || 'anonymous'}: ${answers.length} answers, track: ${track}`);

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
      'learning_motivation': { I: 0.7, C: 0.3 },
      
      // Enterprising/Business
      'entrepreneurship': { E: 0.5, I: 0.2, R: 0.3 },
      'career_values': { E: 0.3, S: 0.3, A: 0.2, C: 0.2 },
      
      // Default
      'default': { R: 0.16, I: 0.16, A: 0.17, S: 0.17, E: 0.17, C: 0.17 }
    };

    // Track recommendations matching questions.ts tracks (ai, web, cyber, design, business)
    const trackMappings: { [key: string]: { riasec: string[], weight: number } } = {
      'ai': { riasec: ['I', 'R', 'C'], weight: 1.0 },           // AI/ML - Investigative, Realistic, Conventional
      'web': { riasec: ['R', 'A', 'I'], weight: 0.95 },         // Web Dev - Realistic, Artistic, Investigative
      'cyber': { riasec: ['I', 'R', 'C'], weight: 0.95 },       // Cybersecurity - Investigative, Realistic, Conventional
      'design': { riasec: ['A', 'I', 'E'], weight: 0.9 },       // Design - Artistic, Investigative, Enterprising
      'business': { riasec: ['E', 'C', 'S'], weight: 0.9 }      // Business - Enterprising, Conventional, Social
    };

    // Process each answer with sophisticated scoring
    let scaleCount = 0;
    let scaleSum = 0;
    
    // Also track direct answers to calculate track scores
    const trackScores: { [key: string]: number } = { ai: 0, web: 0, cyber: 0, design: 0, business: 0 };
    
    answers.forEach((answer: Answer) => {
      const category = answer.category || 'default';
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
        
        // Add to direct track scores from question metadata
        if (answer.tracks) {
          Object.entries(answer.tracks).forEach(([track, weight]) => {
            if (trackScores[track] !== undefined && typeof answer.value === 'number') {
              trackScores[track] += answer.value * (weight as number) * 0.2;
            }
          });
        }
        
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
        
        // Add to track scores
        if (answer.tracks) {
          Object.entries(answer.tracks).forEach(([track, weight]) => {
            if (trackScores[track] !== undefined) {
              trackScores[track] += (weight as number) * 4;
            }
          });
        }
        
      } else if (Array.isArray(answer.value)) {
        // Multi-choice questions
        const optionValue = 0.6 / answer.value.length; // Distributed across choices
        answer.value.forEach(() => {
          Object.entries(weights).forEach(([key, weight]) => {
            riasec[key as keyof typeof riasec] += optionValue * (weight || 0);
          });
        });
        
        // Add to track scores
        if (answer.tracks) {
          Object.entries(answer.tracks).forEach(([track, weight]) => {
            if (trackScores[track] !== undefined && Array.isArray(answer.value)) {
              trackScores[track] += answer.value.length * (weight as number) * 0.5;
            }
          });
        }
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

    // Calculate track scores based on RIASEC profile (70%) + direct answer weights (30%)
    Object.entries(trackMappings).forEach(([trackName, mapping]) => {
      let riasecScore = 0;
      mapping.riasec.forEach((code, index) => {
        const weight = index === 0 ? 0.5 : (index === 1 ? 0.3 : 0.2);
        riasecScore += riasec[code as keyof typeof riasec] * weight;
      });
      
      // Combine RIASEC score with direct track weights from questions
      const directScore = trackScores[trackName] || 0;
      const maxDirectScore = answers.length * 5; // max possible if all questions weighted
      const normalizedDirect = maxDirectScore > 0 ? directScore / maxDirectScore : 0;
      
      tracks[trackName] = (riasecScore * 0.7 + normalizedDirect * 0.3) * mapping.weight;
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

    // Save results to database only if user is logged in
    if (user_id) {
      try {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_ANON_KEY') ?? '',
          {
            global: {
              headers: { Authorization: req.headers.get('Authorization')! },
            },
          }
        );

        const primaryTrack = recommendations[0] || 'ai';
        const topScore = tracks[primaryTrack] || 0;
        
        const { error: dbError } = await supabaseClient
          .from('assessment_results')
          .insert({
            user_id: user_id,
            track_id: primaryTrack,
            score: topScore,
            answers: {
              riasec_scores: riasec,
              big5_scores: big5,
              track_scores: tracks,
              confidence: response.confidence,
              recommendations: recommendations,
              raw_answers: answers
            }
          });

        if (dbError) {
          console.error('Error saving assessment results:', dbError);
          // Don't fail the request, just log the error
        } else {
          console.log('Assessment results saved successfully for track:', primaryTrack);
        }
      } catch (saveError) {
        console.error('Error saving to database:', saveError);
        // Continue with response even if save fails
      }
    } else {
      console.log('Skipping database save for anonymous user');
    }

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
