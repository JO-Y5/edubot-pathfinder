import { useEffect } from "react";
import { CoachView } from "@/components/CoachView";
import { updatePageSEO } from "@/utils/seo";

const Coach = () => {
  useEffect(() => {
    updatePageSEO({
      title: 'لوحة المدرب | EduMentor+',
      description: 'متابعة تقدم الطلاب وإدارة نتائج التقييمات والدورات التدريبية',
      keywords: ['لوحة مدرب', 'إدارة طلاب', 'متابعة تقدم', 'نتائج تقييمات']
    });
  }, []);

  return <CoachView />;
};

export default Coach;
