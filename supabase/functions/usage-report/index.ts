import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify user authentication
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { org_id, group_id } = await req.json();

    // Verify user has access to org
    if (org_id) {
      const { data: org } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', org_id)
        .eq('owner_id', user.id)
        .single();

      if (!org) {
        throw new Error('Unauthorized access to organization');
      }
    }

    // Calculate date for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get users count
    let usersQuery = supabase.from('org_memberships').select('user_id', { count: 'exact' });
    
    if (org_id) {
      usersQuery = usersQuery.eq('org_id', org_id);
    }
    
    const { count: usersCount } = await usersQuery;

    // Get assessments count (last 30 days)
    let assessmentsQuery = supabase
      .from('assessment_results')
      .select('*', { count: 'exact' })
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (org_id) {
      // Get users in org
      const { data: orgUsers } = await supabase
        .from('org_memberships')
        .select('user_id')
        .eq('org_id', org_id);
      
      const userIds = orgUsers?.map(u => u.user_id) || [];
      if (userIds.length > 0) {
        assessmentsQuery = assessmentsQuery.in('user_id', userIds);
      }
    }

    if (group_id) {
      const { data: groupUsers } = await supabase
        .from('class_enrollments')
        .select('user_id')
        .eq('group_id', group_id);
      
      const userIds = groupUsers?.map(u => u.user_id) || [];
      if (userIds.length > 0) {
        assessmentsQuery = assessmentsQuery.in('user_id', userIds);
      }
    }

    const { count: assessmentsCount } = await assessmentsQuery;

    // Get course progress stats (last 30 days)
    let progressQuery = supabase
      .from('course_progress')
      .select('*')
      .gte('started_at', thirtyDaysAgo.toISOString());

    if (org_id) {
      const { data: orgUsers } = await supabase
        .from('org_memberships')
        .select('user_id')
        .eq('org_id', org_id);
      
      const userIds = orgUsers?.map(u => u.user_id) || [];
      if (userIds.length > 0) {
        progressQuery = progressQuery.in('user_id', userIds);
      }
    }

    if (group_id) {
      const { data: groupUsers } = await supabase
        .from('class_enrollments')
        .select('user_id')
        .eq('group_id', group_id);
      
      const userIds = groupUsers?.map(u => u.user_id) || [];
      if (userIds.length > 0) {
        progressQuery = progressQuery.in('user_id', userIds);
      }
    }

    const { data: progressData } = await progressQuery;

    const completedCourses = progressData?.filter(p => p.completed).length || 0;
    const inProgressCourses = progressData?.filter(p => !p.completed).length || 0;

    const report = {
      users: usersCount || 0,
      last30d: {
        assessments: assessmentsCount || 0,
        clicks: progressData?.length || 0,
        saves: inProgressCourses,
        completes: completedCourses
      }
    };

    console.log('Usage report generated:', report);

    return new Response(
      JSON.stringify(report),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error generating usage report:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});