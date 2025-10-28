import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRACKS } from "@/data/tracks";
import { TRAINING_CENTERS } from "@/data/trainingCenters";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookOpen, Clock, CheckCircle2, Star, ExternalLink, GraduationCap, TrendingUp } from "lucide-react";

interface Results {
  primaryTrack: string;
  completedCourses: string[];
}

const NewCourses = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get assessment results from database
        const { data: assessmentData, error: assessmentError } = await supabase
          .from('assessment_results')
          .select('track_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (assessmentError) throw assessmentError;

        if (!assessmentData) {
          setLoading(false);
          return;
        }

        // Get completed courses from course_progress
        const { data: progressData, error: progressError } = await supabase
          .from('course_progress')
          .select('course_id')
          .eq('user_id', user.id)
          .eq('completed', true);

        if (progressError) throw progressError;

        const completedCourses = progressData?.map(p => p.course_id) || [];

        setResults({
          primaryTrack: assessmentData.track_id,
          completedCourses
        });
      } catch (error) {
        console.error('Error fetching results:', error);
        toast.error(language === "ar" ? "خطأ في تحميل النتائج" : "Error loading results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user, language]);

  const handleToggleCourse = async (courseId: string) => {
    if (!results || !user) return;

    const isCompleted = results.completedCourses.includes(courseId);
    const newCompletedStatus = !isCompleted;

    try {
      // Check if course progress exists
      const { data: existingProgress } = await supabase
        .from('course_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();

      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('course_progress')
          .update({ 
            completed: newCompletedStatus,
            completed_at: newCompletedStatus ? new Date().toISOString() : null,
            progress: newCompletedStatus ? 100 : 0
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        // Create new progress record
        const { error } = await supabase
          .from('course_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            completed: newCompletedStatus,
            completed_at: newCompletedStatus ? new Date().toISOString() : null,
            progress: newCompletedStatus ? 100 : 0
          });

        if (error) throw error;
      }

      // Update local state
      const updated = { ...results };
      if (newCompletedStatus) {
        updated.completedCourses.push(courseId);
        toast.success(language === "ar" ? "دورة مكتملة! استمر في العمل الرائع! 🎉" : "Course completed! Keep up the great work! 🎉");
      } else {
        updated.completedCourses = updated.completedCourses.filter((id) => id !== courseId);
        toast.info(language === "ar" ? "تم وضع علامة على الدورة كغير مكتملة" : "Course marked as incomplete");
      }
      setResults(updated);
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(language === "ar" ? "خطأ في تحديث الدورة" : "Error updating course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="p-12 text-center glass max-w-md">
          <div className="animate-pulse">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-muted-foreground">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="p-12 text-center glass max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            {language === "ar" ? "لا توجد نتائج تقييم" : "No Assessment Results"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === "ar" 
              ? "خذ التقييم أولاً لرؤية دوراتك المخصصة" 
              : "Take the assessment first to see your personalized courses"}
          </p>
          <Button
            onClick={() => navigate("/assessment")}
            className="bg-gradient-primary shadow-glow"
          >
            {language === "ar" ? "ابدأ التقييم" : "Start Assessment"}
          </Button>
        </Card>
      </div>
    );
  }

  const track = TRACKS[results.primaryTrack];
  const completedCount = results.completedCourses.length;
  const totalCount = track.courses.length;
  const progress = (completedCount / totalCount) * 100;

  // Filter training centers by track category
  const relevantCenters = TRAINING_CENTERS.filter(center => 
    center.category.some(cat => 
      cat.toLowerCase().includes(track.name.toLowerCase().split(" ")[0]) ||
      track.name.toLowerCase().includes(cat.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{track.icon}</span>
            <div>
              <h1 className="text-4xl font-bold">{track.name}</h1>
              <p className="text-muted-foreground">
                {language === "ar" ? "مسار التعلم" : "Learning Path"}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="w-4 h-4" />
              {language === "ar" ? "الدورات التدريبية" : "Your Courses"}
            </TabsTrigger>
            <TabsTrigger value="centers" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              {language === "ar" ? "مراكز التدريب" : "Training Centers"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {/* Progress Card */}
            <Card className="p-6 glass border-border animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {language === "ar" ? "تقدمك" : "Your Progress"}
                  </p>
                  <p className="text-3xl font-bold text-primary">{Math.round(progress)}%</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-semibold">
                      {completedCount} / {totalCount} {language === "ar" ? "مكتملة" : "Completed"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </Card>

            {/* Course List */}
            <div className="space-y-6">
              {track.courses.map((course, index) => {
                const isCompleted = results.completedCourses.includes(course.id);
                return (
                  <Card
                    key={course.id}
                    className={`p-6 glass border-border animate-slide-up transition-all hover:shadow-glow ${
                      isCompleted ? "border-success/30" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => handleToggleCourse(course.id)}
                          className="w-6 h-6 border-2"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3
                              className={`text-xl font-semibold mb-2 ${
                                isCompleted ? "text-muted-foreground line-through" : ""
                              }`}
                            >
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{language === "ar" ? "دورة" : "Course"} {index + 1}</span>
                              </div>
                            </div>
                          </div>
                          {isCompleted && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                              <CheckCircle2 className="w-4 h-4" />
                              {language === "ar" ? "مكتملة" : "Completed"}
                            </div>
                          )}
                        </div>

                        <p className="text-muted-foreground mb-4">{course.description}</p>

                        {!isCompleted && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary/30 hover:bg-primary/10"
                            onClick={() => handleToggleCourse(course.id)}
                          >
                            {language === "ar" ? "وضع علامة كمكتملة" : "Mark as Complete"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Completion Message */}
            {progress === 100 && (
              <Card className="p-8 text-center glass border-primary/30 animate-fade-in">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold mb-2">
                  {language === "ar" ? "تهانينا!" : "Congratulations!"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === "ar" 
                    ? `لقد أكملت جميع الدورات في مسار ${track.name}!`
                    : `You've completed all courses in the ${track.name} track!`}
                </p>
                <Button
                  onClick={() => navigate("/achievements")}
                  className="bg-gradient-primary shadow-glow"
                >
                  {language === "ar" ? "عرض إنجازاتك" : "View Your Achievements"}
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="centers" className="space-y-6">
            <Card className="p-6 glass border-border">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "ar" ? "مراكز التدريب الموصى بها" : "Recommended Training Centers"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" 
                      ? `أفضل المنصات لتعلم ${track.name}`
                      : `Top platforms to learn ${track.name}`}
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {relevantCenters.map((center, index) => (
                <Card
                  key={center.id}
                  className="p-6 glass border-border hover:shadow-glow transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{center.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">
                        {language === "ar" ? center.nameAr : center.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-medium">{center.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {center.courses.toLocaleString()} {language === "ar" ? "دورة" : "courses"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {language === "ar" ? center.descriptionAr : center.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(language === "ar" ? center.featuresAr : center.features).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 hover:bg-primary/10"
                    onClick={() => window.open(center.website, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {language === "ar" ? "زيارة الموقع" : "Visit Website"}
                  </Button>
                </Card>
              ))}
            </div>

            {relevantCenters.length === 0 && (
              <Card className="p-8 text-center glass">
                <p className="text-muted-foreground">
                  {language === "ar" 
                    ? "لا توجد مراكز تدريب متاحة لهذا المسار حالياً"
                    : "No training centers available for this track yet"}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NewCourses;
