import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'ما هو EduBot Pathfinder؟',
      answer: 'EduBot Pathfinder هو منصة ذكية تستخدم الذكاء الاصطناعي لمساعدتك في اكتشاف المسار التعليمي المثالي بناءً على مهاراتك واهتماماتك وأهدافك المهنية.',
    },
    {
      question: 'كيف يعمل نظام التقييم؟',
      answer: 'نستخدم تقنية Computerized Adaptive Testing (CAT) التي تتكيف مع مستواك. الأسئلة تصبح أصعب أو أسهل بناءً على إجاباتك، مما يوفر تقييماً دقيقاً لمهاراتك.',
    },
    {
      question: 'ما الفرق بين الخطط المختلفة؟',
      answer: 'الخطة المجانية تتيح لك الوصول للتقييم الأساسي والتوصيات. خطة Pro توفر توصيات متقدمة ومدرب ذكي. خطة Enterprise مخصصة للمؤسسات مع لوحة تحكم متقدمة وتقارير مفصلة.',
    },
    {
      question: 'هل يمكنني الحصول على شهادة؟',
      answer: 'نعم! عند إكمال أي مسار تعليمي بنجاح، ستحصل على شهادة رقمية يمكنك تحميلها ومشاركتها مع رمز QR للتحقق.',
    },
    {
      question: 'كيف يتم حماية بياناتي؟',
      answer: 'نحن نأخذ الخصوصية على محمل الجد. جميع بياناتك محمية بتشفير SSL، ونستخدم Row Level Security في قاعدة البيانات لضمان وصولك فقط لبياناتك الخاصة.',
    },
    {
      question: 'هل يمكنني تتبع تقدمي؟',
      answer: 'بالتأكيد! لدينا نظام متكامل لتتبع التقدم مع إحصائيات تفصيلية، نظام نقاط وإنجازات، ولوحة تحكم شخصية.',
    },
    {
      question: 'كيف أتواصل مع الدعم الفني؟',
      answer: 'يمكنك التواصل معنا عبر صفحة الاتصال، أو إرسال بريد إلكتروني، أو استخدام نظام التذاكر داخل المنصة.',
    },
    {
      question: 'هل توجد خصومات للطلاب؟',
      answer: 'نعم، نوفر خصومات خاصة للطلاب والمؤسسات التعليمية. تواصل معنا للحصول على عرض خاص.',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">الأسئلة الشائعة</h1>
          <p className="text-xl text-muted-foreground">
            إجابات لأكثر الأسئلة شيوعاً حول EduBot Pathfinder
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-right text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-right text-muted-foreground text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
