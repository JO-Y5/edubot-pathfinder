import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaywallProps {
  children: ReactNode;
  isPro: boolean;
  feature?: string;
  description?: string;
}

export const Paywall = ({ 
  children, 
  isPro, 
  feature = "this feature",
  description = "Upgrade to Pro to unlock unlimited access and advanced features."
}: PaywallProps) => {
  const navigate = useNavigate();

  if (isPro) {
    return <>{children}</>;
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Lock className="h-5 w-5 text-primary" />
          <CardTitle>Pro Feature</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => navigate('/billing')} className="w-full">
          <Crown className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </Button>
      </CardContent>
    </Card>
  );
};