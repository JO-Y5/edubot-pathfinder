import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function Pricing() {
  const { t } = useTranslation();
  const EDGE = import.meta.env.VITE_SUPABASE_URL + '/functions/v1';

  async function checkout(mode: 'personal' | 'org') {
    try {
      const res = await fetch(`${EDGE}/billing-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, user_id: '' })
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold text-center gradient-text">{t('pricing_title')}</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="p-6">
          <h2 className="font-bold text-xl">{t('free')}</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Basic assessment</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Limited recommendations</span>
            </li>
          </ul>
          <Button variant="outline" className="mt-6 w-full">
            {t('start_free')}
          </Button>
        </Card>

        <Card className="p-6 border-primary shadow-glow">
          <h2 className="font-bold text-xl">{t('pro')}</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Advanced recommendations</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Detailed reports</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">AI Mentor</span>
            </li>
          </ul>
          <Button 
            onClick={() => checkout('personal')} 
            className="mt-6 w-full bg-gradient-primary shadow-glow"
          >
            {t('subscribe_now')}
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="font-bold text-xl">{t('org')}</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Teams/Students management</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Org dashboards</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm">Monthly invoicing</span>
            </li>
          </ul>
          <Button 
            onClick={() => checkout('org')} 
            className="mt-6 w-full bg-gradient-primary"
          >
            {t('subscribe_now')}
          </Button>
        </Card>
      </div>
    </div>
  );
}
