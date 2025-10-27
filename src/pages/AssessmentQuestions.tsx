import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BANK_UNI, BANK_HS } from '@/data/assessmentBanks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

export default function AssessmentQuestions() {
  const { state } = useLocation() as any;
  const nav = useNavigate();
  const { i18n, t } = useTranslation();
  const isUni = state?.track === 'university';
  const BANK = isUni ? BANK_UNI : BANK_HS;
  const [answers, setAnswers] = useState<any>({});
  const isAr = i18n.language === 'ar';

  async function submit() {
    const EDGE = import.meta.env.VITE_SUPABASE_URL + '/functions/v1';
    const payload = {
      user_id: '',
      track: state?.track,
      profile: state?.uni || state?.sch || {},
      answers: Object.entries(answers).map(([id, value]) => ({ id, value }))
    };
    
    try {
      const res = await fetch(`${EDGE}/assessment-cat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      nav('/dashboard', { state: { assessment: data } });
    } catch (error) {
      console.error('Assessment submission error:', error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-bold gradient-text">
        {isUni ? t('uni_track_title') : t('hs_track_title')}
      </h1>
      
      <ol className="mt-6 space-y-4">
        {BANK.map((it: any, idx: number) => {
          const q = isAr ? it.q_ar : it.q_en;
          const options = isAr ? it.options_ar : it.options_en;
          
          return (
            <Card key={it.id} className="p-6">
              <div className="font-medium mb-4">{idx + 1}. {q}</div>
              
              {it.type === 'scale' && (
                <div className="space-y-2">
                  <Slider
                    min={it.min}
                    max={it.max}
                    step={1}
                    value={[answers[it.id] || it.min]}
                    onValueChange={(val) => setAnswers({ ...answers, [it.id]: val[0] })}
                  />
                  <div className="text-sm text-muted-foreground text-center">
                    {answers[it.id] || it.min}
                  </div>
                </div>
              )}
              
              {it.type === 'single' && (
                <div className="flex flex-wrap gap-2">
                  {options?.map((op: string) => (
                    <Button
                      key={op}
                      variant={answers[it.id] === op ? 'default' : 'outline'}
                      onClick={() => setAnswers({ ...answers, [it.id]: op })}
                    >
                      {op}
                    </Button>
                  ))}
                </div>
              )}
              
              {it.type === 'multi' && (
                <div className="space-y-2">
                  {options?.map((op: string) => (
                    <label key={op} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={(answers[it.id] || []).includes(op)}
                        onCheckedChange={(checked) => {
                          const prev: string[] = answers[it.id] || [];
                          const next = checked 
                            ? [...prev, op] 
                            : prev.filter(x => x !== op);
                          setAnswers({ ...answers, [it.id]: next });
                        }}
                      />
                      <span>{op}</span>
                    </label>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </ol>
      
      <Button 
        onClick={submit} 
        className="mt-6 bg-gradient-primary shadow-glow w-full"
      >
        {t('finish_assessment')}
      </Button>
    </div>
  );
}
