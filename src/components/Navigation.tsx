import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Home, ClipboardList, LayoutDashboard, BookOpen, Award, Settings, DollarSign, Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationBell } from "./NotificationBell";
import SideDrawer from "./SideDrawer";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 glass border-b border-border backdrop-blur-lg bg-background/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl gradient-text hidden sm:inline">
                {t('appName')}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                <span>{t('nav_home')}</span>
              </Button>
            </Link>

            <Link to="/assessment/start">
              <Button variant="ghost" size="sm" className="gap-2">
                <ClipboardList className="w-4 h-4" />
                <span>{t('nav_assessment')}</span>
              </Button>
            </Link>

            {user && (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t('nav_dashboard')}</span>
                  </Button>
                </Link>

                <Link to="/courses">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{t('nav_courses')}</span>
                  </Button>
                </Link>

                <Link to="/achievements">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Award className="w-4 h-4" />
                    <span>{t('nav_achievements')}</span>
                  </Button>
                </Link>
              </>
            )}

            <Link to="/pricing">
              <Button variant="ghost" size="sm" className="gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{t('nav_pricing')}</span>
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full"
            >
              <Languages className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {user && <NotificationBell />}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDrawerOpen(true)}
              className="md:hidden rounded-full"
            >
              <ClipboardList className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
