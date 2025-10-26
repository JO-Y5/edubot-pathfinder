import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Report {
  id: string;
  type: string;
  title: string;
  period_start: string;
  period_end: string;
  pdf_url?: string;
  created_at: string;
}

export default function Reports() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (user) {
      loadReports();
    }
  }, [user, filterType]);

  async function loadReports() {
    try {
      let query = supabase
        .from('reports')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (filterType !== 'all') {
        query = query.eq('type', filterType);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast({
        title: 'خطأ',
        description: 'فشل تحميل التقارير',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function generateReport(type: string) {
    setGenerating(true);
    try {
      const periodEnd = new Date();
      const periodStart = new Date();
      periodStart.setMonth(periodStart.getMonth() - 1);

      const { data, error } = await supabase.from('reports').insert({
        user_id: user?.id,
        type,
        title: `تقرير ${getReportTypeName(type)}`,
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
        data: {}, // Will be populated by edge function
      }).select().single();

      if (error) throw error;

      toast({
        title: 'تم الإنشاء',
        description: 'تم إنشاء التقرير بنجاح',
      });

      loadReports();
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: 'خطأ',
        description: 'فشل إنشاء التقرير',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  }

  function getReportTypeName(type: string) {
    const types: Record<string, string> = {
      progress: 'التقدم',
      performance: 'الأداء',
      usage: 'الاستخدام',
      financial: 'المالي',
    };
    return types[type] || type;
  }

  function handleDownload(report: Report) {
    if (report.pdf_url) {
      window.open(report.pdf_url, '_blank');
    } else {
      toast({
        title: 'غير متاح',
        description: 'ملف PDF غير متاح حالياً',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">التقارير</h1>
        <p className="text-muted-foreground">عرض وإنشاء تقارير مفصلة</p>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="نوع التقرير" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التقارير</SelectItem>
            <SelectItem value="progress">تقارير التقدم</SelectItem>
            <SelectItem value="performance">تقارير الأداء</SelectItem>
            <SelectItem value="usage">تقارير الاستخدام</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => generateReport('progress')} disabled={generating}>
          <FileText className="mr-2 h-4 w-4" />
          إنشاء تقرير جديد
        </Button>
      </div>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">لا توجد تقارير. قم بإنشاء تقرير جديد!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(report.period_start), 'dd MMM', { locale: ar })} -{' '}
                      {format(new Date(report.period_end), 'dd MMM yyyy', { locale: ar })}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(report)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تحميل
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  تم الإنشاء: {format(new Date(report.created_at), 'dd MMMM yyyy', { locale: ar })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
