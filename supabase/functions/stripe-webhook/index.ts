import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      console.error('Missing stripe-signature header');
      return new Response(
        JSON.stringify({ error: 'No signature provided' }), 
        { status: 400 }
      );
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Webhook secret not configured' }), 
        { status: 500 }
      );
    }

    const body = await req.text();
    
    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('Webhook signature verified successfully');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed:', errorMsg);
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }), 
        { status: 400 }
      );
    }

    console.log('Webhook event received:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
});

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata } = session;
  const user_id = metadata?.user_id;
  const plan = metadata?.plan;
  const org_id = metadata?.org_id;

  if (!user_id || !plan) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

  // Update user_profiles or organizations
  if (plan === 'pro') {
    await supabase
      .from('user_profiles')
      .update({ plan: 'pro' })
      .eq('user_id', user_id);
  } else if (plan === 'org' && org_id) {
    await supabase
      .from('organizations')
      .update({ 
        plan: 'org',
        stripe_customer_id: session.customer as string
      })
      .eq('id', org_id);
  }

  // Insert subscription record
  await supabase.from('subscriptions').insert({
    user_id: plan === 'pro' ? user_id : null,
    org_id: plan === 'org' ? org_id : null,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: session.customer as string,
    status: subscription.status,
    plan_type: plan,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  });

  console.log(`Subscription created for ${plan} plan`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id);

  console.log('Subscription updated:', subscription.id);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Get subscription record
  const { data: subRecord } = await supabase
    .from('subscriptions')
    .select('user_id, org_id, plan_type')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (subRecord) {
    // Downgrade to basic
    if (subRecord.plan_type === 'pro' && subRecord.user_id) {
      await supabase
        .from('user_profiles')
        .update({ plan: 'basic' })
        .eq('user_id', subRecord.user_id);
    } else if (subRecord.plan_type === 'org' && subRecord.org_id) {
      await supabase
        .from('organizations')
        .update({ plan: 'basic' })
        .eq('id', subRecord.org_id);
    }
  }

  // Update subscription status
  await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  console.log('Subscription deleted:', subscription.id);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  // Additional invoice handling can be added here
}