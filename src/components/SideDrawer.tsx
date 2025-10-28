
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SideDrawer({open, onClose}:{open:boolean; onClose:()=>void}){
  const { t } = useTranslation();
  const rtl = document?.documentElement?.getAttribute('dir') === 'rtl';
  return (
    <div className={`fixed inset-0 z-40 ${open?'':'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute top-0 ${rtl?'right-0':'left-0'} h-full w-80 bg-white shadow-xl p-4 transition-transform ${open?'translate-x-0':rtl?'translate-x-full':'-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">{t('drawer_more') ?? 'More'}</h3>
          <button onClick={onClose} className="text-sm">{t('close') ?? 'Close'}</button>
        </div>
        <nav className="grid gap-3 text-sm">
          <Link to="/help" onClick={onClose}>{t('nav_help') ?? 'Help Center'}</Link>
          <Link to="/legal/terms" onClick={onClose}>{t('nav_terms') ?? 'Terms'}</Link>
          <Link to="/legal/privacy" onClick={onClose}>{t('nav_privacy') ?? 'Privacy'}</Link>
          <Link to="/pricing" onClick={onClose}>{t('nav_pricing') ?? 'Pricing'}</Link>
        </nav>
      </aside>
    </div>
  );
}
