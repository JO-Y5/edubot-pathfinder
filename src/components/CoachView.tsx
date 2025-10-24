import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, TrendingUp, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentProgress {
  user_id: string;
  full_name: string;
  email: string;
  track_id: string;
  score: number;
  completed_courses: number;
  total_courses: number;
  last_activity: string;
}

export const CoachView = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentProgress();
  }, [user]);

  const loadStudentProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Check if user has coach/admin role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .in('role', ['admin', 'moderator']);

      if (!roleData || roleData.length === 0) {
        toast({
          title: "غير مصرح",
          description: "ليس لديك صلاحيات للوصول لهذه الصفحة",
          variant: "destructive"
        });
        return;
      }

      // Fetch student progress (for demo, showing all users)
      const { data: assessments } = await supabase
        .from('assessment_results')
        .select(`
          user_id,
          track_id,
          score,
          created_at
        `)
        .order('created_at', { ascending: false });

      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, email');

      const { data: progress } = await supabase
        .from('course_progress')
        .select('user_id, completed');

      // Combine data
      const studentMap = new Map<string, StudentProgress>();

      assessments?.forEach(assessment => {
        const profile = profiles?.find(p => p.user_id === assessment.user_id);
        const userProgress = progress?.filter(p => p.user_id === assessment.user_id) || [];
        const completedCount = userProgress.filter(p => p.completed).length;

        if (profile) {
          studentMap.set(assessment.user_id, {
            user_id: assessment.user_id,
            full_name: profile.full_name || 'غير معروف',
            email: profile.email || '',
            track_id: assessment.track_id,
            score: assessment.score,
            completed_courses: completedCount,
            total_courses: 10, // Mock value
            last_activity: assessment.created_at
          });
        }
      });

      setStudents(Array.from(studentMap.values()));
    } catch (error) {
      console.error('Error loading student progress:', error);
      toast({
        title: "خطأ",
        description: "فشل تحميل بيانات الطلاب",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTrackName = (trackId: string) => {
    const tracks: Record<string, string> = {
      ai: 'الذكاء الاصطناعي',
      web: 'تطوير الويب',
      cyber: 'الأمن السيبراني',
      design: 'التصميم',
      business: 'إدارة الأعمال'
    };
    return tracks[trackId] || trackId;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <GraduationCap className="w-8 h-8" />
          لوحة المدرب
        </h1>
        <p className="text-muted-foreground">
          متابعة تقدم الطلاب ونتائج التقييمات
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <Users className="w-4 h-4 mr-2" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="progress">
            <TrendingUp className="w-4 h-4 mr-2" />
            التقدم
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">إجمالي الطلاب</div>
              <div className="text-2xl font-bold">{students.length}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">معدل الإكمال</div>
              <div className="text-2xl font-bold">
                {students.length > 0 
                  ? Math.round(students.reduce((acc, s) => acc + (s.completed_courses / s.total_courses), 0) / students.length * 100)
                  : 0}%
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">المسار الأكثر شعبية</div>
              <div className="text-lg font-bold">
                {students.length > 0 ? getTrackName(students[0].track_id) : '-'}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-4">
            {students.map(student => (
              <Card key={student.user_id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{student.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <Badge variant="secondary">
                    {getTrackName(student.track_id)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">درجة التقييم:</span>
                    <span className="font-semibold mr-2">{Math.round(student.score)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الدورات المكتملة:</span>
                    <span className="font-semibold mr-2">
                      {student.completed_courses} / {student.total_courses}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                  آخر نشاط: {new Date(student.last_activity).toLocaleDateString('ar-SA')}
                </div>
              </Card>
            ))}

            {students.length === 0 && (
              <Card className="p-8 text-center text-muted-foreground">
                لا يوجد طلاب حالياً
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
