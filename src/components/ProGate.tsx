import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProGateProps {
  current: number;
  max: number;
  onUpgrade?: () => void;
}

export const ProGate = ({ current, max, onUpgrade }: ProGateProps) => {
  const { t } = useLanguage();
  
  if (current < max) {
    return null;
  }

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span>وصلت إلى الحد الأقصى من التوصيات المجانية</span>
            <TrendingUp className="w-5 h-5 text-primary" />
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            لقد استخدمت {current} من {max} توصيات متاحة في الخطة المجانية. 
            للحصول على توصيات غير محدودة ومميزات إضافية، قم بالترقية إلى النسخة الاحترافية.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              توصيات غير محدودة
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              شرح تفصيلي لكل توصية
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              متابعة تقدمك المهني
            </div>
          </div>
          
          <Button 
            onClick={onUpgrade}
            className="w-full sm:w-auto"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            الترقية إلى Pro
          </Button>
        </div>
      </div>
    </Card>
  );
};
