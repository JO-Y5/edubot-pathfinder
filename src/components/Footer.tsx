import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">EduBot Pathfinder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              منصة ذكية لتوجيه المسار التعليمي باستخدام الذكاء الاصطناعي
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">الروابط السريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  عن المنصة
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">
                  الدورات
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-sm text-muted-foreground hover:text-primary">
                  التقييم
                </Link>
              </li>
              <li>
                <Link to="/billing" className="text-sm text-muted-foreground hover:text-primary">
                  الاشتراكات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">الدعم</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  مركز المساعدة
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">قانوني</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  سياسة الكوكيز
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EduBot Pathfinder. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
