import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, MessageCircle, Mail } from 'lucide-react';

export default function HelpCenter() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text mb-4">{t('help_center')}</h1>
        <p className="text-muted-foreground">
          {i18n.language === 'ar' 
            ? 'نحن هنا لمساعدتك في كل خطوة'
            : 'We are here to help you every step of the way'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="glass border-border hover:shadow-glow transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold mb-2">
              {i18n.language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {i18n.language === 'ar' 
                ? 'إجابات للأسئلة الأكثر شيوعاً'
                : 'Answers to the most common questions'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-border hover:shadow-glow transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold mb-2">
              {i18n.language === 'ar' ? 'الدردشة المباشرة' : 'Live Chat'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {i18n.language === 'ar' 
                ? 'تحدث مع فريق الدعم'
                : 'Talk to our support team'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-border hover:shadow-glow transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold mb-2">
              {i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </h3>
            <p className="text-sm text-muted-foreground">
              support@edumentor.com
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="item-1" className="glass border-border rounded-lg px-6">
          <AccordionTrigger className="text-right hover:no-underline">
            <span className="font-semibold">
              {i18n.language === 'ar' 
                ? 'كيف أبدأ التقييم؟'
                : 'How to start the assessment?'}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {i18n.language === 'ar'
              ? `اضغط "${t('cta_start')}" من الصفحة الرئيسية للبدء في رحلتك التعليمية والمهنية. سيتم توجيهك لاختيار مسارك (طالب جامعي أو ثانوي) ثم الإجابة على الأسئلة المخصصة.`
              : `Click "${t('cta_start')}" from the homepage to begin your educational and career journey. You'll be guided to choose your path (university or high school student) and then answer personalized questions.`}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="glass border-border rounded-lg px-6">
          <AccordionTrigger className="text-right hover:no-underline">
            <span className="font-semibold">
              {i18n.language === 'ar'
                ? 'كيف أرقّي للخطة Pro؟'
                : 'How to upgrade to Pro?'}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {i18n.language === 'ar'
              ? `من صفحة "${t('nav_pricing')}" سيتم تحويلك للدفع الآمن عبر Stripe. يمكنك اختيار الخطة الشهرية أو السنوية حسب احتياجاتك.`
              : `From the "${t('nav_pricing')}" page, you'll be redirected to secure payment via Stripe. You can choose monthly or annual plans based on your needs.`}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="glass border-border rounded-lg px-6">
          <AccordionTrigger className="text-right hover:no-underline">
            <span className="font-semibold">
              {i18n.language === 'ar'
                ? 'ما هي فوائد الخطة Pro؟'
                : 'What are Pro benefits?'}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {i18n.language === 'ar'
              ? 'توصيات متقدمة بالذكاء الاصطناعي، تقارير تفصيلية عن تقدمك، الوصول للمساعد الذكي، دورات حصرية، ومتابعة مستمرة مع مدربين متخصصين.'
              : 'Advanced AI recommendations, detailed progress reports, access to AI assistant, exclusive courses, and continuous follow-up with specialized coaches.'}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="glass border-border rounded-lg px-6">
          <AccordionTrigger className="text-right hover:no-underline">
            <span className="font-semibold">
              {i18n.language === 'ar'
                ? 'كيف أستخدم المساعد الذكي؟'
                : 'How to use the AI Assistant?'}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {i18n.language === 'ar'
              ? 'اضغط على الأيقونة 🤖 في أسفل الشاشة لفتح المساعد الذكي. يمكنك الدردشة معه أو استخدام ميزة الصوت (متاحة على متصفح Chrome).'
              : 'Click the 🤖 icon at the bottom of the screen to open the AI Assistant. You can chat with it or use voice feature (available on Chrome browser).'}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="glass border-border rounded-lg px-6">
          <AccordionTrigger className="text-right hover:no-underline">
            <span className="font-semibold">
              {i18n.language === 'ar'
                ? 'هل الشهادات معتمدة؟'
                : 'Are the certificates accredited?'}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {i18n.language === 'ar'
              ? 'نعم، جميع شهاداتنا معتمدة ويمكن مشاركتها على LinkedIn وإضافتها لسيرتك الذاتية.'
              : 'Yes, all our certificates are accredited and can be shared on LinkedIn and added to your CV.'}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
