import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAnalytics } from './useAnalytics';

interface ABVariant {
  id: string;
  name: string;
  config: Record<string, any>;
}

export function useABTest(testName: string) {
  const { user } = useAuth();
  const { sessionId } = useAnalytics();
  const [variant, setVariant] = useState<ABVariant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function assignVariant() {
      try {
        // Get active test
        const { data: test, error: testError } = await supabase
          .from('ab_tests')
          .select('id, name')
          .eq('name', testName)
          .eq('status', 'active')
          .single();

        if (testError || !test) {
          setLoading(false);
          return;
        }

        // Check if user already has assignment
        const { data: existingAssignment, error: assignmentError } = await supabase
          .from('ab_assignments')
          .select(`
            variant_id,
            ab_variants (
              id,
              name,
              config
            )
          `)
          .eq('test_id', test.id)
          .or(user ? `user_id.eq.${user.id}` : `session_id.eq.${sessionId}`)
          .single();

        if (!assignmentError && existingAssignment) {
          const variantData = Array.isArray(existingAssignment.ab_variants) 
            ? existingAssignment.ab_variants[0] 
            : existingAssignment.ab_variants;
          
          setVariant(variantData as ABVariant);
          setLoading(false);
          return;
        }

        // Get all variants for this test
        const { data: variants, error: variantsError } = await supabase
          .from('ab_variants')
          .select('id, name, config, traffic_percentage')
          .eq('test_id', test.id);

        if (variantsError || !variants || variants.length === 0) {
          setLoading(false);
          return;
        }

        // Randomly assign variant based on traffic percentage
        const random = Math.random() * 100;
        let cumulative = 0;
        let selectedVariant = variants[0];

        for (const v of variants) {
          cumulative += v.traffic_percentage;
          if (random <= cumulative) {
            selectedVariant = v;
            break;
          }
        }

        // Create assignment
        const { error: insertError } = await supabase
          .from('ab_assignments')
          .insert({
            test_id: test.id,
            variant_id: selectedVariant.id,
            user_id: user?.id || null,
            session_id: sessionId,
          });

        if (!insertError) {
          setVariant({
            id: selectedVariant.id,
            name: selectedVariant.name,
            config: (selectedVariant.config as Record<string, any>) || {},
          });
        }
      } catch (error) {
        console.error('Error assigning AB test variant:', error);
      } finally {
        setLoading(false);
      }
    }

    assignVariant();
  }, [testName, user, sessionId]);

  const trackConversion = useCallback(async () => {
    if (!variant) return;

    try {
      await supabase
        .from('ab_assignments')
        .update({ 
          converted: true, 
          converted_at: new Date().toISOString() 
        })
        .eq('variant_id', variant.id)
        .or(user ? `user_id.eq.${user.id}` : `session_id.eq.${sessionId}`);
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  }, [variant, user, sessionId]);

  return { variant, loading, trackConversion };
}
