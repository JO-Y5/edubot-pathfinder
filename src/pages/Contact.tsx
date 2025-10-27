import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

    // Simulate sending message
    setTimeout(() => {
      toast({
        title: 'تم إرسال الرسالة بنجاح',
        description: 'سنتواصل معك قريباً',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
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
              <p className="text-lg">support@edubot.com</p>
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
