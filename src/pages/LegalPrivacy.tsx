import { useTranslation } from 'react-i18next';

export default function LegalPrivacy() {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-3xl mx-auto p-6 pt-24 prose prose-slate dark:prose-invert">
      <h1>{t('privacy_title')}</h1>
      <p>We respect your privacy. نحن نحترم خصوصيتك.</p>
      
      <h2>Data Collected / البيانات المجمعة</h2>
      <p>Name, Email, Assessment results, Learning progress.</p>
      
      <h2>Purpose / الغرض</h2>
      <p>Personalization & product improvement. لتخصيص التجربة وتحسين المنتج.</p>
      
      <h2>Sharing / المشاركة</h2>
      <p>Payments (Stripe), Analytics (optional). الدفع (Stripe)، التحليلات (اختياري).</p>
      
      <h2>Your Rights / حقوقك</h2>
      <p>Access, correction, deletion. الوصول، التصحيح، الحذف.</p>
      
      <h2>Contact / تواصل</h2>
      <p>privacy@edumentor.app</p>
    </div>
  );
}
