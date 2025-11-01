import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface RecItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  kind: string;
  popularity: number;
  sim: number;
}

export function useRecs(kind: 'major' | 'career' | 'course', limit = 10) {
  const { user } = useAuth();
  const [data, setData] = useState<RecItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    let mounted = true;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        // First, upsert the user's embedding
        const { error: profileError } = await supabase.functions.invoke('profile-upsert', {
          body: { user_id: user.id }
        });

        if (profileError) {
          console.error('Profile upsert error:', profileError);
          throw profileError;
        }

        // Then get recommendations
        const { data: recsData, error: recsError } = await supabase.functions.invoke('recs', {
          body: { user_id: user.id, kind, limit }
        });

        if (recsError) {
          console.error('Recommendations error:', recsError);
          throw recsError;
        }

        if (mounted) {
          setData(recsData?.items || []);
        }
      } catch (e) {
        console.error('useRecs error:', e);
        if (mounted) {
          setError(e instanceof Error ? e.message : String(e));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user?.id, kind, limit]);

  return { data, loading, error };
}
