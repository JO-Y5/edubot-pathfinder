import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HelpCenter() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-bold gradient-text">{t('help_center')}</h1>
      
      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-right">
            كيف أبدأ التقييم؟ / How to start the assessment?
          </AccordionTrigger>
          <AccordionContent>
            اضغط "{t('cta_start')}" من الصفحة الرئيسية للبدء في رحلتك التعليمية والمهنية.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-right">
            كيف أرقّي للخطة Pro؟ / How to upgrade?
          </AccordionTrigger>
          <AccordionContent>
            من صفحة "{t('nav_pricing')}" سيتم تحويلك للدفع الآمن عبر Stripe.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-right">
            ما هي فوائد الخطة Pro؟ / What are Pro benefits?
          </AccordionTrigger>
          <AccordionContent>
            توصيات متقدمة، تقارير تفصيلية، الوصول للمساعد الذكي، ومتابعة مستمرة لتقدمك.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
