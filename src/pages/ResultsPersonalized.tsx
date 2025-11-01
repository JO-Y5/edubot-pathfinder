import { useEffect } from 'react';
import { useRecs } from '@/hooks/useRecs';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SectionProps {
  title: string;
  items: any[];
  loading: boolean;
  icon: React.ReactNode;
  error?: string | null;
}

function Section({ title, items, loading, icon, error }: SectionProps) {
  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!items || items.length === 0) {
    return (
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">لا توجد توصيات متاحة حالياً. يرجى إكمال التقييم أولاً.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item: any) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                {typeof item.sim !== 'undefined' && (
                  <Badge variant="secondary">
                    {Math.round(item.sim * 100)}% مطابقة
                  </Badge>
                )}
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function ResultsPersonalized() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const majors = useRecs('major', 10);
  const careers = useRecs('career', 10);
  const courses = useRecs('course', 10);

  useEffect(() => {
    const title = language === 'ar' ? 'نتائجك الشخصية | EduBot' : 'Your Personalized Results | EduBot';
    const description = language === 'ar' 
      ? 'توصيات شخصية مدعومة بالذكاء الاصطناعي بناءً على ملفك الشخصي وإجاباتك'
      : 'AI-powered personalized recommendations based on your profile and answers';
    
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [language]);

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-5xl">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              {language === 'ar' 
                ? 'يرجى تسجيل الدخول لعرض التوصيات الشخصية'
                : 'Please sign in to view personalized recommendations'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">
          {language === 'ar' ? 'توصياتك الشخصية' : 'Your Personalized Recommendations'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {language === 'ar'
            ? 'إرشادات مدعومة بالذكاء الاصطناعي بناءً على ملفك الشخصي وإجاباتك وسلوكك'
            : 'AI-powered guidance based on your profile, answers and behavior'}
        </p>
      </div>

      <Section
        title={language === 'ar' ? 'أفضل التخصصات لك' : 'Top Majors for You'}
        items={majors.data}
        loading={majors.loading}
        error={majors.error}
        icon={<GraduationCap className="w-6 h-6 text-primary" />}
      />

      <Section
        title={language === 'ar' ? 'المسارات المهنية المقترحة' : 'Suggested Careers'}
        items={careers.data}
        loading={careers.loading}
        error={careers.error}
        icon={<Briefcase className="w-6 h-6 text-primary" />}
      />

      <Section
        title={language === 'ar' ? 'الدورات للبدء الآن' : 'Courses to Start Now'}
        items={courses.data}
        loading={courses.loading}
        error={courses.error}
        icon={<BookOpen className="w-6 h-6 text-primary" />}
      />
    </div>
  );
}
