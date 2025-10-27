import { useTranslation } from 'react-i18next';

export default function LegalTerms() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {isAr ? (
          <>
            <h1 className="text-3xl font-bold mb-6">{t('terms_title')}</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              مرحباً بك في EduMentor+. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. قبول الشروط</h2>
            <p>
              باستخدام منصة EduMentor+، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. الحساب والتسجيل</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>يجب أن تكون بعمر 16 عاماً على الأقل لاستخدام المنصة</li>
              <li>يجب تقديم معلومات دقيقة وصحيحة عند التسجيل</li>
              <li>أنت مسؤول عن الحفاظ على سرية بيانات حسابك</li>
              <li>لا يجوز مشاركة حسابك مع الآخرين</li>
              <li>يجب إخطارنا فوراً بأي استخدام غير مصرح به لحسابك</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. الاستخدام المقبول</h2>
            <p>يُسمح باستخدام المنصة للأغراض التعليمية والشخصية فقط. يُحظر:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>استخدام المنصة لأغراض غير قانونية أو احتيالية</li>
              <li>محاولة اختراق أو تعطيل أمان المنصة</li>
              <li>نسخ أو نشر محتوى المنصة دون إذن</li>
              <li>إساءة استخدام خدماتنا أو إزعاج المستخدمين الآخرين</li>
              <li>استخدام برامج آلية (bots) للوصول إلى المنصة</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. المحتوى والملكية الفكرية</h2>
            <p>
              جميع المحتويات على المنصة، بما في ذلك النصوص والصور والرسومات والشعارات، هي ملك لـ EduMentor+ أو مرخصة لها. لا يجوز استخدام أي محتوى دون إذن كتابي مسبق.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. الاشتراكات والمدفوعات</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>تتجدد الاشتراكات تلقائياً ما لم يتم إلغاؤها</li>
              <li>يمكن إلغاء الاشتراك في أي وقت من إعدادات الحساب</li>
              <li>لا نقدم استرداداً للمدفوعات بعد بدء فترة الاشتراك</li>
              <li>قد تتغير الأسعار مع إشعار مسبق لمدة 30 يوماً</li>
              <li>جميع المدفوعات تتم بشكل آمن عبر معالجات دفع موثوقة</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. إلغاء الحساب</h2>
            <p>
              نحتفظ بالحق في تعليق أو إنهاء حسابك إذا انتهكت هذه الشروط أو إذا اشتبهنا في نشاط احتيالي. يمكنك أيضاً حذف حسابك في أي وقت من إعدادات الحساب.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. إخلاء المسؤولية</h2>
            <p>
              يتم توفير المنصة "كما هي" دون أي ضمانات. نحن لا نضمن دقة أو اكتمال المحتوى أو التوصيات. استخدامك للمنصة على مسؤوليتك الخاصة.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. حدود المسؤولية</h2>
            <p>
              لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام أو عدم القدرة على استخدام المنصة، بما في ذلك فقدان البيانات أو الأرباح.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. التغييرات على الشروط</h2>
            <p>
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية، واستمرارك في استخدام المنصة يعني موافقتك على الشروط المعدلة.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. القانون الساري</h2>
            <p>
              تخضع هذه الشروط لقوانين المملكة العربية السعودية، ويتم حل أي نزاعات وفقاً لها.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. اتصل بنا</h2>
            <p className="mb-8">
              إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا على:<br />
              البريد الإلكتروني: support@edumentor.com<br />
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">{t('terms_title')}</h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to EduMentor+. By using this platform, you agree to comply with the following terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By using the EduMentor+ platform, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree to any of these terms, please do not use the platform.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account and Registration</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 16 years old to use the platform</li>
              <li>You must provide accurate and truthful information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You may not share your account with others</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Acceptable Use</h2>
            <p>The platform may only be used for educational and personal purposes. Prohibited activities include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the platform for illegal or fraudulent purposes</li>
              <li>Attempting to breach or disrupt platform security</li>
              <li>Copying or distributing platform content without permission</li>
              <li>Misusing our services or harassing other users</li>
              <li>Using automated programs (bots) to access the platform</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Content and Intellectual Property</h2>
            <p>
              All content on the platform, including text, images, graphics, and logos, is owned by or licensed to EduMentor+. No content may be used without prior written permission.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Subscriptions and Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>Subscriptions can be cancelled at any time from account settings</li>
              <li>We do not offer refunds after the subscription period begins</li>
              <li>Prices may change with 30 days notice</li>
              <li>All payments are processed securely through trusted payment processors</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these terms or if we suspect fraudulent activity. You may also delete your account at any time from account settings.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Disclaimer</h2>
            <p>
              The platform is provided "as is" without any warranties. We do not guarantee the accuracy or completeness of content or recommendations. You use the platform at your own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              We shall not be liable for any direct or indirect damages resulting from the use or inability to use the platform, including loss of data or profits.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. You will be notified of any material changes, and your continued use of the platform constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
            <p>
              These terms are governed by the laws of Saudi Arabia, and any disputes shall be resolved accordingly.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
            <p className="mb-8">
              If you have any questions about these terms and conditions, please contact us at:<br />
              Email: support@edumentor.com<br />
              Last updated: {new Date().toLocaleDateString('en-US')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
