import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { EduBot } from "@/components/EduBot";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrgProvider } from "@/contexts/OrgContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/i18n/config";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import Assessment from "./pages/NewAssessment";
import AssessmentStart from "./pages/AssessmentStart";
import AssessmentQuestions from "./pages/AssessmentQuestions";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/NewCourses";
import Achievements from "./pages/Achievements";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Coach from "./pages/Coach";
import Billing from "./pages/Billing";
import Pricing from "./pages/Pricing";
import AdminConsole from "./pages/AdminConsole";
import AdminAdvanced from "./pages/AdminAdvanced";
import Invoices from "./pages/Invoices";
import Analytics from "./pages/Analytics";
import ABTesting from "./pages/ABTesting";
import Leaderboard from "./pages/Leaderboard";
import Certificates from "./pages/Certificates";
import Reports from "./pages/Reports";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import LegalPrivacy from "./pages/LegalPrivacy";
import LegalTerms from "./pages/LegalTerms";
import Providers from "./pages/Providers";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { i18n } = useTranslation();
  const [isBotOpen, setIsBotOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar onOpenBot={() => setIsBotOpen(true)} />
        
        <div className="flex-1 flex flex-col w-full">
          <Toaster />
          <Sonner />
          <Navigation onOpenBot={() => setIsBotOpen(true)} />
          <EduBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
          
          <main className="flex-1 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/assessment/start" element={<AssessmentStart />} />
              <Route path="/assessment/questions" element={<AssessmentQuestions />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<AdminConsole />} />
              <Route path="/admin/advanced" element={<AdminAdvanced />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ab-testing" element={<ABTesting />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/privacy" element={<LegalPrivacy />} />
              <Route path="/terms" element={<LegalTerms />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AuthProvider>
              <OrgProvider>
                <TooltipProvider>
                  <AppContent />
                </TooltipProvider>
              </OrgProvider>
            </AuthProvider>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
