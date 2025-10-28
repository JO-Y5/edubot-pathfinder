
import { useTranslation } from 'react-i18next';
export default function HelpCenter(){
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{t('help_center') ?? 'Help Center'}</h1>
      <div className="mt-4 grid gap-4">
        <details className="p-4 border rounded-2xl">
          <summary className="font-semibold">كيف أبدأ التقييم؟ / How to start the assessment?</summary>
          <p className="mt-2 text-sm">اضغط "{t('cta_start') ?? 'Start Assessment'}" من الصفحة الرئيسية…</p>
        </details>
      </div>
    </div>
  );
}
