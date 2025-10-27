import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, LayoutDashboard, BookOpen, Award, Settings, Bot, Moon, Sun, Languages, CreditCard, Shield, BarChart2, FileText, Trophy, Package, MessageSquare, FlaskConical } from "lucide-react";
import { NotificationBell } from './NotificationBell';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { FeedbackDialog } from "./FeedbackDialog";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  onOpenBot?: () => void;
}

export const Navigation = ({ onOpenBot }: NavigationProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t: tCtx } = useLanguage();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: t("nav_home") },
    { path: "/assessment/start", icon: ClipboardList, label: t("nav_assessment") },
    { path: "/dashboard", icon: LayoutDashboard, label: t("nav_dashboard") },
    { path: "/courses", icon: BookOpen, label: t("nav_courses") },
    { path: "/pricing", icon: CreditCard, label: t("nav_pricing") },
    { path: "/settings", icon: Settings, label: t("nav_settings") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-lg font-bold">E+</span>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:inline">EduMentor+</span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "relative hidden md:flex",
                      isActive && "bg-primary/10 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    )}
                  >
                    <Icon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            
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

              <Button
                size="sm"
                variant="outline"
                onClick={onOpenBot}
              >
                <Bot className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t("nav_askBot")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
