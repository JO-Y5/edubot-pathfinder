
import { useTranslation } from 'react-i18next';
export default function LegalTerms(){
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto p-6 prose">
      <h1>{t('terms_title') ?? 'Terms of Use'}</h1>
      <p>By using {t('appName') ?? 'EduMentor+'}, you agree to the following terms.</p>
    </div>
  );
}
