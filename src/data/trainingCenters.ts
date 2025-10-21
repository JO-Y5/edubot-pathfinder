export interface TrainingCenter {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  logo: string;
  website: string;
  courses: number;
  rating: number;
  category: string[];
  features: string[];
  featuresAr: string[];
}

export const TRAINING_CENTERS: TrainingCenter[] = [
  {
    id: "coursera",
    name: "Coursera",
    nameAr: "كورسيرا",
    description: "Learn from top universities and companies worldwide",
    descriptionAr: "تعلم من أفضل الجامعات والشركات حول العالم",
    logo: "🎓",
    website: "https://www.coursera.org",
    courses: 5000,
    rating: 4.8,
    category: ["AI", "Web", "Business", "Data Science"],
    features: ["University Certificates", "Flexible Schedule", "Career Support"],
    featuresAr: ["شهادات جامعية", "جدول مرن", "دعم مهني"]
  },
  {
    id: "udemy",
    name: "Udemy",
    nameAr: "يوديمي",
    description: "Learn on your schedule with lifetime access",
    descriptionAr: "تعلم وفق جدولك مع وصول مدى الحياة",
    logo: "📚",
    website: "https://www.udemy.com",
    courses: 210000,
    rating: 4.5,
    category: ["AI", "Web", "Design", "Business", "Cyber"],
    features: ["Lifetime Access", "30-Day Money Back", "Mobile Learning"],
    featuresAr: ["وصول مدى الحياة", "استرجاع خلال 30 يوم", "تعلم عبر الموبايل"]
  },
  {
    id: "edx",
    name: "edX",
    nameAr: "إيدكس",
    description: "High-quality courses from Harvard, MIT and more",
    descriptionAr: "دورات عالية الجودة من هارفارد وMIT وغيرها",
    logo: "🎯",
    website: "https://www.edx.org",
    courses: 3500,
    rating: 4.7,
    category: ["AI", "Cyber", "Data Science"],
    features: ["University Credit", "MicroMasters", "Professional Certificates"],
    featuresAr: ["ساعات جامعية", "ماجستير مصغر", "شهادات مهنية"]
  },
  {
    id: "linkedin",
    name: "LinkedIn Learning",
    nameAr: "لينكد إن ليرنينج",
    description: "Professional skills training for career advancement",
    descriptionAr: "تدريب مهني للتقدم الوظيفي",
    logo: "💼",
    website: "https://www.linkedin.com/learning",
    courses: 16000,
    rating: 4.6,
    category: ["Business", "Web", "Design"],
    features: ["LinkedIn Integration", "Expert Instructors", "Skill Assessments"],
    featuresAr: ["تكامل مع لينكد إن", "مدربون خبراء", "تقييم المهارات"]
  },
  {
    id: "pluralsight",
    name: "Pluralsight",
    nameAr: "بلورال سايت",
    description: "Technology skills platform for tech professionals",
    descriptionAr: "منصة مهارات تقنية للمحترفين",
    logo: "💻",
    website: "https://www.pluralsight.com",
    courses: 7000,
    rating: 4.5,
    category: ["AI", "Web", "Cyber", "Data Science"],
    features: ["Skill IQ", "Role IQ", "Hands-on Labs"],
    featuresAr: ["تقييم المهارات", "تقييم الأدوار", "مختبرات عملية"]
  },
  {
    id: "udacity",
    name: "Udacity",
    nameAr: "يوداسيتي",
    description: "Nanodegree programs built with industry leaders",
    descriptionAr: "برامج نانو ديجري بالتعاون مع قادة الصناعة",
    logo: "🚀",
    website: "https://www.udacity.com",
    courses: 200,
    rating: 4.4,
    category: ["AI", "Web", "Cyber", "Data Science"],
    features: ["Real Projects", "Career Services", "Mentorship"],
    featuresAr: ["مشاريع حقيقية", "خدمات مهنية", "إرشاد"]
  },
  {
    id: "codecademy",
    name: "Codecademy",
    nameAr: "كود أكاديمي",
    description: "Interactive coding lessons and projects",
    descriptionAr: "دروس برمجة تفاعلية ومشاريع",
    logo: "⌨️",
    website: "https://www.codecademy.com",
    courses: 300,
    rating: 4.6,
    category: ["Web", "AI", "Data Science"],
    features: ["Interactive Learning", "Practice Projects", "Career Paths"],
    featuresAr: ["تعلم تفاعلي", "مشاريع عملية", "مسارات مهنية"]
  },
  {
    id: "skillshare",
    name: "Skillshare",
    nameAr: "سكيل شير",
    description: "Creative and design-focused learning community",
    descriptionAr: "مجتمع تعليمي يركز على الإبداع والتصميم",
    logo: "🎨",
    website: "https://www.skillshare.com",
    courses: 35000,
    rating: 4.3,
    category: ["Design", "Business", "Web"],
    features: ["Project-Based", "Creative Community", "Unlimited Access"],
    featuresAr: ["قائم على المشاريع", "مجتمع إبداعي", "وصول غير محدود"]
  },
  {
    id: "google",
    name: "Google Career Certificates",
    nameAr: "شهادات جوجل المهنية",
    description: "Job-ready skills in high-demand fields",
    descriptionAr: "مهارات جاهزة للعمل في مجالات مطلوبة",
    logo: "🔍",
    website: "https://grow.google/certificates",
    courses: 8,
    rating: 4.9,
    category: ["AI", "Web", "Cyber", "Data Science"],
    features: ["Google Certification", "Job Placement", "Beginner Friendly"],
    featuresAr: ["شهادة جوجل", "توظيف", "مناسب للمبتدئين"]
  },
  {
    id: "meta",
    name: "Meta Professional Certificates",
    nameAr: "شهادات ميتا المهنية",
    description: "Learn from Meta's industry experts",
    descriptionAr: "تعلم من خبراء الصناعة في ميتا",
    logo: "📱",
    website: "https://www.facebook.com/business/learn",
    courses: 6,
    rating: 4.7,
    category: ["Web", "Design", "Business"],
    features: ["Meta Certification", "Real-world Projects", "Career Support"],
    featuresAr: ["شهادة ميتا", "مشاريع واقعية", "دعم مهني"]
  }
];
