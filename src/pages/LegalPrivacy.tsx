import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export default function LegalPrivacy() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text mb-4">{t('privacy_title')}</h1>
        <p className="text-muted-foreground">
          {i18n.language === 'ar' 
            ? 'آخر تحديث: يناير 2024'
            : 'Last updated: January 2024'}
        </p>
      </div>

      <div className="space-y-6">
        <Card className="glass border-border">
          <CardContent className="p-6 prose prose-sm max-w-none dark:prose-invert">
            <h2 className="text-2xl font-bold mb-4">
              {i18n.language === 'ar' ? '1. المعلومات التي نجمعها' : '1. Information We Collect'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نجمع المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب، مثل الاسم والبريد الإلكتروني. كما نجمع معلومات حول استخدامك للمنصة، بما في ذلك نتائج التقييمات وتقدمك في الدورات.'
                : 'We collect information you provide directly when creating an account, such as name and email. We also collect information about your use of the platform, including assessment results and course progress.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '2. كيف نستخدم معلوماتك' : '2. How We Use Your Information'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نستخدم معلوماتك لتوفير وتحسين خدماتنا، وتخصيص تجربتك، وإرسال إشعارات مهمة، وتحليل استخدام المنصة.'
                : 'We use your information to provide and improve our services, personalize your experience, send important notifications, and analyze platform usage.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '3. مشاركة المعلومات' : '3. Information Sharing'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك مع مزودي الخدمات الذين يساعدوننا في تشغيل المنصة، أو عندما يقتضي القانون ذلك.'
                : 'We do not sell your personal information. We may share your information with service providers who help us operate the platform, or when required by law.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '4. حماية البيانات' : '4. Data Security'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نستخدم تدابير أمنية متقدمة لحماية معلوماتك، بما في ذلك التشفير والتخزين الآمن.'
                : 'We use advanced security measures to protect your information, including encryption and secure storage.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '5. ملفات تعريف الارتباط' : '5. Cookies'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك وتذكر تفضيلاتك. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح.'
                : 'We use cookies to improve your experience and remember your preferences. You can control cookies through your browser settings.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '6. حقوقك' : '6. Your Rights'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'لديك الحق في الوصول إلى معلوماتك الشخصية، وتصحيحها، وحذفها. يمكنك أيضاً طلب نسخة من بياناتك.'
                : 'You have the right to access, correct, and delete your personal information. You can also request a copy of your data.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '7. الأطفال' : '7. Children'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'منصتنا ليست موجهة للأطفال دون سن 13 عاماً. نحن لا نجمع معلومات من الأطفال عن قصد.'
                : 'Our platform is not directed to children under 13. We do not knowingly collect information from children.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '8. التغييرات على سياسة الخصوصية' : '8. Changes to Privacy Policy'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية.'
                : 'We may update this privacy policy from time to time. We will notify you of any material changes.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '9. الاتصال بنا' : '9. Contact Us'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'إذا كانت لديك أي أسئلة حول سياسة الخصوصية، يرجى الاتصال بنا على: privacy@edumentor.com'
                : 'If you have any questions about this privacy policy, please contact us at: privacy@edumentor.com'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
