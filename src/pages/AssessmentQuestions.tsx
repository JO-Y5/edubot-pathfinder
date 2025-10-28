
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BANK_UNI, BANK_HS } from '../data/assessmentBanks';

export default function AssessmentQuestions(){
  const { state } = useLocation() as any;
  const nav = useNavigate();
  const { i18n, t } = useTranslation();
  const isUni = state?.track === 'university';
  const BANK = isUni ? BANK_UNI : BANK_HS;
  const [answers, setAnswers] = useState<any>({});
  const isAr = i18n.language === 'ar';

  async function submit(){
    const EDGE = import.meta.env.VITE_EDGE_URL;
    const payload = { user_id:'', track: state?.track, profile: state?.uni || state?.sch || {}, answers: Object.entries(answers).map(([id,value])=>({ id, value })) };
    const res = await fetch(`${EDGE}/assessment-cat`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const data = await res.json();
    nav('/results', { state:{ assessment:data } });
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{isUni ? (t('uni_track_title') ?? 'University Track Assessment') : (t('hs_track_title') ?? 'High-School Track Assessment')}</h1>
      <ol className="mt-4 space-y-4">
        {BANK.map((it:any, idx:number)=>{
          const q = isAr ? it.q_ar : it.q_en;
          const options = isAr ? it.options_ar : it.options_en;
          return (
            <li key={it.id} className="p-4 border rounded-2xl">
              <div className="font-medium">{idx+1}. {q}</div>
              {it.type==='scale' && (
                <input type="range" min={it.min} max={it.max} onChange={e=>setAnswers({ ...answers, [it.id]: Number((e.target as HTMLInputElement).value) })}/>
              )}
              {it.type==='single' && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {options?.map((op:string)=>(
                    <button key={op} onClick={()=>setAnswers({ ...answers, [it.id]: op })} className={`px-3 py-1 rounded border ${answers[it.id]===op?'bg-black text-white':''}`}>{op}</button>
                  ))}
                </div>
              )}
              {it.type==='multi' && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {options?.map((op:string)=>(
                    <label key={op} className="text-sm flex items-center gap-1">
                      <input type="checkbox" onChange={e=>{ const prev:string[] = answers[it.id] || []; const next = (e.target as HTMLInputElement).checked ? [...prev, op] : prev.filter(x=>x!==op); setAnswers({ ...answers, [it.id]: next }); }}/>
                      {op}
                    </label>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <button onClick={submit} className="mt-6 bg-black text-white px-6 py-3 rounded-xl">{t('finish_assessment') ?? 'Finish Assessment'}</button>
    </div>
  );
}
