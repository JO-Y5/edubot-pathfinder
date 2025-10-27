import { useTranslation } from 'react-i18next';

export default function LegalTerms() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto p-6 pt-24 prose prose-slate dark:prose-invert">
      <h1>{t('terms_title')}</h1>
      <p>
        By using {t('appName')}, you agree to the following terms. 
        باستخدامك للخدمة فإنك توافق على الشروط التالية.
      </p>
      
      <h2>Account / الحساب</h2>
      <ul>
        <li>No credential sharing. عدم مشاركة بيانات الدخول.</li>
        <li>Personal/Educational use. استخدام شخصي/تعليمي.</li>
      </ul>
      
      <h2>Content & IP / المحتوى والملكية الفكرية</h2>
      <p>All content provided is for educational purposes.</p>
      
      <h2>Payments & Subscriptions / الدفع والاشتراكات</h2>
      <p>Subscriptions are billed monthly. Auto-renewal can be cancelled anytime.</p>
      
      <h2>Disclaimer / إخلاء المسؤولية</h2>
      <p>Recommendations are AI-generated and should be verified with professionals.</p>
      
      <h2>Contact / تواصل</h2>
      <p>support@edumentor.app</p>
    </div>
  );
}
