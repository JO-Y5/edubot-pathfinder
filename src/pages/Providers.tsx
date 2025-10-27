import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Providers() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    description: '',
    apiKey: '',
  });

  const providers = [
    {
      name: 'Udemy',
      description: 'منصة تعليمية عالمية مع آلاف الدورات',
      website: 'https://www.udemy.com',
      status: 'متصل',
    },
    {
      name: 'Coursera',
      description: 'دورات من أفضل الجامعات والمؤسسات',
      website: 'https://www.coursera.org',
      status: 'متصل',
    },
    {
      name: 'edX',
      description: 'تعليم عالي الجودة من جامعات مرموقة',
      website: 'https://www.edx.org',
      status: 'معلق',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'تم إضافة المزود بنجاح',
      description: 'سيتم مراجعة الطلب قريباً',
    });
    setFormData({ name: '', website: '', description: '', apiKey: '' });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">مزودو المحتوى</h1>
        <p className="text-muted-foreground">إدارة التكامل مع منصات التعليم الخارجية</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {providers.map((provider) => (
          <Card key={provider.name}>
            <CardHeader>
              <CardTitle>{provider.name}</CardTitle>
              <CardDescription>{provider.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">الحالة:</span>
                <span
                  className={`text-sm font-medium ${
                    provider.status === 'متصل' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  {provider.status}
                </span>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={provider.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="ml-2 h-4 w-4" />
                  زيارة الموقع
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إضافة مزود جديد</CardTitle>
          <CardDescription>
            اقترح منصة تعليمية جديدة للتكامل معها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">اسم المزود</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: LinkedIn Learning"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">رابط الموقع</label>
              <Input
                required
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">الوصف</label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف موجز عن المنصة"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">API Key (اختياري)</label>
              <Input
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="إذا كان لديك API key"
              />
            </div>
            <Button type="submit" className="w-full">
              <Upload className="ml-2 h-4 w-4" />
              إضافة المزود
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
