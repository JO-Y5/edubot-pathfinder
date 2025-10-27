import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setSEO } from '@/lib/seo';
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Award, Globe, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              {i18n.language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Platform'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">{t('home_title')}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t('home_sub')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 group">
                  {i18n.language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/assessment">
                  <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 group">
                    {t('cta_start')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-primary/30 hover:bg-primary/10">
                    {t('nav_pricing')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">
                {i18n.language === 'ar' ? 'مسارات' : 'Tracks'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">100+</div>
              <div className="text-sm text-muted-foreground">
                {i18n.language === 'ar' ? 'مجالات مهنية' : 'Career Paths'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-muted-foreground">
                {i18n.language === 'ar' ? 'شهادات' : 'Certificates'}
              </div>
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
            <h3 className="text-xl font-semibold mb-2">
              {i18n.language === 'ar' ? 'مطابقة ذكية' : 'AI Matching'}
            </h3>
            <p className="text-muted-foreground">
              {i18n.language === 'ar' 
                ? 'نظام ذكي لمطابقة مهاراتك مع أفضل المسارات المهنية المناسبة'
                : 'Smart system to match your skills with the best suitable career paths'}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {i18n.language === 'ar' ? 'خطة تعلم مخصصة' : 'Learning Plan'}
            </h3>
            <p className="text-muted-foreground">
              {i18n.language === 'ar'
                ? 'احصل على خطة تعلم مخصصة بناءً على أهدافك ومستواك الحالي'
                : 'Get a personalized learning plan based on your goals and current level'}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {i18n.language === 'ar' ? 'إنجازات وشهادات' : 'Achievements'}
            </h3>
            <p className="text-muted-foreground">
              {i18n.language === 'ar'
                ? 'احصل على شهادات معتمدة وتتبع إنجازاتك خطوة بخطوة'
                : 'Earn certified credentials and track your achievements step by step'}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {i18n.language === 'ar' ? 'دعم ثنائي اللغة' : 'Bilingual Support'}
            </h3>
            <p className="text-muted-foreground">
              {i18n.language === 'ar'
                ? 'واجهة كاملة باللغتين العربية والإنجليزية للوصول الأمثل'
                : 'Full interface in both Arabic and English for optimal accessibility'}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            {i18n.language === 'ar' ? 'ماذا يقول مستخدمونا' : 'What Our Users Say'}
          </h2>
          <p className="text-xl text-muted-foreground">
            {i18n.language === 'ar' 
              ? 'آراء المتعلمين الذين حققوا أهدافهم معنا'
              : 'Reviews from learners who achieved their goals with us'}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold">أ</span>
              </div>
              <div>
                <div className="font-semibold">أحمد محمد</div>
                <div className="text-sm text-muted-foreground">مطور برمجيات</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "منصة رائعة ساعدتني في اختيار المسار المناسب. التوصيات كانت دقيقة جداً والمحتوى متنوع."
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <span className="text-lg font-bold">ف</span>
              </div>
              <div>
                <div className="font-semibold">فاطمة علي</div>
                <div className="text-sm text-muted-foreground">محللة بيانات</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "التقييم الذكي ساعدني على فهم نقاط قوتي وضعفي. الآن أنا في طريقي لتحقيق أهدافي المهنية."
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-lg font-bold">س</span>
              </div>
              <div>
                <div className="font-semibold">سارة خالد</div>
                <div className="text-sm text-muted-foreground">مصممة UX/UI</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "أفضل منصة لتوجيه المسار التعليمي. الواجهة سهلة والدعم ممتاز. أنصح بها بشدة!"
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">
              {i18n.language === 'ar' ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {i18n.language === 'ar'
                ? 'انضم إلى آلاف المتعلمين واكتشف مسارك المهني المثالي'
                : 'Join thousands of learners and discover your ideal career path'}
            </p>
            <Link to={user ? "/dashboard" : "/assessment"}>
              <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
                {i18n.language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
