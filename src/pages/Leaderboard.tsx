import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Award, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardEntry {
  user_id: string;
  total_points: number;
  level: number;
  streak_days: number;
  profiles?: {
    full_name: string;
  };
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [topByPoints, setTopByPoints] = useState<LeaderboardEntry[]>([]);
  const [topByLevel, setTopByLevel] = useState<LeaderboardEntry[]>([]);
  const [topByStreak, setTopByStreak] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  async function loadLeaderboards() {
    try {
      // Top by points
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select(`
          user_id,
          total_points,
          level,
          streak_days
        `)
        .order('total_points', { ascending: false })
        .limit(10);

      if (pointsError) throw pointsError;

      // Get profiles separately
      const userIds = pointsData?.map(p => p.user_id) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, full_name')
        .in('user_id', userIds);

      const profilesMap = new Map(profilesData?.map(p => [p.user_id, p.full_name]));

      // Top by level
      const { data: levelData, error: levelError } = await supabase
        .from('user_points')
        .select(`
          user_id,
          total_points,
          level,
          streak_days
        `)
        .order('level', { ascending: false })
        .limit(10);

      if (levelError) throw levelError;

      // Top by streak
      const { data: streakData, error: streakError } = await supabase
        .from('user_points')
        .select(`
          user_id,
          total_points,
          level,
          streak_days
        `)
        .order('streak_days', { ascending: false })
        .limit(10);

      if (streakError) throw streakError;

      // Merge profiles data
      const mergeProfiles = (data: any[]) => 
        data?.map(entry => ({
          ...entry,
          profiles: { full_name: profilesMap.get(entry.user_id) || 'مستخدم' }
        })) || [];

      setTopByPoints(mergeProfiles(pointsData));
      setTopByLevel(mergeProfiles(levelData));
      setTopByStreak(mergeProfiles(streakData));
    } catch (error) {
      console.error('Error loading leaderboards:', error);
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

  function renderLeaderboard(data: LeaderboardEntry[], type: 'points' | 'level' | 'streak') {
    return (
      <div className="space-y-2">
        {data.map((entry, index) => {
          const isCurrentUser = entry.user_id === user?.id;
          const profileData = Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles;
          const userName = profileData?.full_name || 'مستخدم';

          return (
            <Card key={entry.user_id} className={isCurrentUser ? 'border-primary' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold w-12 text-center">
                    {getMedalIcon(index + 1)}
                  </div>
                  
                  <Avatar>
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <p className="font-semibold">
                      {userName}
                      {isCurrentUser && (
                        <Badge variant="outline" className="mr-2">أنت</Badge>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      المستوى {entry.level}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    {type === 'points' && (
                      <div>
                        <p className="text-2xl font-bold">{entry.total_points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">نقطة</p>
                      </div>
                    )}
                    {type === 'level' && (
                      <div>
                        <p className="text-2xl font-bold">{entry.level}</p>
                        <p className="text-sm text-muted-foreground">مستوى</p>
                      </div>
                    )}
                    {type === 'streak' && (
                      <div>
                        <p className="text-2xl font-bold">{entry.streak_days}</p>
                        <p className="text-sm text-muted-foreground">يوم متتالي</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">لوحة الصدارة</h1>
        <p className="text-muted-foreground">تنافس مع أفضل المتعلمين</p>
      </div>

      <Tabs defaultValue="points" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="points" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            النقاط
          </TabsTrigger>
          <TabsTrigger value="level" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            المستوى
          </TabsTrigger>
          <TabsTrigger value="streak" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            الاستمرارية
          </TabsTrigger>
        </TabsList>

        <TabsContent value="points">
          {renderLeaderboard(topByPoints, 'points')}
        </TabsContent>

        <TabsContent value="level">
          {renderLeaderboard(topByLevel, 'level')}
        </TabsContent>

        <TabsContent value="streak">
          {renderLeaderboard(topByStreak, 'streak')}
        </TabsContent>
      </Tabs>
    </div>
  );
}
