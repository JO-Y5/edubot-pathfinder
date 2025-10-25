import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useOrg } from "@/contexts/OrgContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, CreditCard, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Subscription {
  id: string;
  plan_type: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export default function Billing() {
  const { user } = useAuth();
  const { currentOrg } = useOrg();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [userPlan, setUserPlan] = useState<'basic' | 'pro' | 'org'>('basic');

  useEffect(() => {
    if (searchParams.get('success')) {
      toast({
        title: "Subscription successful!",
        description: "Your plan has been upgraded.",
      });
      navigate('/billing', { replace: true });
    }
    if (searchParams.get('canceled')) {
      toast({
        title: "Subscription canceled",
        description: "You can try again anytime.",
        variant: "destructive",
      });
      navigate('/billing', { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    fetchUserPlan();
    fetchSubscription();
  }, [user, currentOrg]);

  const fetchUserPlan = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("user_profiles")
      .select("plan")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setUserPlan(data.plan);
    }
  };

  const fetchSubscription = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (data) {
      setSubscription(data);
    }
  };

  const handleCheckout = async (mode: 'personal' | 'org') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upgrade your plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('billing-checkout', {
        body: {
          mode,
          user_id: user.id,
          org_id: mode === 'org' ? currentOrg?.id : undefined,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Billing & Plans</h1>
        <p className="text-muted-foreground">Choose the plan that fits your needs</p>
      </div>

      {subscription && (
        <Card className="mb-8 border-primary">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>Your active plan details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge className="mb-2">{subscription.plan_type.toUpperCase()}</Badge>
                <p className="text-sm text-muted-foreground">
                  Status: {subscription.status}
                </p>
                <p className="text-sm text-muted-foreground">
                  Renews on: {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Pro Plan */}
        <Card className={userPlan === 'pro' ? 'border-primary' : ''}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>Personal Pro</CardTitle>
            </div>
            <CardDescription>For individual users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">$29/month</div>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Unlimited recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Export data</span>
              </li>
            </ul>
            <Button
              onClick={() => handleCheckout('personal')}
              disabled={loading || userPlan === 'pro'}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {userPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </Button>
          </CardContent>
        </Card>

        {/* Organization Plan */}
        <Card className={userPlan === 'org' ? 'border-primary' : ''}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5" />
              <CardTitle>Organization</CardTitle>
            </div>
            <CardDescription>For teams and institutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-3xl font-bold mb-2">$99/month</div>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Everything in Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Up to 50 members</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Admin console</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Usage reports</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Dedicated support</span>
              </li>
            </ul>
            <Button
              onClick={() => handleCheckout('org')}
              disabled={loading || userPlan === 'org' || !currentOrg}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {userPlan === 'org' ? 'Current Plan' : 'Upgrade to Organization'}
            </Button>
            {!currentOrg && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Create an organization first
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}