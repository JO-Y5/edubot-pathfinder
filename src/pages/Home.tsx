import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, TrendingUp, Award, Users, ArrowRight, Sparkles, Target, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { updatePageSEO, pageSEO } from "@/utils/seo";
import AssistantLauncher from "@/components/AssistantLauncher";

export default function Home() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    updatePageSEO(pageSEO.home);
  }, []);

  const features = [
    {
      icon: Brain,
      title: i18n.language === 'ar' ? 'تقييم ذكي' : 'Smart Assessment',
      description: i18n.language === 'ar' 
        ? 'اختبار شامل لتحديد مهاراتك واهتماماتك'
        : 'Comprehensive test to identify your skills and interests'
    },
    {
      icon: Target,
      title: i18n.language === 'ar' ? 'توصيات مخصصة' : 'Personalized Recommendations',
      description: i18n.language === 'ar'
        ? 'نقترح عليك المسارات الأكثر ملاءمة لك'
        : 'We suggest the most suitable paths for you'
    },
    {
      icon: TrendingUp,
      title: i18n.language === 'ar' ? 'متابعة التقدم' : 'Track Progress',
      description: i18n.language === 'ar'
        ? 'راقب تطورك وحقق أهدافك'
        : 'Monitor your development and achieve your goals'
    },
    {
      icon: Award,
      title: i18n.language === 'ar' ? 'شهادات معتمدة' : 'Certified Credentials',
      description: i18n.language === 'ar'
        ? 'احصل على شهادات تثبت مهاراتك'
        : 'Get certificates proving your skills'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
        
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-slide-up">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium gradient-text">
              {i18n.language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Platform'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="gradient-text">{t('home_title')}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('home_sub')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
                  {i18n.language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/assessment/start">
                  <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 group">
                    {t('cta_start')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    {i18n.language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{i18n.language === 'ar' ? '+10,000 مستخدم' : '10,000+ Users'}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{i18n.language === 'ar' ? '+100 دورة' : '100+ Courses'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{i18n.language === 'ar' ? 'شهادات معتمدة' : 'Certified'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              {i18n.language === 'ar' ? 'لماذا EduMentor+؟' : 'Why EduMentor+?'}
            </h2>
            <p className="text-muted-foreground">
              {i18n.language === 'ar' 
                ? 'نوفر لك كل ما تحتاجه لتحديد مسارك المهني'
                : 'Everything you need to define your career path'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="glass border-border hover:shadow-glow transition-all animate-slide-up hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              {i18n.language === 'ar' ? 'كيف يعمل؟' : 'How It Works?'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: i18n.language === 'ar' ? 'أجب على التقييم' : 'Take Assessment',
                desc: i18n.language === 'ar' ? 'أسئلة مصممة بعناية لفهم شخصيتك ومهاراتك' : 'Carefully designed questions to understand your personality and skills'
              },
              {
                step: '2',
                title: i18n.language === 'ar' ? 'احصل على التوصيات' : 'Get Recommendations',
                desc: i18n.language === 'ar' ? 'الذكاء الاصطناعي يحلل إجاباتك ويقترح المسارات المناسبة' : 'AI analyzes your answers and suggests suitable paths'
              },
              {
                step: '3',
                title: i18n.language === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey',
                desc: i18n.language === 'ar' ? 'تابع دوراتك وحقق أهدافك المهنية' : 'Follow your courses and achieve your career goals'
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            {i18n.language === 'ar' 
              ? 'جاهز لتحديد مسارك المهني؟'
              : 'Ready to Define Your Career Path?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {i18n.language === 'ar'
              ? 'انضم إلى آلاف المتعلمين واكتشف مسارك المهني المثالي'
              : 'Join thousands of learners and discover your ideal career path'}
          </p>
          <Link to={user ? "/dashboard" : "/assessment/start"}>
            <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
              {i18n.language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <AssistantLauncher />
    </div>
  );
}
