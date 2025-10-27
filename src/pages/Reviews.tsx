import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface Review {
  id: string;
  course: string;
  provider: string;
  status: 'todo' | 'in-progress' | 'done';
  progress: number;
  lastUpdated: string;
}

export default function Reviews() {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      course: 'مقدمة في علوم البيانات',
      provider: 'Coursera',
      status: 'done',
      progress: 100,
      lastUpdated: '2024-01-20',
    },
    {
      id: '2',
      course: 'تطوير تطبيقات الويب',
      provider: 'Udemy',
      status: 'in-progress',
      progress: 65,
      lastUpdated: '2024-01-25',
    },
    {
      id: '3',
      course: 'التعلم الآلي المتقدم',
      provider: 'edX',
      status: 'todo',
      progress: 0,
      lastUpdated: '2024-01-26',
    },
    {
      id: '4',
      course: 'تصميم تجربة المستخدم',
      provider: 'Coursera',
      status: 'in-progress',
      progress: 40,
      lastUpdated: '2024-01-24',
    },
  ]);

  const getStatusIcon = (status: Review['status']) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'todo':
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusText = (status: Review['status']) => {
    switch (status) {
      case 'done':
        return 'مكتمل';
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'todo':
        return 'قادم';
    }
  };

  const filterReviews = (status?: Review['status']) => {
    return status ? reviews.filter((r) => r.status === status) : reviews;
  };

  const renderReviewCard = (review: Review) => (
    <Card key={review.id}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{review.course}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{review.provider}</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            {getStatusIcon(review.status)}
            {getStatusText(review.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">التقدم</span>
            <span className="text-sm font-medium">{review.progress}%</span>
          </div>
          <Progress value={review.progress} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">آخر تحديث</span>
          <span>{review.lastUpdated}</span>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          عرض التفاصيل
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">مراجعات الدورات</h1>
        <p className="text-muted-foreground">تتبع تقدمك في مراجعة الدورات التعليمية</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قادم</p>
                <p className="text-3xl font-bold">{filterReviews('todo').length}</p>
              </div>
              <AlertCircle className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                <p className="text-3xl font-bold">{filterReviews('in-progress').length}</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مكتمل</p>
                <p className="text-3xl font-bold">{filterReviews('done').length}</p>
              </div>
              <CheckCircle2 className="h-12 w-12 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="todo">قادم</TabsTrigger>
          <TabsTrigger value="in-progress">قيد التنفيذ</TabsTrigger>
          <TabsTrigger value="done">مكتمل</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(renderReviewCard)}
          </div>
        </TabsContent>
        <TabsContent value="todo" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterReviews('todo').map(renderReviewCard)}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterReviews('in-progress').map(renderReviewCard)}
          </div>
        </TabsContent>
        <TabsContent value="done" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterReviews('done').map(renderReviewCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
