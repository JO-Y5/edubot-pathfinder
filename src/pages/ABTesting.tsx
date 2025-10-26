import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { usePerm } from '@/hooks/usePerm';
import { Loader2, Plus, Play, Pause, CheckCircle } from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export default function ABTesting() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<ABTest[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    description: '',
    status: 'draft',
  });

  useEffect(() => {
    if (!user) return;
    loadTests();
  }, [user]);

  async function loadTests() {
    try {
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single();
      
      const isAdmin = roleData?.role === 'admin';
      if (!isAdmin) {
        toast({
          title: 'غير مصرح',
          description: 'يجب أن تكون مسؤولاً لإدارة اختبارات A/B',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('ab_tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (error) {
      console.error('Error loading tests:', error);
      toast({
        title: 'خطأ',
        description: 'فشل تحميل الاختبارات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTest() {
    try {
      const { error } = await supabase.from('ab_tests').insert({
        name: newTest.name,
        description: newTest.description,
        status: newTest.status,
        created_by: user?.id,
      });

      if (error) throw error;

      toast({
        title: 'تم الإنشاء',
        description: 'تم إنشاء الاختبار بنجاح',
      });

      setShowCreateDialog(false);
      setNewTest({ name: '', description: '', status: 'draft' });
      loadTests();
    } catch (error) {
      console.error('Error creating test:', error);
      toast({
        title: 'خطأ',
        description: 'فشل إنشاء الاختبار',
        variant: 'destructive',
      });
    }
  }

  async function handleUpdateStatus(testId: string, status: string) {
    try {
      const { error } = await supabase
        .from('ab_tests')
        .update({ status })
        .eq('id', testId);

      if (error) throw error;

      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة الاختبار',
      });

      loadTests();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'خطأ',
        description: 'فشل تحديث الحالة',
        variant: 'destructive',
      });
    }
  }

  function getStatusBadge(status: string) {
    const variants: Record<string, any> = {
      draft: { label: 'مسودة', variant: 'secondary' },
      active: { label: 'نشط', variant: 'default' },
      paused: { label: 'متوقف', variant: 'outline' },
      completed: { label: 'مكتمل', variant: 'success' },
    };

    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">اختبارات A/B</h1>
          <p className="text-muted-foreground">إدارة وتتبع اختبارات A/B</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              اختبار جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إنشاء اختبار جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل الاختبار الجديد</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم الاختبار</Label>
                <Input
                  id="name"
                  value={newTest.name}
                  onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                  placeholder="مثال: hero_button_color"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={newTest.description}
                  onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                  placeholder="وصف الاختبار..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select value={newTest.status} onValueChange={(value) => setNewTest({ ...newTest, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                إلغاء
              </Button>
              <Button onClick={handleCreateTest} disabled={!newTest.name}>
                إنشاء
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{test.name}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </div>
                {getStatusBadge(test.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {test.status === 'draft' && (
                  <Button size="sm" onClick={() => handleUpdateStatus(test.id, 'active')}>
                    <Play className="mr-2 h-4 w-4" />
                    تفعيل
                  </Button>
                )}
                {test.status === 'active' && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(test.id, 'paused')}>
                      <Pause className="mr-2 h-4 w-4" />
                      إيقاف
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(test.id, 'completed')}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      إنهاء
                    </Button>
                  </>
                )}
                {test.status === 'paused' && (
                  <Button size="sm" onClick={() => handleUpdateStatus(test.id, 'active')}>
                    <Play className="mr-2 h-4 w-4" />
                    استئناف
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {tests.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">لا توجد اختبارات بعد. ابدأ بإنشاء اختبار جديد.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
