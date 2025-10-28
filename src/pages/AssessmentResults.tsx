import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Award, ArrowRight, Sparkles } from 'lucide-react';
import { updatePageSEO } from '@/utils/seo';

// RIASEC meanings
const RIASEC_INFO = {
  R: { ar: 'واقعي - عملي', en: 'Realistic - Practical', color: 'bg-blue-500' },
  I: { ar: 'استقصائي - بحثي', en: 'Investigative - Analytical', color: 'bg-purple-500' },
  A: { ar: 'فني - إبداعي', en: 'Artistic - Creative', color: 'bg-pink-500' },
  S: { ar: 'اجتماعي - خدمي', en: 'Social - Helpful', color: 'bg-green-500' },
  E: { ar: 'مقاول - قيادي', en: 'Enterprising - Leadership', color: 'bg-orange-500' },
  C: { ar: 'تقليدي - منظم', en: 'Conventional - Organized', color: 'bg-cyan-500' }
};

// Track information
const TRACK_INFO: Record<string, { ar: string; en: string; desc_ar: string; desc_en: string; icon: string }> = {
  ai: {
    ar: 'الذكاء الاصطناعي والتعلم الآلي',
    en: 'Artificial Intelligence & Machine Learning',
    desc_ar: 'تطوير أنظمة ذكية قادرة على التعلم والتحليل',
    desc_en: 'Develop intelligent systems capable of learning and analysis',
    icon: '🤖'
  },
  web: {
    ar: 'تطوير الويب والتطبيقات',
    en: 'Web & App Development',
    desc_ar: 'بناء مواقع وتطبيقات تفاعلية',
    desc_en: 'Build interactive websites and applications',
    icon: '💻'
  },
  cyber: {
    ar: 'الأمن السيبراني',
    en: 'Cybersecurity',
    desc_ar: 'حماية الأنظمة والشبكات من التهديدات',
    desc_en: 'Protect systems and networks from threats',
    icon: '🔒'
  },
  design: {
    ar: 'تصميم تجربة المستخدم',
    en: 'UX/UI Design',
    desc_ar: 'تصميم واجهات مستخدم جميلة وسهلة الاستخدام',
    desc_en: 'Design beautiful and user-friendly interfaces',
    icon: '🎨'
  },
  business: {
    ar: 'إدارة الأعمال التقنية',
    en: 'Tech Business Management',
    desc_ar: 'قيادة المشاريع والفرق التقنية',
    desc_en: 'Lead technical projects and teams',
    icon: '📊'
  }
};

export default function AssessmentResults() {
  const { state } = useLocation() as any;
  const nav = useNavigate();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  useEffect(() => {
    updatePageSEO({
      title: isAr ? 'نتائج التقييم | EduMentor+' : 'Assessment Results | EduMentor+',
      description: isAr 
        ? 'اكتشف مسارك المهني المناسب بناءً على نتائج التقييم'
        : 'Discover your suitable career path based on assessment results',
      keywords: ['assessment', 'results', 'career', 'guidance'],
      ogImage: '/og-results.png',
      canonicalUrl: '/assessment/results'
    });
  }, [isAr]);

  if (!state?.assessment) {
    nav('/assessment/start');
    return null;
  }

  const { riasec, big5, tracks, confidence, recommendations } = state.assessment;

  // Sort RIASEC by score
  const sortedRiasec = Object.entries(riasec as Record<string, number>)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3);

  // Sort tracks by score
  const sortedTracks = Object.entries(tracks as Record<string, number>)
    .sort(([, a], [, b]) => (b as number) - (a as number));

  const topTrack = sortedTracks[0];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium gradient-text">
              {isAr ? 'نتائج التقييم جاهزة!' : 'Your Results Are Ready!'}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 gradient-text">
            {isAr ? 'نتائج تقييمك الشخصي' : 'Your Personalized Assessment Results'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isAr 
              ? 'تم تحليل إجاباتك بدقة باستخدام نموذج RIASEC العلمي'
              : 'Your answers were analyzed using the scientific RIASEC model'}
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              {isAr ? 'دقة التقييم:' : 'Confidence Score:'}{' '}
              <span className="text-primary font-bold">{Math.round(confidence * 100)}%</span>
            </span>
          </div>
        </div>

        {/* Top Recommendation */}
        <Card className="mb-8 overflow-hidden border-primary/30 shadow-glow animate-slide-up">
          <div className="h-2 bg-gradient-primary" />
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{TRACK_INFO[topTrack[0]]?.icon || '🎯'}</div>
              <div className="flex-1">
                <Badge className="mb-3 bg-gradient-primary">
                  {isAr ? 'المسار الأنسب لك' : 'Best Match For You'}
                </Badge>
                <h2 className="text-3xl font-bold mb-2">
                  {isAr ? TRACK_INFO[topTrack[0]]?.ar : TRACK_INFO[topTrack[0]]?.en}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {isAr ? TRACK_INFO[topTrack[0]]?.desc_ar : TRACK_INFO[topTrack[0]]?.desc_en}
                </p>
                <Progress value={topTrack[1] * 100} className="h-3 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {isAr ? 'نسبة التطابق:' : 'Match Score:'}{' '}
                  <span className="font-bold text-primary">{Math.round(topTrack[1] * 100)}%</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* RIASEC Profile */}
          <Card className="glass border-border animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                {isAr ? 'ملفك الشخصي (RIASEC)' : 'Your Personality Profile (RIASEC)'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedRiasec.map(([code, score], index) => (
                <div key={code} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.color}`} />
                      <span className="font-medium">
                        {isAr 
                          ? RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.ar 
                          : RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.en}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {Math.round((score as number) * 100)}%
                    </span>
                  </div>
                  <Progress value={(score as number) * 100} className="h-2" />
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4">
                {isAr 
                  ? 'نموذج RIASEC يصنف الشخصيات إلى 6 أنواع لمساعدتك في اختيار المسار المهني المناسب'
                  : 'RIASEC model classifies personalities into 6 types to help you choose the right career path'}
              </p>
            </CardContent>
          </Card>

          {/* All Track Recommendations */}
          <Card className="glass border-border animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {isAr ? 'جميع المسارات المقترحة' : 'All Recommended Tracks'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedTracks.map(([trackName, score], index) => (
                <div key={trackName} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{TRACK_INFO[trackName]?.icon}</span>
                      <span className="font-medium text-sm">
                        {isAr ? TRACK_INFO[trackName]?.ar : TRACK_INFO[trackName]?.en}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {Math.round((score as number) * 100)}%
                    </span>
                  </div>
                  <Progress value={(score as number) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="glass border-border animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {isAr ? 'الخطوات التالية' : 'Next Steps'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-bold mb-2">
                  {isAr ? 'استكشف الدورات' : 'Explore Courses'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {isAr 
                    ? 'تصفح الدورات المناسبة لمسارك المهني'
                    : 'Browse courses matching your career path'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => nav('/courses')}
                  className="gap-2"
                >
                  {isAr ? 'الدورات' : 'Courses'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="font-bold mb-2">
                  {isAr ? 'ابدأ التعلم' : 'Start Learning'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {isAr 
                    ? 'تابع تقدمك واكسب الإنجازات'
                    : 'Track your progress and earn achievements'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => nav('/dashboard')}
                  className="gap-2"
                >
                  {isAr ? 'لوحة التحكم' : 'Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-bold mb-2">
                  {isAr ? 'استشر المساعد' : 'Ask Assistant'}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {isAr 
                    ? 'احصل على نصائح مخصصة من المساعد الذكي'
                    : 'Get personalized advice from AI assistant'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => nav('/')}
                  className="gap-2"
                >
                  {isAr ? 'المساعد' : 'Assistant'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            className="bg-gradient-primary shadow-glow text-lg px-12"
            onClick={() => nav('/dashboard')}
          >
            {isAr ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
