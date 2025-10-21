import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Award, Globe, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t("home.badge")}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t("home.title")}
            <br />
            <span className="gradient-text">{t("home.titleHighlight")}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t("home.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 group">
                  {t("home.viewDashboard")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 group">
                    {t("home.startAssessment")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/assessment">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-primary/30 hover:bg-primary/10">
                    {t("home.viewDashboard")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">{t("home.tracks")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">100+</div>
              <div className="text-sm text-muted-foreground">{t("home.paths")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-muted-foreground">{t("home.certificates")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.aiMatching")}</h3>
            <p className="text-muted-foreground">
              {t("home.aiMatchingDesc")}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.learningPlan")}</h3>
            <p className="text-muted-foreground">
              {t("home.learningPlanDesc")}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.achievements")}</h3>
            <p className="text-muted-foreground">
              {t("home.achievementsDesc")}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("home.bilingualSupport")}</h3>
            <p className="text-muted-foreground">
              {t("home.bilingualSupportDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">{t("home.ctaTitle")}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("home.ctaDescription")}
            </p>
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
                {t("home.ctaButton")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
