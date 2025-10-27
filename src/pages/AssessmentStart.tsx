import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function AssessmentStart() {
  const { t } = useTranslation();
  const [track, setTrack] = useState<'university' | 'high_school' | ''>('');
  const [uni, setUni] = useState({ university_name: '', faculty: '', major: '' });
  const [sch, setSch] = useState({ grade: '', target_university: '' });
  const nav = useNavigate();
  
  function next() {
    if (!track) return;
    nav('/assessment/questions', { state: { track, uni, sch } });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-bold gradient-text">{t('assessment_choose_title')}</h1>
      
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Card 
          onClick={() => setTrack('university')} 
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${track === 'university' ? 'border-primary shadow-glow' : ''}`}
        >
          <h3 className="font-semibold text-lg">{t('uni_student')}</h3>
        </Card>
        <Card 
          onClick={() => setTrack('high_school')} 
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${track === 'high_school' ? 'border-primary shadow-glow' : ''}`}
        >
          <h3 className="font-semibold text-lg">{t('hs_student')}</h3>
        </Card>
      </div>

      {track === 'university' && (
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <Input 
            placeholder={t('university') as string} 
            value={uni.university_name} 
            onChange={e => setUni({ ...uni, university_name: e.target.value })}
          />
          <Input 
            placeholder={t('faculty') as string} 
            value={uni.faculty} 
            onChange={e => setUni({ ...uni, faculty: e.target.value })}
          />
          <Input 
            placeholder={t('major') as string} 
            value={uni.major} 
            onChange={e => setUni({ ...uni, major: e.target.value })}
          />
        </div>
      )}

      {track === 'high_school' && (
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <Input 
            placeholder={t('grade') as string} 
            value={sch.grade} 
            onChange={e => setSch({ ...sch, grade: e.target.value })}
          />
          <Input 
            placeholder={t('target_university') as string} 
            value={sch.target_university} 
            onChange={e => setSch({ ...sch, target_university: e.target.value })}
          />
        </div>
      )}

      <Button 
        onClick={next} 
        disabled={!track} 
        className="mt-6 bg-gradient-primary shadow-glow"
      >
        {t('start_questions')}
      </Button>
    </div>
  );
}
