import { Link } from "react-router-dom";
import { Home, ClipboardList, Moon, Sun, Languages, Menu, Bot, Sparkles } from "lucide-react";
import { NotificationBell } from './NotificationBell';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface NavigationProps {
  onOpenBot?: () => void;
}

export const Navigation = ({ onOpenBot }: NavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <SidebarTrigger>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SidebarTrigger>

            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <span className="text-lg font-bold">E+</span>
              </div>
              <span className="font-bold text-xl gradient-text hidden sm:inline">EduMentor+</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t("nav_home")}</span>
              </Button>
            </Link>

            <Link to="/assessment/start">
              <Button variant="ghost" size="sm">
                <span>{t("nav_assessment")}</span>
              </Button>
            </Link>

            {/* AI Bot Button - Prominent */}
            <Button
              onClick={onOpenBot}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="w-4 h-4 sm:mr-2 animate-pulse" />
              <span className="font-semibold">
                {i18n.language === 'ar' ? 'مساعد AI' : 'AI Assistant'}
              </span>
            </Button>
            
            <div className="flex items-center gap-2 border-l border-border pl-2 ml-2">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button
                onClick={() => {
                  const newLang = i18n.language === 'ar' ? 'en' : 'ar';
                  i18n.changeLanguage(newLang);
                  document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
                }}
                variant="default"
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <Languages className="w-4 h-4 mr-1" />
                <span className="text-xs font-bold">
                  {i18n.language === 'ar' ? 'EN' : 'عر'}
                </span>
              </Button>

              {user && <NotificationBell />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
