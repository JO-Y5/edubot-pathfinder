import { useEffect } from "react";
import MentorChat from "@/components/MentorChat";
import { updatePageSEO } from "@/utils/seo";
import { useLanguage } from "@/contexts/LanguageContext";

const Mentor = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  useEffect(() => {
    updatePageSEO({
      title: isAr ? 'المرشد الذكي | EduMentor+' : 'AI Mentor | EduMentor+',
      description: isAr 
        ? 'مرشدك الأكاديمي الذكي للتخصصات والوظائف والدورات التدريبية'
        : 'Your intelligent academic mentor for majors, careers, and courses',
      keywords: isAr 
        ? ['مرشد ذكي', 'استشارات أكاديمية', 'توجيه مهني', 'ذكاء اصطناعي']
        : ['AI mentor', 'academic guidance', 'career counseling', 'artificial intelligence']
    });
  }, [isAr]);

  return (
    <div className="min-h-screen bg-background py-8">
      <MentorChat />
    </div>
  );
};

export default Mentor;
