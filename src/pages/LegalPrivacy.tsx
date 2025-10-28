
import { useTranslation } from 'react-i18next';
export default function LegalPrivacy(){
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto p-6 prose">
      <h1>{t('privacy_title') ?? 'Privacy Policy'}</h1>
      <p>We respect your privacy. نحن نحترم خصوصيتك.</p>
    </div>
  );
}
