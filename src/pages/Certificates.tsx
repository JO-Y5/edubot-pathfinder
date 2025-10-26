import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Certificate {
  id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  pdf_url?: string;
  metadata: any;
}

export default function Certificates() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCertificates();
    }
  }, [user]);

  async function loadCertificates() {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user?.id)
        .order('issued_at', { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error('Error loading certificates:', error);
      toast({
        title: 'خطأ',
        description: 'فشل تحميل الشهادات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(certificate: Certificate) {
    if (certificate.pdf_url) {
      window.open(certificate.pdf_url, '_blank');
    } else {
      toast({
        title: 'غير متاح',
        description: 'ملف PDF غير متاح حالياً',
        variant: 'destructive',
      });
    }
  }

  async function handleShare(certificate: Certificate) {
    const url = `${window.location.origin}/verify-certificate/${certificate.certificate_number}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'شهادتي',
          text: `شاهد شهادتي في ${certificate.metadata?.course_title || certificate.course_id}`,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      toast({
        title: 'تم النسخ',
        description: 'تم نسخ رابط الشهادة',
      });
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">شهاداتي</h1>
        <p className="text-muted-foreground">عرض وتحميل شهاداتك المكتسبة</p>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              لم تحصل على أي شهادات بعد. أكمل دورة للحصول على شهادتك الأولى!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <div className="h-32 bg-gradient-primary flex items-center justify-center">
                <Award className="h-16 w-16 text-white" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
                  {cert.metadata?.course_title || cert.course_id}
                </CardTitle>
                <CardDescription>
                  رقم الشهادة: {cert.certificate_number}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  تاريخ الإصدار:{' '}
                  {format(new Date(cert.issued_at), 'dd MMMM yyyy', { locale: ar })}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(cert)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تحميل
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleShare(cert)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    مشاركة
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
