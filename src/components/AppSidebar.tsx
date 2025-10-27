import { Link, useLocation } from "react-router-dom";
import { 
  Home, ClipboardList, LayoutDashboard, BookOpen, Award, 
  Settings, CreditCard, Shield, BarChart2, FileText, 
  Package, MessageSquare, FlaskConical, Trophy, Bot,
  HelpCircle, FileText as Legal, Users
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  onOpenBot?: () => void;
}

export function AppSidebar({ onOpenBot }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isAr = i18n.language === 'ar';
  const collapsed = state === "collapsed";

  const mainItems = [
    { path: "/", icon: Home, label: t("nav_home"), show: true },
    { path: "/assessment/start", icon: ClipboardList, label: t("nav_assessment"), show: true },
    { path: "/dashboard", icon: LayoutDashboard, label: t("nav_dashboard"), show: true },
    { path: "/courses", icon: BookOpen, label: t("nav_courses"), show: true },
    { path: "/achievements", icon: Award, label: t("nav_achievements"), show: true },
  ];

  const settingsItems = [
    { path: "/settings", icon: Settings, label: t("nav_settings"), show: true },
    { path: "/billing", icon: CreditCard, label: "Billing", show: !!user },
    { path: "/pricing", icon: CreditCard, label: t("nav_pricing"), show: true },
  ];

  const adminItems = [
    { path: "/admin", icon: Shield, label: "Admin", show: !!user },
    { path: "/admin/advanced", icon: BarChart2, label: "Advanced", show: !!user },
    { path: "/analytics", icon: BarChart2, label: "Analytics", show: !!user },
    { path: "/ab-testing", icon: FlaskConical, label: "A/B Tests", show: !!user },
    { path: "/invoices", icon: FileText, label: "Invoices", show: !!user },
  ];

  const supportItems = [
    { path: "/help", icon: HelpCircle, label: t("help_center"), show: true },
    { path: "/faq", icon: HelpCircle, label: "FAQ", show: true },
    { path: "/contact", icon: MessageSquare, label: "Contact", show: true },
  ];

  const otherItems = [
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard", show: true },
    { path: "/certificates", icon: FileText, label: "Certificates", show: true },
    { path: "/providers", icon: Package, label: "Providers", show: !!user },
    { path: "/reviews", icon: MessageSquare, label: "Reviews", show: true },
    { path: "/coach", icon: Users, label: "Coach", show: !!user },
  ];

  const legalItems = [
    { path: "/terms", icon: Legal, label: t("terms_title"), show: true },
    { path: "/privacy", icon: Legal, label: t("privacy_title"), show: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const renderMenuItems = (items: typeof mainItems) => {
    return items
      .filter(item => item.show)
      .map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);

        return (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton asChild>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  active && "bg-primary/10 text-primary font-semibold",
                  !active && "hover:bg-muted/50"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      });
  };

  return (
    <Sidebar
      side={isAr ? "right" : "left"}
      className={cn(
        "border-r",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Navigation"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(mainItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Settings"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(settingsItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin - only if user exists */}
        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>{!collapsed && "Admin"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(adminItems)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Support"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(supportItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other */}
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Other"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(otherItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Legal */}
        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Legal"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(legalItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Bot at bottom */}
        {onOpenBot && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={onOpenBot}>
                    <Bot className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{t("nav_askBot")}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
