import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface TrackEventOptions {
  eventName: string;
  eventData?: Record<string, any>;
  pageUrl?: string;
}

export function useAnalytics() {
  const { user } = useAuth();
  const sessionIdRef = useRef<string>();

  // Generate session ID on mount
  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }, []);

  const trackEvent = useCallback(async ({ eventName, eventData, pageUrl }: TrackEventOptions) => {
    try {
      const { error } = await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        event_name: eventName,
        event_data: eventData || {},
        session_id: sessionIdRef.current,
        page_url: pageUrl || window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, [user]);

  const trackPageView = useCallback((pageUrl?: string) => {
    trackEvent({
      eventName: 'page_view',
      pageUrl: pageUrl || window.location.href,
    });
  }, [trackEvent]);

  return { trackEvent, trackPageView, sessionId: sessionIdRef.current };
}
