import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'الاسم مطلوب').max(100, 'الاسم يجب أن يكون أقل من 100 حرف'),
  email: z.string().trim().email('البريد الإلكتروني غير صحيح').max(255, 'البريد الإلكتروني طويل جداً'),
  subject: z.string().trim().min(1, 'الموضوع مطلوب').max(200, 'الموضوع يجب أن يكون أقل من 200 حرف'),
  message: z.string().trim().min(1, 'الرسالة مطلوبة').max(2000, 'الرسالة يجب أن تكون أقل من 2000 حرف'),
});

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Send email via edge function
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: validatedData,
      });

      if (error) throw error;

      toast({
        title: 'تم إرسال الرسالة بنجاح',
        description: 'سنتواصل معك قريباً',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'خطأ في إرسال الرسالة',
        description: error instanceof z.ZodError ? error.errors[0].message : 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-xl text-muted-foreground">
            نحن هنا للإجابة على أسئلتك ومساعدتك
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Mail className="h-12 w-12 text-primary mb-4" />
              <CardTitle>البريد الإلكتروني</CardTitle>
              <CardDescription>
                راسلنا في أي وقت
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg" dir="ltr">Y5.company011@gmail.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle>الدعم الفني</CardTitle>
              <CardDescription>
                متاح 24/7 لمساعدتك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg">نظام التذاكر داخل المنصة</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>أرسل لنا رسالة</CardTitle>
            <CardDescription>
              املأ النموذج أدناه وسنعود إليك في أقرب وقت
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">الاسم</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">البريد الإلكتروني</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">الموضوع</label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="موضوع الرسالة"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">الرسالة</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب رسالتك هنا..."
                  rows={6}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                <Send className="ml-2 h-4 w-4" />
                إرسال الرسالة
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
