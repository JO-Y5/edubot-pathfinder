import { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.assessment": "التقييم",
    "nav.dashboard": "لوحة التحكم",
    "nav.courses": "الدورات",
    "nav.achievements": "الإنجازات",
    "nav.settings": "الإعدادات",
    "nav.askBot": "اسأل المساعد",
    
    // Home Page
    "home.badge": "الإرشاد المهني بالذكاء الاصطناعي",
    "home.title": "اكتشف مسارك الأكاديمي",
    "home.titleHighlight": "المثالي",
    "home.description": "خذ تقييمًا ذكيًا، واحصل على توصيات مدعومة بالذكاء الاصطناعي، وابنِ خريطة طريق تعليمية مخصصة تتناسب مع نقاط قوتك وأهدافك.",
    "home.startAssessment": "ابدأ التقييم",
    "home.viewDashboard": "عرض لوحة التحكم",
    "home.tracks": "مسارات مهنية",
    "home.paths": "مسارات تعليمية",
    "home.certificates": "شهادات",
    "home.aiMatching": "مطابقة الذكاء الاصطناعي",
    "home.aiMatchingDesc": "يحلل الذكاء الاصطناعي المتقدم مهاراتك واهتماماتك وأهدافك لإيجاد التطابق المهني المثالي.",
    "home.learningPlan": "خطة التعلم",
    "home.learningPlanDesc": "احصل على خريطة طريق مخصصة مع الدورات والشهادات والمعالم المصممة خصيصًا لك.",
    "home.achievements": "الإنجازات",
    "home.achievementsDesc": "افتح الشارات وتتبع التقدم أثناء إكمال الدورات وتحقيق أهدافك.",
    "home.bilingualSupport": "الدعم ثنائي اللغة",
    "home.bilingualSupportDesc": "دعم كامل للغة الإنجليزية والعربية مع التبديل السلس بين اللغات.",
    "home.ctaTitle": "هل أنت مستعد لبدء رحلتك؟",
    "home.ctaDescription": "انضم إلى آلاف الطلاب الذين اكتشفوا مسارهم المهني المثالي مع EduMentor+",
    "home.ctaButton": "ابدأ التقييم الآن",
    
    // Assessment
    "assessment.title": "تقييم المسار المهني",
    "assessment.stepOf": "خطوة",
    "assessment.from": "من",
    "assessment.previous": "السابق",
    "assessment.next": "التالي",
    "assessment.complete": "إكمال التقييم",
    "assessment.selectError": "يرجى اختيار خيار واحد على الأقل",
    
    // Assessment Sections
    "assessment.section1": "المهارات والقدرات",
    "assessment.section2": "الاهتمامات والشغف",
    "assessment.section3": "الأهداف المهنية والدافع",
    "assessment.section4": "التعلم والتطوير الشخصي",
    
    // Assessment Questions
    "q1": "ما مدى ثقتك في حل المشاكل المعقدة بشكل مستقل؟",
    "q2": "هل تستمتع بالعمل مع البيانات أو الأرقام أو الأدوات التحليلية؟",
    "q3": "ما مدى راحتك في تعلم تقنيات جديدة أو لغات برمجة؟",
    "q4": "هل أنت ماهر في تقديم المعلومات بوضوح للآخرين؟",
    "q5": "ما مدى قوة مهارات التواصل والعمل الجماعي لديك؟",
    "q6": "هل أنت جيد في تنظيم الأشخاص أو المشاريع للوفاء بالمواعيد النهائية؟",
    "q7": "هل تفضل العمل المنظم أو المهام الإبداعية المفتوحة؟",
    "q8": "هل تستمتع بتحديد الأنماط أو الرؤى من البيانات الأولية؟",
    "q9": "ما مدى راحتك عند التعامل مع مهام متعددة في نفس الوقت؟",
    "q10": "هل أنت دقيق ومنتبه للتفاصيل عند إكمال المهام؟",
    "q11": "أي نشاط تستمتع به أكثر - البرمجة أو التصميم أو التحليل أو الإدارة أو الإبداع؟",
    "q12": "هل تفضل العمل مع الكمبيوتر أو الأشخاص أو الأفكار؟",
    "q13": "هل تشعر بالحماس لفكرة تطوير المنتجات الرقمية (التطبيقات أو المواقع أو الأدوات)؟",
    "q14": "هل تحب استكشاف كيفية تأثير التكنولوجيا على الأشخاص والشركات؟",
    "q15": "هل تفضل قضاء الوقت في حل الألغاز المنطقية أو العصف الذهني للأفكار الإبداعية؟",
    "q16": "أي بيئة عمل تجذبك أكثر - الشركات الناشئة أو الشركات الكبيرة أو مختبرات البحث؟",
    "q17": "هل تستمتع بالعمل الجماعي أو العمل بشكل مستقل؟",
    "q18": "ما مدى أهمية الاستقرار الوظيفي مقارنة بالمرونة والإبداع؟",
    "q19": "هل تفضل وظيفة ذات راتب مرتفع أو وظيفة تتوافق مع قيمك وشغفك؟",
    "q20": "هل أنت أكثر تحفيزًا بالاعتراف والألقاب، أم بالنمو الشخصي والتعلم؟",
    "q21": "هل تريد أن يركز عملك المستقبلي على الابتكار أو مساعدة الناس أو إدارة الفرق؟",
    "q22": "ما مدى استعدادك لتولي القيادة في المواقف الصعبة؟",
    "q23": "ما نوع التعلم الذي يبقيك أكثر تفاعلاً - المشاريع العملية أو مقاطع الفيديو أو المواد القرائية؟",
    "q24": "كم ساعة في الأسبوع أنت مستعد للاستثمار في تحسين مهاراتك؟",
    "q25": "أي اتجاه مستقبلي يجذبك أكثر؟",
    
    // Answer Options
    "answer.veryConfident": "واثق جدًا",
    "answer.confident": "واثق",
    "answer.neutral": "محايد",
    "answer.notVeryConfident": "غير واثق كثيرًا",
    "answer.notConfident": "غير واثق",
    "answer.yes": "نعم",
    "answer.no": "لا",
    "answer.coding": "البرمجة",
    "answer.designing": "التصميم",
    "answer.analyzing": "التحليل",
    "answer.managing": "الإدارة",
    "answer.creating": "الإبداع",
    "answer.structured": "منظم",
    "answer.creative": "إبداعي",
    "answer.computers": "الكمبيوتر",
    "answer.people": "الأشخاص",
    "answer.ideas": "الأفكار",
    "answer.logicalPuzzles": "الألغاز المنطقية",
    "answer.brainstorming": "العصف الذهني",
    "answer.startups": "الشركات الناشئة",
    "answer.corporations": "الشركات الكبيرة",
    "answer.researchLabs": "مختبرات البحث",
    "answer.teamwork": "العمل الجماعي",
    "answer.independent": "مستقل",
    "answer.stability": "الاستقرار",
    "answer.flexibility": "المرونة",
    "answer.highPaying": "راتب مرتفع",
    "answer.alignedWithValues": "متوافق مع القيم",
    "answer.recognition": "الاعتراف",
    "answer.personalGrowth": "النمو الشخصي",
    "answer.innovation": "الابتكار",
    "answer.helpingPeople": "مساعدة الناس",
    "answer.managingTeams": "إدارة الفرق",
    "answer.veryWilling": "راغب جدًا",
    "answer.willing": "راغب",
    "answer.notWilling": "غير راغب",
    "answer.handsOn": "عملي",
    "answer.videos": "فيديوهات",
    "answer.reading": "قراءة",
    "answer.1to3hours": "1-3 ساعات",
    "answer.4to7hours": "4-7 ساعات",
    "answer.8plus": "8+ ساعات",
    "answer.academicResearch": "البحث الأكاديمي",
    "answer.startBusiness": "بدء عمل خاص",
    "answer.techCompanies": "شركات التكنولوجيا",
    "answer.digitalContent": "المحتوى الرقمي",
    "answer.cybersecurity": "الأمن السيبراني",
    
    // Tracks
    "track.ai": "الذكاء الاصطناعي وعلوم البيانات",
    "track.web": "تطوير الويب",
    "track.cyber": "الأمن السيبراني",
    "track.design": "التصميم وتجربة المستخدم",
    "track.business": "إدارة الأعمال",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.assessment": "Assessment",
    "nav.dashboard": "Dashboard",
    "nav.courses": "Courses",
    "nav.achievements": "Achievements",
    "nav.settings": "Settings",
    "nav.askBot": "Ask EduBot",
    
    // Home Page
    "home.badge": "AI-Powered Career Guidance",
    "home.title": "Discover Your Perfect",
    "home.titleHighlight": "Academic Path",
    "home.description": "Take a smart assessment, get AI-driven recommendations, and build a personalized learning roadmap that matches your strengths and goals.",
    "home.startAssessment": "Start Assessment",
    "home.viewDashboard": "View Dashboard",
    "home.tracks": "Career Tracks",
    "home.paths": "Learning Paths",
    "home.certificates": "Certificates",
    "home.aiMatching": "AI Matching",
    "home.aiMatchingDesc": "Advanced AI analyzes your skills, interests, and goals to find your perfect career match.",
    "home.learningPlan": "Learning Plan",
    "home.learningPlanDesc": "Get a personalized roadmap with courses, certifications, and milestones tailored to you.",
    "home.achievements": "Achievements",
    "home.achievementsDesc": "Unlock badges and track progress as you complete courses and reach your goals.",
    "home.bilingualSupport": "Bilingual Support",
    "home.bilingualSupportDesc": "Full support for English and Arabic with seamless language switching.",
    "home.ctaTitle": "Ready to Start Your Journey?",
    "home.ctaDescription": "Join thousands of students who have discovered their ideal career path with EduMentor+",
    "home.ctaButton": "Take the Assessment Now",
    
    // Assessment
    "assessment.title": "Career Assessment",
    "assessment.stepOf": "Step",
    "assessment.from": "of",
    "assessment.previous": "Previous",
    "assessment.next": "Next",
    "assessment.complete": "Complete Assessment",
    "assessment.selectError": "Please select at least one option",
    
    // Assessment Sections
    "assessment.section1": "Skills & Abilities",
    "assessment.section2": "Interests & Passions",
    "assessment.section3": "Career Goals & Motivation",
    "assessment.section4": "Learning & Personal Development",
    
    // Assessment Questions
    "q1": "How confident are you in solving complex problems independently?",
    "q2": "Do you enjoy working with data, numbers, or analytical tools?",
    "q3": "How comfortable are you with learning new technologies or programming languages?",
    "q4": "Are you skilled at presenting information clearly to others?",
    "q5": "How strong are your communication and teamwork skills?",
    "q6": "Are you good at organizing people or projects to meet deadlines?",
    "q7": "Do you prefer structured work or creative, open-ended tasks?",
    "q8": "Do you enjoy identifying patterns or insights from raw data?",
    "q9": "How comfortable are you when handling multiple tasks at the same time?",
    "q10": "Are you detail-oriented and precise when completing assignments?",
    "q11": "Which activity do you enjoy the most — coding, designing, analyzing, managing, or creating?",
    "q12": "Do you prefer working with computers, people, or ideas?",
    "q13": "Are you excited by the idea of developing digital products (apps, websites, or tools)?",
    "q14": "Do you like exploring how technology impacts people and businesses?",
    "q15": "Would you rather spend time solving logical puzzles or brainstorming creative ideas?",
    "q16": "Which working environment appeals to you most — startups, corporations, or research labs?",
    "q17": "Do you enjoy teamwork or working independently?",
    "q18": "How important is job stability compared to flexibility and creativity?",
    "q19": "Would you rather have a high-paying job or one that aligns with your values and passions?",
    "q20": "Are you more motivated by recognition and titles, or by personal growth and learning?",
    "q21": "Do you want your future work to focus on innovation, helping people, or managing teams?",
    "q22": "How willing are you to take leadership in difficult situations?",
    "q23": "What type of learning keeps you most engaged — hands-on projects, videos, or reading materials?",
    "q24": "How many hours per week are you willing to invest in improving your skills?",
    "q25": "Which future direction attracts you the most?",
    
    // Tracks
    "track.ai": "AI & Data Science",
    "track.web": "Web Development",
    "track.cyber": "Cybersecurity",
    "track.design": "Design & UX",
    "track.business": "Business Management",
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("eduMentor-language");
    return (saved as Language) || "ar";
  });

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("eduMentor-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
