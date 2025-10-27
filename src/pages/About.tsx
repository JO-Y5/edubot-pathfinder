import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">عن EduBot Pathfinder</h1>
          <p className="text-xl text-muted-foreground">
            منصة ذكية لتوجيه المسار التعليمي باستخدام الذكاء الاصطناعي
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle>رؤيتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                نسعى لتمكين كل متعلم من اكتشاف مساره التعليمي المثالي من خلال توصيات مخصصة
                تعتمد على الذكاء الاصطناعي وتحليل البيانات المتقدم.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>مهمتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                تقديم تجربة تعليمية شخصية تساعد المتعلمين على اتخاذ قرارات مستنيرة حول
                مسارهم التعليمي والمهني بناءً على مهاراتهم واهتماماتهم.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>لمن نخدم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                نخدم الطلاب والباحثين عن عمل والمهنيين الراغبين في تطوير مهاراتهم،
                بالإضافة إلى المؤسسات التعليمية والشركات التي تسعى لتطوير موظفيها.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-12 w-12 text-primary mb-4" />
              <CardTitle>قيمنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                نؤمن بالتعلم المستمر، الشفافية في التوصيات، الابتكار في التكنولوجيا،
                والتركيز على احتياجات المتعلم الفردية.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-primary text-white">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">انضم إلى مجتمعنا</h2>
            <p className="text-lg mb-6 opacity-90">
              ابدأ رحلتك التعليمية اليوم واكتشف المسار المثالي لك
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
