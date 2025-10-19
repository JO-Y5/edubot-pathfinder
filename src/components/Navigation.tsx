import { Link, useLocation } from "react-router-dom";
import { Home, ClipboardList, LayoutDashboard, BookOpen, Award, Settings, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onOpenBot?: () => void;
}

export const Navigation = ({ onOpenBot }: NavigationProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/assessment", icon: ClipboardList, label: "Assessment" },
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/courses", icon: BookOpen, label: "Courses" },
    { path: "/achievements", icon: Award, label: "Achievements" },
    { path: "/settings", icon: Settings, label: "Settings" },
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
                      "relative",
                      isActive && "bg-primary/10 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    )}
                  >
                    <Icon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <Button
              size="sm"
              className="bg-gradient-primary shadow-glow"
              onClick={onOpenBot}
            >
              <Bot className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">EduBot</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
