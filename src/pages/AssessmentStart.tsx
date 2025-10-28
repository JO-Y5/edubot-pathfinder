
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AssessmentStart(){
  const { t } = useTranslation();
  const [track, setTrack] = useState<'university'|'high_school'|''>('');
  const [uni, setUni] = useState({ university_name:'', faculty:'', major:'' });
  const [sch, setSch] = useState({ grade:'', target_university:'' });
  const nav = useNavigate();

  function next(){ if (!track) return; nav('/assessment/questions', { state: { track, uni, sch } }); }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{t('assessment_choose_title') ?? 'Select your current stage'}</h1>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <button onClick={()=>setTrack('university')} className={`border rounded-2xl p-4 ${track==='university'?'border-black':''}`}>{t('uni_student') ?? "I'm a university student"}</button>
        <button onClick={()=>setTrack('high_school')} className={`border rounded-2xl p-4 ${track==='high_school'?'border-black':''}`}>{t('hs_student') ?? "I'm a high-school student"}</button>
      </div>
      {track==='university' && (
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder={t('university') as string || 'University'} value={uni.university_name} onChange={e=>setUni({...uni, university_name:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder={t('faculty') as string || 'Faculty'} value={uni.faculty} onChange={e=>setUni({...uni, faculty:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder={t('major') as string || 'Major'} value={uni.major} onChange={e=>setUni({...uni, major:e.target.value})}/>
        </div>
      )}
      {track==='high_school' && (
        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder={t('grade') as string || 'Grade'} value={sch.grade} onChange={e=>setSch({...sch, grade:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder={t('target_university') as string || 'Target university (optional)'} value={sch.target_university} onChange={e=>setSch({...sch, target_university:e.target.value})}/>
        </div>
      )}
      <button onClick={next} disabled={!track} className="mt-6 bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50">{t('start_questions') ?? 'Start Questions'}</button>
    </div>
  );
}
