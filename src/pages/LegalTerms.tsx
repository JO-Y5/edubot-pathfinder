import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

export default function LegalTerms() {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold gradient-text mb-4">{t('terms_title')}</h1>
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
              {i18n.language === 'ar' ? '1. قبول الشروط' : '1. Acceptance of Terms'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? `باستخدامك لمنصة ${t('appName')}، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.`
                : `By using ${t('appName')} platform, you agree to comply with these terms and conditions. If you do not agree to any of these terms, please do not use the platform.`}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '2. استخدام المنصة' : '2. Use of Platform'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'يحق لك استخدام المنصة للأغراض التعليمية والمهنية الشخصية. لا يجوز استخدام المنصة لأي أغراض غير قانونية أو غير مصرح بها.'
                : 'You may use the platform for personal educational and professional purposes. You may not use the platform for any illegal or unauthorized purposes.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '3. حسابات المستخدمين' : '3. User Accounts'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور الخاصة بك. أنت توافق على قبول المسؤولية عن جميع الأنشطة التي تحدث تحت حسابك.'
                : 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '4. الملكية الفكرية' : '4. Intellectual Property'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'جميع المحتويات والمواد المتاحة على المنصة، بما في ذلك النصوص والرسومات والشعارات، هي ملكية لـ EduMentor+ ومحمية بموجب قوانين حقوق الطبع والنشر.'
                : 'All content and materials available on the platform, including texts, graphics, and logos, are property of EduMentor+ and protected by copyright laws.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '5. الاشتراكات والمدفوعات' : '5. Subscriptions and Payments'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'تتطلب بعض الميزات اشتراكاً مدفوعاً. جميع المدفوعات غير قابلة للاسترداد ما لم ينص القانون على خلاف ذلك.'
                : 'Some features require a paid subscription. All payments are non-refundable unless otherwise stated by law.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '6. إنهاء الحساب' : '6. Account Termination'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نحتفظ بالحق في إنهاء أو تعليق حسابك في أي وقت إذا انتهكت هذه الشروط.'
                : 'We reserve the right to terminate or suspend your account at any time if you violate these terms.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '7. التعديلات' : '7. Modifications'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية.'
                : 'We reserve the right to modify these terms at any time. You will be notified of any material changes.'}
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              {i18n.language === 'ar' ? '8. الاتصال' : '8. Contact'}
            </h2>
            <p>
              {i18n.language === 'ar'
                ? 'إذا كانت لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على: support@edumentor.com'
                : 'If you have any questions about these terms, please contact us at: support@edumentor.com'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
