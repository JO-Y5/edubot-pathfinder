import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Sparkles, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface AssessmentResult {
  id: string;
  user_id: string;
  track_id: string;
  score: number;
  answers: any; // JSONB field from database
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

// Track information
const TRACK_INFO: Record<string, { ar: string; en: string; icon: string }> = {
  ai: { ar: 'الذكاء الاصطناعي', en: 'AI & Machine Learning', icon: '🤖' },
  web: { ar: 'تطوير الويب', en: 'Web Development', icon: '💻' },
  cyber: { ar: 'الأمن السيبراني', en: 'Cybersecurity', icon: '🔒' },
  design: { ar: 'تصميم UX/UI', en: 'UX/UI Design', icon: '🎨' },
  business: { ar: 'إدارة الأعمال', en: 'Tech Business Management', icon: '📊' }
};

// RIASEC info
const RIASEC_INFO = {
  R: { ar: 'واقعي - عملي', en: 'Realistic', color: 'bg-blue-500' },
  I: { ar: 'استقصائي - بحثي', en: 'Investigative', color: 'bg-purple-500' },
  A: { ar: 'فني - إبداعي', en: 'Artistic', color: 'bg-pink-500' },
  S: { ar: 'اجتماعي - خدمي', en: 'Social', color: 'bg-green-500' },
  E: { ar: 'مقاول - قيادي', en: 'Enterprising', color: 'bg-orange-500' },
  C: { ar: 'تقليدي - منظم', en: 'Conventional', color: 'bg-cyan-500' }
};

export default function Leaderboard() {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessmentResults();
  }, []);

  async function loadAssessmentResults() {
    try {
      // Get latest assessment result for each user
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get unique users (latest result only)
      const uniqueResults = new Map<string, AssessmentResult>();
      data?.forEach((result) => {
        if (!uniqueResults.has(result.user_id)) {
          uniqueResults.set(result.user_id, result);
        }
      });

      const resultsArray = Array.from(uniqueResults.values());

      // Get profiles
      const userIds = resultsArray.map(r => r.user_id);
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, full_name')
        .in('user_id', userIds);

      const profilesMap = new Map(profilesData?.map(p => [p.user_id, p.full_name]));

      const resultsWithProfiles = resultsArray.map(result => ({
        ...result,
        profiles: { full_name: profilesMap.get(result.user_id) || 'مستخدم' }
      })) as AssessmentResult[];

      // Sort by confidence score from answers
      resultsWithProfiles.sort((a, b) => {
        const aConf = (a.answers?.confidence || 0) as number;
        const bConf = (b.answers?.confidence || 0) as number;
        return bConf - aConf;
      });

      setResults(resultsWithProfiles.slice(0, 20));
    } catch (error) {
      console.error('Error loading assessment results:', error);
    } finally {
      setLoading(false);
    }
  }

  function getMedalIcon(rank: number) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  }

  function getTopTrack(result: AssessmentResult) {
    const tracks = result.answers?.track_scores || {};
    const entries = Object.entries(tracks);
    if (entries.length === 0) return null;
    return entries.sort(([, a], [, b]) => (b as number) - (a as number))[0];
  }

  function getTopRiasec(result: AssessmentResult) {
    const riasec = result.answers?.riasec_scores || {};
    const entries = Object.entries(riasec);
    if (entries.length === 0) return [];
    return entries.sort(([, a], [, b]) => (b as number) - (a as number)).slice(0, 3);
  }

  function getConfidence(result: AssessmentResult): number {
    return (result.answers?.confidence || 0) as number;
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">{isAr ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium gradient-text">
              {isAr ? 'لوحة المتصدرين' : 'Leaderboard'}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 gradient-text">
            {isAr ? 'نتائج التقييمات المهنية' : 'Career Assessment Results'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isAr 
              ? 'شاهد نتائج التقييمات للمتعلمين وتعرف على توجهاتهم المهنية'
              : 'View assessment results and career orientations of learners'}
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <Card className="glass border-border">
              <CardContent className="p-12 text-center">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  {isAr ? 'لا توجد نتائج متاحة حالياً' : 'No results available yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            results.map((result, index) => {
              const isCurrentUser = result.user_id === user?.id;
              const userName = result.profiles?.full_name || (isAr ? 'مستخدم' : 'User');
              const topTrack = getTopTrack(result);
              const topRiasec = getTopRiasec(result);
              const confidence = getConfidence(result);

              return (
                <Card 
                  key={result.id} 
                  className={`overflow-hidden animate-slide-up glass border-border hover:border-primary/50 transition-all ${
                    isCurrentUser ? 'border-primary shadow-glow' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {index < 3 && <div className="h-2 bg-gradient-primary" />}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Rank */}
                      <div className="text-center min-w-[60px]">
                        <div className="text-3xl font-bold mb-1">
                          {getMedalIcon(index + 1)}
                        </div>
                        {index < 3 && (
                          <Badge variant="outline" className="text-xs">
                            {isAr ? 'متميز' : 'Top'}
                          </Badge>
                        )}
                      </div>

                      {/* User Info */}
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-xl font-bold">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        {/* Name and Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-bold text-lg truncate">{userName}</h3>
                          {isCurrentUser && (
                            <Badge className="bg-gradient-primary">
                              {isAr ? 'أنت' : 'You'}
                            </Badge>
                          )}
                        </div>

                        {/* Top Track */}
                        {topTrack && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{TRACK_INFO[topTrack[0]]?.icon || '🎯'}</span>
                              <span className="font-semibold">
                                {isAr ? TRACK_INFO[topTrack[0]]?.ar : TRACK_INFO[topTrack[0]]?.en}
                              </span>
                              <Badge variant="outline" className="mr-auto">
                                {Math.round((topTrack[1] as number) * 100)}%
                              </Badge>
                            </div>
                            <Progress value={(topTrack[1] as number) * 100} className="h-2" />
                          </div>
                        )}

                        {/* RIASEC Profile */}
                        <div className="flex flex-wrap gap-2">
                          {topRiasec.map(([code, score]) => (
                            <div 
                              key={code}
                              className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 rounded-full border border-border"
                            >
                              <div className={`w-2 h-2 rounded-full ${RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.color}`} />
                              <span className="text-xs font-medium">
                                {isAr 
                                  ? RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.ar?.split(' - ')[0]
                                  : RIASEC_INFO[code as keyof typeof RIASEC_INFO]?.en}
                              </span>
                              <span className="text-xs text-primary font-bold">
                                {Math.round((score as number) * 100)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Confidence Score */}
                      <div className="text-center min-w-[80px]">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {Math.round(confidence * 100)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {isAr ? 'دقة التقييم' : 'Confidence'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
