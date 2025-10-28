
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setSEO } from '../lib/seo';
import AssistantLauncher from '../components/AssistantLauncher';

export default function Home(){
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    const title = i18n.language === 'ar' ? "التوجيه الأكاديمي والمهني | EduMentor+" : "Academic & Career Guidance | EduMentor+";
    const desc  = i18n.language === 'ar' ? "اختَر مسارك الأكاديمي والمهني بمساعدة الذكاء الاصطناعي." : "Choose your academic and career path with AI.";
    setSEO(title, desc);
  }, [i18n.language]);

  return (
    <section className="max-w-6xl mx-auto p-6 relative">
      <h1 className="text-4xl font-extrabold">{t('home_title') ?? 'Academic & Career Guidance'}</h1>
      <p className="mt-3 text-gray-600">{t('home_sub') ?? 'Choose your academic and career path with AI.'}</p>
      <Link to="/assessment/start" className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-xl">
        {t('cta_start') ?? 'Start Assessment'}
      </Link>
      <AssistantLauncher />
    </section>
  );
}
