import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setSEO } from '@/lib/seo';

export default function Home(){
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    const title = i18n.language === 'ar' 
      ? "التوجيه الأكاديمي والمهني | EduMentor+" 
      : "Academic & Career Guidance | EduMentor+";
    const desc = i18n.language === 'ar' 
      ? "اختَر مسارك الأكاديمي والمهني بمساعدة الذكاء الاصطناعي." 
      : "Choose your academic and career path with AI.";
    setSEO(title, desc);
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  return (
    <section className="max-w-6xl mx-auto p-6 pt-24">
      <h1 className="text-4xl font-extrabold gradient-text">{t('home_title')}</h1>
      <p className="mt-3 text-muted-foreground text-lg">{t('home_sub')}</p>
      <Link 
        to="/assessment/start" 
        className="mt-6 inline-block bg-gradient-primary text-white px-6 py-3 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
      >
        {t('cta_start')}
      </Link>
    </section>
  );
}
