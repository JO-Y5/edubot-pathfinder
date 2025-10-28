
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SideDrawer from './SideDrawer';

export default function Navigation(){
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggleLang = () => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');

  useEffect(()=>{
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={()=>setOpen(true)} className="md:hidden border rounded px-2 py-1">☰</button>
          <Link to="/" className="font-extrabold text-lg">{t('appName') ?? 'EduMentor+'}</Link>
        </div>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link to="/">{t('nav_home') ?? 'Home'}</Link>
          <Link to="/assessment/start">{t('nav_assessment') ?? 'Assessment'}</Link>
          <Link to="/pricing">{t('nav_pricing') ?? 'Pricing'}</Link>
          <Link to="/help">{t('nav_help') ?? 'Help'}</Link>
          <button onClick={toggleLang} className="ml-2 border rounded px-2 py-1">{i18n.language === 'ar' ? 'EN' : 'AR'}</button>
        </nav>
        <button onClick={toggleLang} className="md:hidden border rounded px-2 py-1">{i18n.language === 'ar' ? 'EN' : 'AR'}</button>
      </div>
      <SideDrawer open={open} onClose={()=>setOpen(false)} />
    </header>
  );
}
