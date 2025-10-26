import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { courseId, courseTitle } = await req.json();

    if (!courseId) {
      throw new Error('Course ID is required');
    }

    console.log(`Generating certificate for user ${user.id}, course ${courseId}`);

    // Check if user completed the course
    const { data: progress, error: progressError } = await supabaseClient
      .from('course_progress')
      .select('completed')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (progressError || !progress?.completed) {
      throw new Error('Course not completed');
    }

    // Check if certificate already exists
    const { data: existingCert } = await supabaseClient
      .from('certificates')
      .select('id, certificate_number')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (existingCert) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          certificate: existingCert,
          message: 'Certificate already exists'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique certificate number
    const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Get user profile
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .single();

    // Create certificate record
    const { data: certificate, error: certError } = await supabaseClient
      .from('certificates')
      .insert({
        user_id: user.id,
        course_id: courseId,
        certificate_number: certificateNumber,
        metadata: {
          course_title: courseTitle,
          user_name: profile?.full_name || 'المستخدم',
          issued_date: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (certError) throw certError;

    // Create notification
    await supabaseClient.from('notifications').insert({
      user_id: user.id,
      title: 'شهادة جديدة!',
      message: `تهانينا! حصلت على شهادة في ${courseTitle}`,
      type: 'success',
      link: '/certificates',
    });

    // Award achievement and points
    await supabaseClient.from('point_transactions').insert({
      user_id: user.id,
      points: 100,
      reason: `إتمام دورة: ${courseTitle}`,
      type: 'earned',
    });

    console.log('Certificate generated successfully:', certificateNumber);

    return new Response(
      JSON.stringify({ success: true, certificate }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating certificate:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
