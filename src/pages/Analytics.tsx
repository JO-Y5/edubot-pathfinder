import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { usePerm } from '@/hooks/usePerm';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export default function Analytics() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [eventStats, setEventStats] = useState<any[]>([]);
  const [dailyStats, setDailyStats] = useState<any[]>([]);
  const [topEvents, setTopEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    async function loadAnalytics() {
      try {
        // Check if user is admin
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user?.id)
          .single();
        
        const isAdmin = roleData?.role === 'admin';
        if (!isAdmin) {
          toast({
            title: 'غير مصرح',
            description: 'يجب أن تكون مسؤولاً لعرض التحليلات',
            variant: 'destructive',
          });
          return;
        }

        // Get event statistics
        const { data: events, error: eventsError } = await supabase
          .from('analytics_events')
          .select('event_name, created_at')
          .order('created_at', { ascending: false })
          .limit(1000);

        if (eventsError) throw eventsError;

        // Process events for charts
        const eventCounts: Record<string, number> = {};
        const dailyCounts: Record<string, number> = {};
        
        events?.forEach(event => {
          // Count by event name
          eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1;
          
          // Count by day
          const date = new Date(event.created_at).toLocaleDateString('ar-EG');
          dailyCounts[date] = (dailyCounts[date] || 0) + 1;
        });

        // Top events
        const topEventsData = Object.entries(eventCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        setTopEvents(topEventsData);

        // Daily stats
        const dailyStatsData = Object.entries(dailyCounts)
          .map(([date, count]) => ({ date, count }))
          .slice(-30);

        setDailyStats(dailyStatsData);

        // Event distribution
        const eventStatsData = topEventsData.slice(0, 5);
        setEventStats(eventStatsData);

      } catch (error) {
        console.error('Error loading analytics:', error);
        toast({
          title: 'خطأ',
          description: 'فشل تحميل بيانات التحليلات',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">لوحة التحليلات</h1>
        <p className="text-muted-foreground">تتبع أداء التطبيق وسلوك المستخدمين</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="events">الأحداث</TabsTrigger>
          <TabsTrigger value="users">المستخدمون</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>الأحداث اليومية</CardTitle>
                <CardDescription>عدد الأحداث في آخر 30 يوم</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" name="الأحداث" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الأحداث</CardTitle>
                <CardDescription>أكثر 5 أحداث تكراراً</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={eventStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={80}
                      fill="hsl(var(--primary))"
                      dataKey="count"
                    >
                      {eventStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>أكثر الأحداث</CardTitle>
              <CardDescription>الأحداث الأكثر تكراراً في التطبيق</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topEvents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name="العدد" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات المستخدمين</CardTitle>
              <CardDescription>قريباً...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">سيتم إضافة المزيد من التحليلات قريباً</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
