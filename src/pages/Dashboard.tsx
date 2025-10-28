import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, TrendingUp, Sparkles, Target, Brain, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { updatePageSEO, pageSEO } from "@/utils/seo";

// RIASEC info
const RIASEC_INFO = {
  R: { ar: 'واقعي - عملي', en: 'Realistic - Practical', color: 'bg-blue-500' },
  I: { ar: 'استقصائي - بحثي', en: 'Investigative - Analytical', color: 'bg-purple-500' },
  A: { ar: 'فني - إبداعي', en: 'Artistic - Creative', color: 'bg-pink-500' },
  S: { ar: 'اجتماعي - خدمي', en: 'Social - Helpful', color: 'bg-green-500' },
  E: { ar: 'مقاول - قيادي', en: 'Enterprising - Leadership', color: 'bg-orange-500' },
  C: { ar: 'تقليدي - منظم', en: 'Conventional - Organized', color: 'bg-cyan-500' }
};

// Track info
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

interface AssessmentData {
  riasec: Record<string, number>;
  tracks: Record<string, number>;
  confidence: number;
  recommendations?: any;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePageSEO(pageSEO.dashboard);
    
    const fetchAssessmentResults = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const { data, error } = await supabase
          .from('assessment_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error fetching results:', error);
        }

        if (data && data.answers) {
          setAssessmentData(data.answers as unknown as AssessmentData);
        }
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentResults();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <Card className="p-12 text-center glass max-w-md border-primary/20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-lg">
              {isAr ? 'جاري تحميل لوحة المعلومات...' : 'Loading your dashboard...'}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!assessmentData) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <Card className="p-12 text-center glass max-w-md border-primary/20">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">
            {isAr ? 'لا توجد نتائج تقييم' : 'No Assessment Results'}
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            {isAr 
              ? 'قم بإجراء التقييم أولاً لرؤية لوحة المعلومات الخاصة بك'
              : 'Take the assessment first to see your personalized dashboard'}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/assessment/start")}
            className="bg-gradient-primary shadow-glow"
          >
            {isAr ? 'ابدأ التقييم' : 'Start Assessment'}
          </Button>
        </Card>
      </div>
    );
  }

  const { riasec, tracks, confidence } = assessmentData;

  // Sort RIASEC
  const sortedRiasec = Object.entries(riasec)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Sort tracks
  const sortedTracks = Object.entries(tracks)
    .sort(([, a], [, b]) => b - a);

  const topTrack = sortedTracks[0];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-primary/20 shadow-glow">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-base font-semibold gradient-text">
              {isAr ? 'لوحة المعلومات الخاصة بك' : 'Your Dashboard'}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {isAr ? 'نتائج تقييمك الشخصي' : 'Your Personalized Results'}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {isAr 
              ? 'تم تحليل إجاباتك بدقة باستخدام نموذج RIASEC العلمي'
              : 'Your answers were analyzed using the scientific RIASEC model'}
          </p>

          <div className="flex items-center justify-center gap-3 mt-8 bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20 w-fit mx-auto">
            <Award className="w-6 h-6 text-primary" />
            <span className="text-base font-medium">
              {isAr ? 'دقة التقييم:' : 'Confidence Score:'}{' '}
              <span className="text-primary font-bold text-lg">{Math.round(confidence * 100)}%</span>
            </span>
          </div>
        </div>

        {/* Top Recommendation */}
        <Card className="mb-8 overflow-hidden border-primary/30 shadow-glow animate-slide-up bg-gradient-to-br from-card to-card/50">
          <div className="h-3 bg-gradient-primary" />
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="text-7xl md:text-8xl">{TRACK_INFO[topTrack[0]]?.icon || '🎯'}</div>
              <div className="flex-1 text-center md:text-start">
                <Badge className="mb-4 bg-gradient-primary text-base px-4 py-2 shadow-glow">
                  {isAr ? 'المسار الأنسب لك' : 'Best Match For You'}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
                  {isAr ? TRACK_INFO[topTrack[0]]?.ar : TRACK_INFO[topTrack[0]]?.en}
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {isAr ? TRACK_INFO[topTrack[0]]?.desc_ar : TRACK_INFO[topTrack[0]]?.desc_en}
                </p>
                <Progress value={topTrack[1] * 100} className="h-4 mb-3" />
                <p className="text-base text-muted-foreground">
                  {isAr ? 'نسبة التطابق:' : 'Match Score:'}{' '}
                  <span className="font-bold text-primary text-xl">{Math.round(topTrack[1] * 100)}%</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* RIASEC Profile */}
          <Card className="glass border-primary/20 animate-slide-up hover:border-primary/40 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                {isAr ? 'ملفك الشخصي (RIASEC)' : 'Your Personality Profile (RIASEC)'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              {sortedRiasec.map(([code, score]) => (
                <div key={code} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.color} shadow-md`} />
                      <span className="font-semibold text-base">
                        {isAr ? RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.ar : RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.en}
                      </span>
                    </div>
                    <span className="text-base font-bold text-primary">
                      {Math.round(score * 100)}%
                    </span>
                  </div>
                  <Progress value={score * 100} className="h-3" />
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-6 pt-4 border-t border-border/50">
                {isAr 
                  ? 'نموذج RIASEC يصنف الشخصيات إلى 6 أنواع لمساعدتك في اختيار المسار المهني المناسب'
                  : 'RIASEC model classifies personalities into 6 types to help you choose the right career path'}
              </p>
            </CardContent>
          </Card>

          {/* All Tracks */}
          <Card className="glass border-primary/20 animate-slide-up hover:border-primary/40 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                {isAr ? 'جميع المسارات المقترحة' : 'All Recommended Tracks'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              {sortedTracks.map(([trackId, score]) => (
                <div key={trackId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{TRACK_INFO[trackId]?.icon}</span>
                      <span className="font-semibold text-base">
                        {isAr ? TRACK_INFO[trackId]?.ar : TRACK_INFO[trackId]?.en}
                      </span>
                    </div>
                    <span className="text-base font-bold text-primary">
                      {Math.round(score * 100)}%
                    </span>
                  </div>
                  <Progress value={score * 100} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="glass border-primary/20 animate-slide-up hover:border-primary/40 transition-all duration-300" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              {isAr ? 'الخطوات التالية' : 'Next Steps'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="font-bold text-lg mb-3">
                  {isAr ? 'استكشف الدورات' : 'Explore Courses'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                  {isAr 
                    ? 'تصفح الدورات المناسبة لمسارك المهني'
                    : 'Browse courses matching your career path'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/courses')}
                  className="gap-2 w-full"
                >
                  {isAr ? 'الدورات' : 'Courses'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="font-bold text-lg mb-3">
                  {isAr ? 'لوحة الصدارة' : 'Leaderboard'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                  {isAr 
                    ? 'قارن نتائجك مع المتعلمين الآخرين'
                    : 'Compare your results with other learners'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/leaderboard')}
                  className="gap-2 w-full"
                >
                  {isAr ? 'الصدارة' : 'Leaderboard'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🔄</span>
                </div>
                <h3 className="font-bold text-lg mb-3">
                  {isAr ? 'إعادة التقييم' : 'Retake Assessment'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                  {isAr 
                    ? 'احصل على نتائج محدثة'
                    : 'Get updated results'}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/assessment/start')}
                  className="gap-2 w-full"
                >
                  {isAr ? 'إعادة' : 'Retake'}
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
            className="bg-gradient-primary shadow-glow text-lg px-12 hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/courses')}
          >
            {isAr ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
