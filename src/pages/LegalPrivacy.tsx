import { useTranslation } from 'react-i18next';

export default function LegalPrivacy() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {isAr ? (
          <>
            <h1 className="text-3xl font-bold mb-6">{t('privacy_title')}</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              نحن في EduMentor+ نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">البيانات التي نجمعها</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>المعلومات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف</li>
              <li>البيانات الأكاديمية: الجامعة، الكلية، التخصص، المستوى الدراسي</li>
              <li>نتائج التقييمات والاختبارات</li>
              <li>سجل التقدم في الدورات والإنجازات</li>
              <li>بيانات الاستخدام وملفات تعريف الارتباط</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">كيف نستخدم بياناتك</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>تقديم توصيات مخصصة للمسار الأكاديمي والمهني</li>
              <li>تحليل نتائج التقييمات وتقديم التوجيه المناسب</li>
              <li>تحسين خدماتنا وتطوير المنصة</li>
              <li>التواصل معك بخصوص حسابك وخدماتنا</li>
              <li>ضمان أمان المنصة ومنع الاستخدام غير المصرح به</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">مشاركة البيانات</h2>
            <p>نحن لا نبيع بياناتك الشخصية. قد نشارك معلوماتك مع:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>مزودي خدمات الدفع (Stripe) لمعالجة الاشتراكات</li>
              <li>أدوات التحليلات (اختيارية) لتحسين الخدمة</li>
              <li>الجهات القانونية عند الطلب أو الضرورة القانونية</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">حقوقك</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>الوصول إلى بياناتك الشخصية ومراجعتها</li>
              <li>تصحيح أو تحديث معلوماتك</li>
              <li>حذف حسابك وبياناتك</li>
              <li>الاعتراض على معالجة بياناتك</li>
              <li>تنزيل نسخة من بياناتك</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">أمان البيانات</h2>
            <p>
              نستخدم تقنيات التشفير والأمان المتقدمة لحماية بياناتك. يتم تخزين جميع البيانات على خوادم آمنة مع نسخ احتياطي منتظم.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
            <p>
              نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم وتذكر تفضيلاتك. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من متصفحك.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">التحديثات على هذه السياسة</h2>
            <p>
              قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم إخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار على المنصة.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">اتصل بنا</h2>
            <p className="mb-8">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا على:<br />
              البريد الإلكتروني: privacy@edumentor.com<br />
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">{t('privacy_title')}</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              At EduMentor+, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information: Name, email, phone number</li>
              <li>Academic data: University, faculty, major, grade level</li>
              <li>Assessment and test results</li>
              <li>Course progress and achievements</li>
              <li>Usage data and cookies</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide personalized academic and career path recommendations</li>
              <li>Analyze assessment results and provide appropriate guidance</li>
              <li>Improve our services and develop the platform</li>
              <li>Communicate with you about your account and services</li>
              <li>Ensure platform security and prevent unauthorized use</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing</h2>
            <p>We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment service providers (Stripe) to process subscriptions</li>
              <li>Analytics tools (optional) to improve service</li>
              <li>Legal authorities when requested or legally required</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review your personal data</li>
              <li>Correct or update your information</li>
              <li>Delete your account and data</li>
              <li>Object to data processing</li>
              <li>Download a copy of your data</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We use advanced encryption and security technologies to protect your data. All data is stored on secure servers with regular backups.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
            <p>
              We use cookies to enhance user experience and remember your preferences. You can control cookie settings from your browser.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. You will be notified of any material changes via email or platform notification.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="mb-8">
              If you have any questions about this privacy policy, please contact us at:<br />
              Email: privacy@edumentor.com<br />
              Last updated: {new Date().toLocaleDateString('en-US')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
