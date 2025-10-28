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
          // Extract data from the complete response structure
          const answersData = data.answers as any;
          setAssessmentData({
            riasec: answersData.riasec || {},
            tracks: answersData.tracks || {},
            confidence: answersData.confidence || 0,
            recommendations: answersData.recommendations || []
          });
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

  const { riasec = {}, tracks = {}, confidence = 0 } = assessmentData;

  // Sort RIASEC - with safety checks
  const sortedRiasec = Object.entries(riasec || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3);

  // Sort tracks - with safety checks
  const sortedTracks = Object.entries(tracks || {})
    .sort(([, a], [, b]) => (b as number) - (a as number));

  const topTrack = sortedTracks[0] || ['ai', 0.5];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              {isAr ? '✨ نتائج التقييم جاهزة!' : '✨ Your Results Are Ready!'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {isAr ? 'نتائج تقييمك الشخصي' : 'Your Personalized Results'}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6">
            {isAr 
              ? 'تم تحليل إجاباتك بدقة باستخدام نموذج RIASEC العلمي'
              : 'Your answers were analyzed using the scientific RIASEC model'}
          </p>

          <div className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {isAr ? 'دقة التقييم:' : 'Confidence Score:'}{' '}
              <span className="text-primary font-bold text-base">{Math.round(confidence * 100)}%</span>
            </span>
          </div>
        </div>

        {/* Top Recommendation */}
        <Card className="mb-8 overflow-hidden border-2 border-transparent bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 p-[2px] animate-slide-up">
          <div className="bg-card rounded-lg">
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                <div className="text-7xl md:text-8xl">{TRACK_INFO[topTrack[0]]?.icon || '🎯'}</div>
                <div className="flex-1 text-center md:text-right">
                  <Badge className="mb-4 text-sm px-4 py-1.5">
                    {isAr ? 'المسار الأنسب لك' : 'Best Match For You'}
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                    {isAr ? TRACK_INFO[topTrack[0]]?.ar : TRACK_INFO[topTrack[0]]?.en}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-base md:text-lg">
                    {isAr ? TRACK_INFO[topTrack[0]]?.desc_ar : TRACK_INFO[topTrack[0]]?.desc_en}
                  </p>
                  <div className="space-y-2">
                    <Progress value={topTrack[1] * 100} className="h-4" />
                    <p className="text-sm text-muted-foreground text-right">
                      {isAr ? 'نسبة التطابق:' : 'Match Score:'}{' '}
                      <span className="font-bold text-primary text-base">{Math.round(topTrack[1] * 100)}%</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* RIASEC Profile */}
          <Card className="border-2 border-transparent bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-[2px] animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card rounded-lg h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-right">
                  <Brain className="w-5 h-5 text-primary ml-auto" />
                  <span>{isAr ? 'ملفك الشخصي (RIASEC)' : 'Your Personality Profile (RIASEC)'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {sortedRiasec.map(([code, score]) => (
                  <div key={code} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        {Math.round(score * 100)}%
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">
                          {isAr ? RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.ar : RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.en}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.color}`} />
                      </div>
                    </div>
                    <Progress value={score * 100} className="h-2.5" />
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>

          {/* All Tracks */}
          <Card className="border-2 border-transparent bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-[2px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-card rounded-lg h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-right">
                  <Target className="w-5 h-5 text-primary ml-auto" />
                  <span>{isAr ? 'جميع المسارات المقترحة' : 'All Recommended Tracks'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {sortedTracks.map(([trackId, score]) => (
                  <div key={trackId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        {Math.round(score * 100)}%
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-foreground">
                          {isAr ? TRACK_INFO[trackId]?.ar : TRACK_INFO[trackId]?.en}
                        </span>
                        <span className="text-2xl">{TRACK_INFO[trackId]?.icon}</span>
                      </div>
                    </div>
                    <Progress value={score * 100} className="h-2.5" />
                  </div>
                ))}
              </CardContent>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button
            size="lg"
            onClick={() => navigate('/courses')}
            className="text-base px-10"
          >
            {isAr ? 'ابدأ رحلتك الآن 🚀' : 'Start Your Journey Now 🚀'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
