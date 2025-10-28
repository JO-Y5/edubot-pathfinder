// Professional Assessment Banks - 25 questions: 5 Scale + 10 Single + 10 Multi

export const BANK_UNI = [
  // ========== Scale Questions (5) ==========
  { 
    id: 1, 
    text_en: "I enjoy analyzing complex problems and finding solutions", 
    text_ar: "أستمتع بتحليل المشاكل المعقدة وإيجاد الحلول", 
    type: "scale" as const, 
    category: "Investigative", 
    tracks: [
      { track: "ai", weight: 0.9 }, 
      { track: "data", weight: 0.8 }, 
      { track: "cyber", weight: 0.7 }
    ] 
  },
  { 
    id: 2, 
    text_en: "I prefer working with tools and machines over working with people", 
    text_ar: "أفضل العمل مع الأدوات والآلات على العمل مع الناس", 
    type: "scale" as const, 
    category: "Realistic", 
    tracks: [
      { track: "iot", weight: 0.9 }, 
      { track: "embedded", weight: 0.8 }, 
      { track: "robotics", weight: 0.7 }
    ] 
  },
  { 
    id: 3, 
    text_en: "I enjoy creating and designing new things", 
    text_ar: "أستمتع بإنشاء وتصميم أشياء جديدة", 
    type: "scale" as const, 
    category: "Artistic", 
    tracks: [
      { track: "web", weight: 0.8 }, 
      { track: "mobile", weight: 0.7 }, 
      { track: "game", weight: 0.9 }
    ] 
  },
  { 
    id: 4, 
    text_en: "I like helping others learn and grow", 
    text_ar: "أحب مساعدة الآخرين على التعلم والنمو", 
    type: "scale" as const, 
    category: "Social", 
    tracks: [
      { track: "web", weight: 0.6 }, 
      { track: "mobile", weight: 0.5 }, 
      { track: "cloud", weight: 0.4 }
    ] 
  },
  { 
    id: 5, 
    text_en: "I enjoy organizing and managing projects", 
    text_ar: "أستمتع بتنظيم وإدارة المشاريع", 
    type: "scale" as const, 
    category: "Enterprising", 
    tracks: [
      { track: "cloud", weight: 0.8 }, 
      { track: "devops", weight: 0.9 }, 
      { track: "blockchain", weight: 0.6 }
    ] 
  },

  // ========== Single Choice Questions (10) ==========
  {
    id: 6,
    text_en: "Which activity sounds most appealing to you?",
    text_ar: "أي نشاط يبدو الأكثر جاذبية لك؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "Building intelligent systems",
      "Designing user interfaces",
      "Analyzing security vulnerabilities",
      "Managing cloud infrastructure"
    ],
    options_ar: [
      "بناء أنظمة ذكية",
      "تصميم واجهات المستخدم",
      "تحليل الثغرات الأمنية",
      "إدارة البنية التحتية السحابية"
    ],
    track_mapping: {
      0: { ai: 1.0, data: 0.7 },
      1: { web: 0.9, mobile: 0.8 },
      2: { cyber: 1.0, blockchain: 0.5 },
      3: { cloud: 1.0, devops: 0.8 }
    }
  },
  {
    id: 7,
    text_en: "What type of projects excite you most?",
    text_ar: "ما نوع المشاريع التي تثير حماسك أكثر؟",
    type: "single" as const,
    category: "Artistic",
    options_en: [
      "Mobile apps with beautiful designs",
      "Interactive web experiences",
      "Immersive games",
      "Data visualization dashboards"
    ],
    options_ar: [
      "تطبيقات موبايل بتصاميم جميلة",
      "تجارب ويب تفاعلية",
      "ألعاب غامرة",
      "لوحات تحكم لتصور البيانات"
    ],
    track_mapping: {
      0: { mobile: 1.0, web: 0.6 },
      1: { web: 1.0, mobile: 0.5 },
      2: { game: 1.0, web: 0.4 },
      3: { data: 1.0, ai: 0.6 }
    }
  },
  {
    id: 8,
    text_en: "Which technical challenge interests you?",
    text_ar: "أي تحدي تقني يثير اهتمامك؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "Training machine learning models",
      "Optimizing database performance",
      "Preventing cyber attacks",
      "Building scalable APIs"
    ],
    options_ar: [
      "تدريب نماذج التعلم الآلي",
      "تحسين أداء قواعد البيانات",
      "منع الهجمات السيبرانية",
      "بناء APIs قابلة للتوسع"
    ],
    track_mapping: {
      0: { ai: 1.0, data: 0.7 },
      1: { data: 1.0, cloud: 0.5 },
      2: { cyber: 1.0, blockchain: 0.4 },
      3: { cloud: 0.9, web: 0.7, devops: 0.8 }
    }
  },
  {
    id: 9,
    text_en: "What's your preferred work environment?",
    text_ar: "ما هي بيئة العمل المفضلة لديك؟",
    type: "single" as const,
    category: "Realistic",
    options_en: [
      "Research lab experimenting with new tech",
      "Startup building innovative products",
      "Security operations center",
      "Hardware engineering workshop"
    ],
    options_ar: [
      "مختبر بحثي للتجربة بتقنيات جديدة",
      "شركة ناشئة تبني منتجات مبتكرة",
      "مركز عمليات أمنية",
      "ورشة هندسة الأجهزة"
    ],
    track_mapping: {
      0: { ai: 0.9, data: 0.8 },
      1: { web: 0.7, mobile: 0.8, game: 0.6 },
      2: { cyber: 1.0, blockchain: 0.5 },
      3: { iot: 1.0, embedded: 0.9, robotics: 0.8 }
    }
  },
  {
    id: 10,
    text_en: "Which technology trend fascinates you most?",
    text_ar: "أي اتجاه تقني يبهرك أكثر؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "Artificial Intelligence & Deep Learning",
      "Blockchain & Decentralization",
      "Internet of Things & Smart Devices",
      "Augmented & Virtual Reality"
    ],
    options_ar: [
      "الذكاء الاصطناعي والتعلم العميق",
      "البلوكشين واللامركزية",
      "إنترنت الأشياء والأجهزة الذكية",
      "الواقع المعزز والافتراضي"
    ],
    track_mapping: {
      0: { ai: 1.0, data: 0.7 },
      1: { blockchain: 1.0, cyber: 0.5 },
      2: { iot: 1.0, embedded: 0.8 },
      3: { game: 0.9, web: 0.6, mobile: 0.7 }
    }
  },
  {
    id: 11,
    text_en: "What motivates you most in your career?",
    text_ar: "ما الذي يحفزك أكثر في مسيرتك المهنية؟",
    type: "single" as const,
    category: "Enterprising",
    options_en: [
      "Solving complex technical problems",
      "Creating products people love",
      "Protecting systems and data",
      "Leading and managing teams"
    ],
    options_ar: [
      "حل المشاكل التقنية المعقدة",
      "إنشاء منتجات يحبها الناس",
      "حماية الأنظمة والبيانات",
      "قيادة وإدارة الفرق"
    ],
    track_mapping: {
      0: { ai: 0.8, data: 0.9, cyber: 0.7 },
      1: { web: 0.9, mobile: 0.9, game: 0.8 },
      2: { cyber: 1.0, blockchain: 0.6 },
      3: { cloud: 0.7, devops: 0.9 }
    }
  },
  {
    id: 12,
    text_en: "Which development approach do you prefer?",
    text_ar: "أي أسلوب تطوير تفضل؟",
    type: "single" as const,
    category: "Conventional",
    options_en: [
      "Frontend with modern frameworks",
      "Backend with robust architecture",
      "Full-stack with end-to-end ownership",
      "Infrastructure and DevOps automation"
    ],
    options_ar: [
      "Frontend بأطر عمل حديثة",
      "Backend ببنية قوية",
      "Full-stack بملكية شاملة",
      "البنية التحتية وأتمتة DevOps"
    ],
    track_mapping: {
      0: { web: 0.9, mobile: 0.8 },
      1: { cloud: 0.9, data: 0.7 },
      2: { web: 0.7, mobile: 0.7, cloud: 0.8 },
      3: { devops: 1.0, cloud: 0.9 }
    }
  },
  {
    id: 13,
    text_en: "What's your ideal project size?",
    text_ar: "ما حجم المشروع المثالي بالنسبة لك؟",
    type: "single" as const,
    category: "Social",
    options_en: [
      "Large enterprise systems",
      "Medium-sized team projects",
      "Small innovative prototypes",
      "Personal experimental projects"
    ],
    options_ar: [
      "أنظمة مؤسسية كبيرة",
      "مشاريع فرق متوسطة الحجم",
      "نماذج أولية مبتكرة صغيرة",
      "مشاريع تجريبية شخصية"
    ],
    track_mapping: {
      0: { cloud: 0.9, devops: 0.8, cyber: 0.7 },
      1: { web: 0.8, mobile: 0.8, data: 0.7 },
      2: { ai: 0.8, game: 0.7, blockchain: 0.6 },
      3: { ai: 0.7, web: 0.6, iot: 0.8 }
    }
  },
  {
    id: 14,
    text_en: "Which programming paradigm appeals to you?",
    text_ar: "أي نموذج برمجي يجذبك؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "Object-oriented design patterns",
      "Functional programming principles",
      "Event-driven architectures",
      "Data-driven programming"
    ],
    options_ar: [
      "أنماط التصميم الموجهة للكائنات",
      "مبادئ البرمجة الوظيفية",
      "البنى المعمارية الموجهة بالأحداث",
      "البرمجة الموجهة بالبيانات"
    ],
    track_mapping: {
      0: { web: 0.7, mobile: 0.8, game: 0.7 },
      1: { ai: 0.8, data: 0.9 },
      2: { cloud: 0.8, devops: 0.7, iot: 0.6 },
      3: { data: 1.0, ai: 0.9 }
    }
  },
  {
    id: 15,
    text_en: "What's your learning style?",
    text_ar: "ما أسلوب التعلم الخاص بك؟",
    type: "single" as const,
    category: "Social",
    options_en: [
      "Reading documentation and books",
      "Watching video tutorials",
      "Building projects hands-on",
      "Learning from mentors and peers"
    ],
    options_ar: [
      "قراءة الوثائق والكتب",
      "مشاهدة دروس الفيديو",
      "بناء مشاريع عملية",
      "التعلم من الموجهين والزملاء"
    ],
    track_mapping: {
      0: { ai: 0.6, data: 0.7, cyber: 0.6 },
      1: { web: 0.6, mobile: 0.7, game: 0.6 },
      2: { web: 0.8, mobile: 0.8, game: 0.9, iot: 0.8 },
      3: { web: 0.5, mobile: 0.5, cloud: 0.6 }
    }
  },

  // ========== Multi Choice Questions (10) ==========
  {
    id: 16,
    text_en: "Which skills do you currently have or want to develop? (Select all that apply)",
    text_ar: "ما المهارات التي تمتلكها حالياً أو تريد تطويرها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "Python programming",
      "JavaScript/TypeScript",
      "Data structures & algorithms",
      "Machine learning frameworks",
      "Web frameworks (React, Vue)",
      "Mobile development (iOS/Android)"
    ],
    options_ar: [
      "برمجة Python",
      "JavaScript/TypeScript",
      "هياكل البيانات والخوارزميات",
      "أطر التعلم الآلي",
      "أطر الويب (React, Vue)",
      "تطوير الموبايل (iOS/Android)"
    ],
    track_mapping: {
      0: { ai: 0.9, data: 0.8 },
      1: { web: 0.9, mobile: 0.7 },
      2: { ai: 0.8, data: 0.9, cyber: 0.7 },
      3: { ai: 1.0, data: 0.9 },
      4: { web: 1.0, mobile: 0.6 },
      5: { mobile: 1.0, web: 0.5 }
    }
  },
  {
    id: 17,
    text_en: "Which technologies interest you? (Select all that apply)",
    text_ar: "ما التقنيات التي تهمك؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Realistic",
    options_en: [
      "Cloud platforms (AWS, Azure, GCP)",
      "Containerization (Docker, Kubernetes)",
      "Databases (SQL, NoSQL)",
      "Cybersecurity tools",
      "IoT devices & sensors",
      "Blockchain & Smart Contracts"
    ],
    options_ar: [
      "المنصات السحابية (AWS, Azure, GCP)",
      "الحاويات (Docker, Kubernetes)",
      "قواعد البيانات (SQL, NoSQL)",
      "أدوات الأمن السيبراني",
      "أجهزة وحساسات إنترنت الأشياء",
      "البلوكشين والعقود الذكية"
    ],
    track_mapping: {
      0: { cloud: 1.0, devops: 0.9 },
      1: { devops: 1.0, cloud: 0.9 },
      2: { data: 0.9, cloud: 0.8 },
      3: { cyber: 1.0, blockchain: 0.5 },
      4: { iot: 1.0, embedded: 0.8 },
      5: { blockchain: 1.0, cyber: 0.6 }
    }
  },
  {
    id: 18,
    text_en: "What areas of computer science fascinate you? (Select all that apply)",
    text_ar: "ما مجالات علوم الكمبيوتر التي تبهرك؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "Artificial Intelligence",
      "Computer Graphics & Animation",
      "Network Security",
      "Distributed Systems",
      "Natural Language Processing",
      "Computer Vision"
    ],
    options_ar: [
      "الذكاء الاصطناعي",
      "رسومات الكمبيوتر والرسوم المتحركة",
      "أمن الشبكات",
      "الأنظمة الموزعة",
      "معالجة اللغة الطبيعية",
      "رؤية الكمبيوتر"
    ],
    track_mapping: {
      0: { ai: 1.0, data: 0.8 },
      1: { game: 1.0, web: 0.6 },
      2: { cyber: 1.0, blockchain: 0.5 },
      3: { cloud: 0.9, blockchain: 0.8 },
      4: { ai: 1.0, data: 0.7 },
      5: { ai: 1.0, data: 0.6 }
    }
  },
  {
    id: 19,
    text_en: "Which work activities do you enjoy? (Select all that apply)",
    text_ar: "ما أنشطة العمل التي تستمتع بها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Social",
    options_en: [
      "Writing clean, maintainable code",
      "Designing system architectures",
      "Testing and debugging",
      "Code reviews and collaboration",
      "Technical documentation",
      "Performance optimization"
    ],
    options_ar: [
      "كتابة كود نظيف وقابل للصيانة",
      "تصميم بنى الأنظمة",
      "الاختبار وتصحيح الأخطاء",
      "مراجعة الكود والتعاون",
      "التوثيق التقني",
      "تحسين الأداء"
    ],
    track_mapping: {
      0: { web: 0.8, mobile: 0.8, data: 0.7 },
      1: { cloud: 0.9, devops: 0.8, cyber: 0.7 },
      2: { web: 0.7, mobile: 0.7, cyber: 0.8 },
      3: { web: 0.7, mobile: 0.7, cloud: 0.6 },
      4: { web: 0.6, cloud: 0.7, data: 0.6 },
      5: { cloud: 0.9, web: 0.8, game: 0.7 }
    }
  },
  {
    id: 20,
    text_en: "What kind of problems do you like solving? (Select all that apply)",
    text_ar: "ما نوع المشاكل التي تحب حلها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "Algorithm optimization challenges",
      "User experience improvements",
      "Security vulnerabilities",
      "Scalability bottlenecks",
      "Data analysis puzzles",
      "Integration complexities"
    ],
    options_ar: [
      "تحديات تحسين الخوارزميات",
      "تحسينات تجربة المستخدم",
      "الثغرات الأمنية",
      "عنق الزجاجة في قابلية التوسع",
      "ألغاز تحليل البيانات",
      "تعقيدات التكامل"
    ],
    track_mapping: {
      0: { ai: 0.9, data: 0.9 },
      1: { web: 0.9, mobile: 0.9 },
      2: { cyber: 1.0, blockchain: 0.6 },
      3: { cloud: 0.9, devops: 0.9 },
      4: { data: 1.0, ai: 0.8 },
      5: { cloud: 0.8, devops: 0.8, web: 0.7 }
    }
  },
  {
    id: 21,
    text_en: "Which platforms do you want to develop for? (Select all that apply)",
    text_ar: "ما المنصات التي تريد التطوير لها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Artistic",
    options_en: [
      "Web browsers",
      "iOS devices",
      "Android devices",
      "Desktop applications",
      "Gaming consoles",
      "Embedded systems"
    ],
    options_ar: [
      "متصفحات الويب",
      "أجهزة iOS",
      "أجهزة Android",
      "تطبيقات سطح المكتب",
      "منصات الألعاب",
      "الأنظمة المدمجة"
    ],
    track_mapping: {
      0: { web: 1.0, cloud: 0.5 },
      1: { mobile: 1.0, web: 0.4 },
      2: { mobile: 1.0, web: 0.4 },
      3: { web: 0.7, mobile: 0.8 },
      4: { game: 1.0, web: 0.5 },
      5: { iot: 1.0, embedded: 1.0, robotics: 0.8 }
    }
  },
  {
    id: 22,
    text_en: "What are your career goals? (Select all that apply)",
    text_ar: "ما أهدافك المهنية؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Enterprising",
    options_en: [
      "Work at a top tech company",
      "Start my own tech startup",
      "Become a technical leader",
      "Work remotely as a freelancer",
      "Research and publish papers",
      "Build products that impact millions"
    ],
    options_ar: [
      "العمل في شركة تقنية كبرى",
      "بدء شركتي الناشئة",
      "أن أصبح قائد تقني",
      "العمل عن بُعد كمستقل",
      "البحث ونشر الأوراق العلمية",
      "بناء منتجات تؤثر على الملايين"
    ],
    track_mapping: {
      0: { web: 0.8, mobile: 0.8, cloud: 0.9, ai: 0.8 },
      1: { web: 0.9, mobile: 0.9, blockchain: 0.7 },
      2: { cloud: 0.9, devops: 0.8, cyber: 0.7 },
      3: { web: 0.8, mobile: 0.8 },
      4: { ai: 1.0, data: 0.9 },
      5: { web: 0.9, mobile: 0.9, ai: 0.7 }
    }
  },
  {
    id: 23,
    text_en: "Which development tools are you familiar with? (Select all that apply)",
    text_ar: "ما أدوات التطوير التي تعرفها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Conventional",
    options_en: [
      "Git version control",
      "IDEs (VS Code, IntelliJ)",
      "Terminal/Command line",
      "Debugging tools",
      "Testing frameworks",
      "CI/CD pipelines"
    ],
    options_ar: [
      "Git للتحكم بالإصدارات",
      "بيئات التطوير (VS Code, IntelliJ)",
      "سطر الأوامر/Terminal",
      "أدوات تصحيح الأخطاء",
      "أطر الاختبار",
      "خطوط CI/CD"
    ],
    track_mapping: {
      0: { web: 0.7, mobile: 0.7, data: 0.7 },
      1: { web: 0.8, mobile: 0.8, game: 0.7 },
      2: { web: 0.7, cloud: 0.8, devops: 0.7 },
      3: { web: 0.7, mobile: 0.7, cyber: 0.6 },
      4: { web: 0.8, mobile: 0.8, data: 0.7 },
      5: { devops: 1.0, cloud: 0.9 }
    }
  },
  {
    id: 24,
    text_en: "What aspects of technology excite you most? (Select all that apply)",
    text_ar: "ما جوانب التكنولوجيا التي تثير حماسك أكثر؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "Solving real-world problems",
      "Pushing technological boundaries",
      "Creating beautiful user experiences",
      "Making systems more secure",
      "Handling big data at scale",
      "Automating repetitive tasks"
    ],
    options_ar: [
      "حل مشاكل العالم الحقيقي",
      "دفع حدود التكنولوجيا",
      "إنشاء تجارب مستخدم جميلة",
      "جعل الأنظمة أكثر أماناً",
      "التعامل مع البيانات الضخمة",
      "أتمتة المهام المتكررة"
    ],
    track_mapping: {
      0: { web: 0.8, mobile: 0.8, ai: 0.7 },
      1: { ai: 0.9, blockchain: 0.7, game: 0.6 },
      2: { web: 1.0, mobile: 1.0, game: 0.9 },
      3: { cyber: 1.0, blockchain: 0.7 },
      4: { data: 1.0, ai: 0.9, cloud: 0.7 },
      5: { devops: 1.0, cloud: 0.9 }
    }
  },
  {
    id: 25,
    text_en: "Which soft skills do you value most? (Select all that apply)",
    text_ar: "ما المهارات الشخصية التي تقدرها أكثر؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Social",
    options_en: [
      "Problem-solving and critical thinking",
      "Communication and collaboration",
      "Creativity and innovation",
      "Attention to detail",
      "Time management",
      "Adaptability and learning"
    ],
    options_ar: [
      "حل المشكلات والتفكير النقدي",
      "التواصل والتعاون",
      "الإبداع والابتكار",
      "الاهتمام بالتفاصيل",
      "إدارة الوقت",
      "القدرة على التكيف والتعلم"
    ],
    track_mapping: {
      0: { ai: 0.8, data: 0.8, cyber: 0.7 },
      1: { web: 0.7, mobile: 0.7, cloud: 0.7 },
      2: { web: 0.8, mobile: 0.8, game: 0.9 },
      3: { cyber: 0.8, devops: 0.7 },
      4: { cloud: 0.7, devops: 0.8 },
      5: { web: 0.7, mobile: 0.7, ai: 0.8 }
    }
  }
];

export const BANK_HS = [
  // ========== Scale Questions (5) ==========
  { 
    id: 1, 
    text_en: "I enjoy solving puzzles and logical problems", 
    text_ar: "أستمتع بحل الألغاز والمشاكل المنطقية", 
    type: "scale" as const, 
    category: "Investigative", 
    tracks: [
      { track: "ai", weight: 0.8 }, 
      { track: "data", weight: 0.7 }, 
      { track: "web", weight: 0.6 }
    ] 
  },
  { 
    id: 2, 
    text_en: "I like building and fixing things", 
    text_ar: "أحب بناء وإصلاح الأشياء", 
    type: "scale" as const, 
    category: "Realistic", 
    tracks: [
      { track: "iot", weight: 0.8 }, 
      { track: "game", weight: 0.6 }, 
      { track: "web", weight: 0.5 }
    ] 
  },
  { 
    id: 3, 
    text_en: "I enjoy being creative and trying new ideas", 
    text_ar: "أستمتع بالإبداع وتجربة أفكار جديدة", 
    type: "scale" as const, 
    category: "Artistic", 
    tracks: [
      { track: "web", weight: 0.8 }, 
      { track: "mobile", weight: 0.7 }, 
      { track: "game", weight: 0.9 }
    ] 
  },
  { 
    id: 4, 
    text_en: "I like working in teams and helping others", 
    text_ar: "أحب العمل في فرق ومساعدة الآخرين", 
    type: "scale" as const, 
    category: "Social", 
    tracks: [
      { track: "web", weight: 0.5 }, 
      { track: "mobile", weight: 0.5 }, 
      { track: "cloud", weight: 0.4 }
    ] 
  },
  { 
    id: 5, 
    text_en: "I enjoy organizing things and planning ahead", 
    text_ar: "أستمتع بتنظيم الأشياء والتخطيط المسبق", 
    type: "scale" as const, 
    category: "Conventional", 
    tracks: [
      { track: "cloud", weight: 0.7 }, 
      { track: "devops", weight: 0.8 }, 
      { track: "cyber", weight: 0.6 }
    ] 
  },

  // ========== Single Choice Questions (10) ==========
  {
    id: 6,
    text_en: "What do you enjoy doing in your free time?",
    text_ar: "ماذا تستمتع بفعله في وقت فراغك؟",
    type: "single" as const,
    category: "Artistic",
    options_en: [
      "Playing video games",
      "Watching tech videos",
      "Drawing or designing",
      "Building projects"
    ],
    options_ar: [
      "لعب ألعاب الفيديو",
      "مشاهدة فيديوهات تقنية",
      "الرسم أو التصميم",
      "بناء مشاريع"
    ],
    track_mapping: {
      0: { game: 1.0, web: 0.5 },
      1: { ai: 0.7, web: 0.6, mobile: 0.5 },
      2: { web: 0.9, mobile: 0.8 },
      3: { iot: 0.8, web: 0.7 }
    }
  },
  {
    id: 7,
    text_en: "Which subject do you find most interesting?",
    text_ar: "أي مادة دراسية تجدها الأكثر إثارة؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "Mathematics",
      "Physics",
      "Computer Science",
      "Arts and Design"
    ],
    options_ar: [
      "الرياضيات",
      "الفيزياء",
      "علوم الكمبيوتر",
      "الفنون والتصميم"
    ],
    track_mapping: {
      0: { ai: 0.9, data: 0.8 },
      1: { iot: 0.8, embedded: 0.7 },
      2: { web: 0.8, mobile: 0.7, ai: 0.7 },
      3: { web: 0.9, mobile: 0.8, game: 0.9 }
    }
  },
  {
    id: 8,
    text_en: "What type of projects would you like to create?",
    text_ar: "ما نوع المشاريع التي تريد إنشاءها؟",
    type: "single" as const,
    category: "Artistic",
    options_en: [
      "Websites and web apps",
      "Mobile applications",
      "Games",
      "Smart devices"
    ],
    options_ar: [
      "مواقع وتطبيقات ويب",
      "تطبيقات موبايل",
      "ألعاب",
      "أجهزة ذكية"
    ],
    track_mapping: {
      0: { web: 1.0, mobile: 0.5 },
      1: { mobile: 1.0, web: 0.5 },
      2: { game: 1.0, web: 0.4 },
      3: { iot: 1.0, embedded: 0.8 }
    }
  },
  {
    id: 9,
    text_en: "How do you prefer to learn new things?",
    text_ar: "كيف تفضل تعلم أشياء جديدة؟",
    type: "single" as const,
    category: "Social",
    options_en: [
      "Reading and studying",
      "Watching tutorials",
      "Hands-on practice",
      "Learning with friends"
    ],
    options_ar: [
      "القراءة والدراسة",
      "مشاهدة دروس",
      "الممارسة العملية",
      "التعلم مع الأصدقاء"
    ],
    track_mapping: {
      0: { ai: 0.6, data: 0.7 },
      1: { web: 0.6, mobile: 0.6, game: 0.5 },
      2: { web: 0.8, mobile: 0.8, iot: 0.7 },
      3: { web: 0.5, mobile: 0.5 }
    }
  },
  {
    id: 10,
    text_en: "What kind of technology interests you most?",
    text_ar: "ما نوع التكنولوجيا التي تهمك أكثر؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "Artificial Intelligence",
      "Mobile Apps",
      "Video Games",
      "Robotics"
    ],
    options_ar: [
      "الذكاء الاصطناعي",
      "تطبيقات الموبايل",
      "ألعاب الفيديو",
      "الروبوتات"
    ],
    track_mapping: {
      0: { ai: 1.0, data: 0.7 },
      1: { mobile: 1.0, web: 0.6 },
      2: { game: 1.0, web: 0.5 },
      3: { iot: 0.9, embedded: 0.9, robotics: 1.0 }
    }
  },
  {
    id: 11,
    text_en: "What motivates you to learn programming?",
    text_ar: "ما الذي يحفزك لتعلم البرمجة؟",
    type: "single" as const,
    category: "Enterprising",
    options_en: [
      "Creating useful apps",
      "Solving challenging problems",
      "Building games",
      "Understanding how things work"
    ],
    options_ar: [
      "إنشاء تطبيقات مفيدة",
      "حل مشاكل صعبة",
      "بناء ألعاب",
      "فهم كيف تعمل الأشياء"
    ],
    track_mapping: {
      0: { web: 0.9, mobile: 0.9 },
      1: { ai: 0.8, data: 0.7, cyber: 0.6 },
      2: { game: 1.0, web: 0.5 },
      3: { ai: 0.7, iot: 0.8, embedded: 0.7 }
    }
  },
  {
    id: 12,
    text_en: "Which device do you use most?",
    text_ar: "أي جهاز تستخدمه أكثر؟",
    type: "single" as const,
    category: "Realistic",
    options_en: [
      "Computer/Laptop",
      "Smartphone",
      "Gaming Console",
      "Tablet"
    ],
    options_ar: [
      "كمبيوتر/لابتوب",
      "هاتف ذكي",
      "منصة ألعاب",
      "تابلت"
    ],
    track_mapping: {
      0: { web: 0.8, cloud: 0.6, data: 0.5 },
      1: { mobile: 0.9, web: 0.6 },
      2: { game: 1.0, web: 0.4 },
      3: { mobile: 0.8, web: 0.7 }
    }
  },
  {
    id: 13,
    text_en: "What's your dream tech job?",
    text_ar: "ما وظيفة أحلامك في التكنولوجيا؟",
    type: "single" as const,
    category: "Enterprising",
    options_en: [
      "Game Developer",
      "App Developer",
      "AI Engineer",
      "Web Developer"
    ],
    options_ar: [
      "مطور ألعاب",
      "مطور تطبيقات",
      "مهندس ذكاء اصطناعي",
      "مطور ويب"
    ],
    track_mapping: {
      0: { game: 1.0, web: 0.4 },
      1: { mobile: 1.0, web: 0.6 },
      2: { ai: 1.0, data: 0.8 },
      3: { web: 1.0, mobile: 0.5 }
    }
  },
  {
    id: 14,
    text_en: "How do you feel about math?",
    text_ar: "ما شعورك تجاه الرياضيات؟",
    type: "single" as const,
    category: "Investigative",
    options_en: [
      "I love it and I'm good at it",
      "It's okay, I can handle it",
      "I prefer creative subjects",
      "I find it challenging"
    ],
    options_ar: [
      "أحبها وأنا جيد فيها",
      "جيدة، أستطيع التعامل معها",
      "أفضل المواد الإبداعية",
      "أجدها صعبة"
    ],
    track_mapping: {
      0: { ai: 0.9, data: 0.9, cyber: 0.7 },
      1: { web: 0.7, mobile: 0.7, cloud: 0.6 },
      2: { web: 0.8, mobile: 0.8, game: 0.9 },
      3: { web: 0.7, mobile: 0.7 }
    }
  },
  {
    id: 15,
    text_en: "What would you like to build first?",
    text_ar: "ماذا تريد أن تبني أولاً؟",
    type: "single" as const,
    category: "Artistic",
    options_en: [
      "A personal website",
      "A mobile game",
      "A chatbot",
      "A smart home device"
    ],
    options_ar: [
      "موقع شخصي",
      "لعبة موبايل",
      "روبوت محادثة",
      "جهاز منزل ذكي"
    ],
    track_mapping: {
      0: { web: 1.0, mobile: 0.4 },
      1: { game: 1.0, mobile: 0.8 },
      2: { ai: 1.0, web: 0.6 },
      3: { iot: 1.0, embedded: 0.8 }
    }
  },

  // ========== Multi Choice Questions (10) ==========
  {
    id: 16,
    text_en: "Which activities do you enjoy? (Select all that apply)",
    text_ar: "ما الأنشطة التي تستمتع بها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Social",
    options_en: [
      "Gaming",
      "Social media",
      "Watching YouTube",
      "Reading books",
      "Drawing/Design",
      "Building things"
    ],
    options_ar: [
      "الألعاب",
      "وسائل التواصل الاجتماعي",
      "مشاهدة يوتيوب",
      "قراءة الكتب",
      "الرسم/التصميم",
      "بناء الأشياء"
    ],
    track_mapping: {
      0: { game: 1.0, web: 0.5 },
      1: { web: 0.8, mobile: 0.9 },
      2: { web: 0.6, mobile: 0.6, ai: 0.5 },
      3: { ai: 0.7, data: 0.6 },
      4: { web: 0.9, mobile: 0.8, game: 0.7 },
      5: { iot: 0.9, web: 0.6 }
    }
  },
  {
    id: 17,
    text_en: "What interests you about technology? (Select all that apply)",
    text_ar: "ما الذي يهمك في التكنولوجيا؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "How apps work",
      "How games are made",
      "How AI works",
      "How websites are built",
      "How phones work",
      "How robots work"
    ],
    options_ar: [
      "كيف تعمل التطبيقات",
      "كيف تُصنع الألعاب",
      "كيف يعمل الذكاء الاصطناعي",
      "كيف تُبنى المواقع",
      "كيف تعمل الهواتف",
      "كيف تعمل الروبوتات"
    ],
    track_mapping: {
      0: { mobile: 0.9, web: 0.8 },
      1: { game: 1.0, web: 0.6 },
      2: { ai: 1.0, data: 0.7 },
      3: { web: 1.0, mobile: 0.6 },
      4: { mobile: 1.0, iot: 0.7 },
      5: { iot: 0.9, embedded: 0.9, robotics: 1.0 }
    }
  },
  {
    id: 18,
    text_en: "Which school subjects do you like? (Select all that apply)",
    text_ar: "ما المواد الدراسية التي تحبها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "Math",
      "Science",
      "Computer",
      "Art",
      "English",
      "Physics"
    ],
    options_ar: [
      "الرياضيات",
      "العلوم",
      "الكمبيوتر",
      "الفنون",
      "الإنجليزي",
      "الفيزياء"
    ],
    track_mapping: {
      0: { ai: 0.8, data: 0.9 },
      1: { iot: 0.7, ai: 0.6 },
      2: { web: 0.8, mobile: 0.7, ai: 0.7 },
      3: { web: 0.8, mobile: 0.8, game: 0.9 },
      4: { web: 0.6, mobile: 0.6 },
      5: { iot: 0.8, embedded: 0.8 }
    }
  },
  {
    id: 19,
    text_en: "What do you want to learn? (Select all that apply)",
    text_ar: "ماذا تريد أن تتعلم؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Enterprising",
    options_en: [
      "Make websites",
      "Make mobile apps",
      "Make games",
      "Program robots",
      "Build AI",
      "Cyber security"
    ],
    options_ar: [
      "صنع مواقع ويب",
      "صنع تطبيقات موبايل",
      "صنع ألعاب",
      "برمجة روبوتات",
      "بناء ذكاء اصطناعي",
      "الأمن السيبراني"
    ],
    track_mapping: {
      0: { web: 1.0, mobile: 0.5 },
      1: { mobile: 1.0, web: 0.5 },
      2: { game: 1.0, web: 0.4 },
      3: { iot: 0.9, embedded: 0.9, robotics: 1.0 },
      4: { ai: 1.0, data: 0.8 },
      5: { cyber: 1.0, blockchain: 0.5 }
    }
  },
  {
    id: 20,
    text_en: "Which platforms do you use most? (Select all that apply)",
    text_ar: "ما المنصات التي تستخدمها أكثر؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Realistic",
    options_en: [
      "Instagram/TikTok",
      "YouTube",
      "Gaming platforms",
      "Educational websites",
      "Messaging apps",
      "Online games"
    ],
    options_ar: [
      "إنستغرام/تيك توك",
      "يوتيوب",
      "منصات الألعاب",
      "مواقع تعليمية",
      "تطبيقات المراسلة",
      "ألعاب أونلاين"
    ],
    track_mapping: {
      0: { mobile: 0.9, web: 0.7 },
      1: { web: 0.7, mobile: 0.6 },
      2: { game: 1.0, web: 0.5 },
      3: { web: 0.8, mobile: 0.7 },
      4: { mobile: 0.9, web: 0.7 },
      5: { game: 1.0, web: 0.6 }
    }
  },
  {
    id: 21,
    text_en: "What skills do you have or want? (Select all that apply)",
    text_ar: "ما المهارات التي تمتلكها أو تريدها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Artistic",
    options_en: [
      "Drawing/Design",
      "Problem solving",
      "Creative thinking",
      "Logical thinking",
      "Teamwork",
      "Building things"
    ],
    options_ar: [
      "الرسم/التصميم",
      "حل المشكلات",
      "التفكير الإبداعي",
      "التفكير المنطقي",
      "العمل الجماعي",
      "بناء الأشياء"
    ],
    track_mapping: {
      0: { web: 0.9, mobile: 0.9, game: 0.8 },
      1: { ai: 0.8, data: 0.7, cyber: 0.7 },
      2: { web: 0.8, mobile: 0.8, game: 0.9 },
      3: { ai: 0.8, data: 0.9 },
      4: { web: 0.6, mobile: 0.6, cloud: 0.5 },
      5: { iot: 0.9, web: 0.7 }
    }
  },
  {
    id: 22,
    text_en: "What kind of apps do you use? (Select all that apply)",
    text_ar: "ما نوع التطبيقات التي تستخدمها؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Social",
    options_en: [
      "Social media apps",
      "Gaming apps",
      "Learning apps",
      "Creative apps",
      "Music/Video apps",
      "Shopping apps"
    ],
    options_ar: [
      "تطبيقات التواصل",
      "تطبيقات الألعاب",
      "تطبيقات التعلم",
      "تطبيقات إبداعية",
      "تطبيقات الموسيقى/الفيديو",
      "تطبيقات التسوق"
    ],
    track_mapping: {
      0: { mobile: 0.9, web: 0.8 },
      1: { game: 1.0, mobile: 0.8 },
      2: { web: 0.7, mobile: 0.8, ai: 0.6 },
      3: { web: 0.8, mobile: 0.9 },
      4: { mobile: 0.8, web: 0.7 },
      5: { web: 0.8, mobile: 0.9 }
    }
  },
  {
    id: 23,
    text_en: "What would you like to create? (Select all that apply)",
    text_ar: "ماذا تريد أن تصنع؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Artistic",
    options_en: [
      "Cool websites",
      "Fun games",
      "Useful apps",
      "Smart robots",
      "AI assistants",
      "Creative projects"
    ],
    options_ar: [
      "مواقع رائعة",
      "ألعاب ممتعة",
      "تطبيقات مفيدة",
      "روبوتات ذكية",
      "مساعدين AI",
      "مشاريع إبداعية"
    ],
    track_mapping: {
      0: { web: 1.0, mobile: 0.6 },
      1: { game: 1.0, web: 0.5 },
      2: { mobile: 1.0, web: 0.8 },
      3: { iot: 0.9, embedded: 0.9, robotics: 1.0 },
      4: { ai: 1.0, web: 0.6 },
      5: { web: 0.8, mobile: 0.8, game: 0.7 }
    }
  },
  {
    id: 24,
    text_en: "What motivates you? (Select all that apply)",
    text_ar: "ما الذي يحفزك؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Enterprising",
    options_en: [
      "Making something useful",
      "Learning new things",
      "Having fun",
      "Helping others",
      "Being creative",
      "Solving challenges"
    ],
    options_ar: [
      "صنع شيء مفيد",
      "تعلم أشياء جديدة",
      "الاستمتاع",
      "مساعدة الآخرين",
      "الإبداع",
      "حل التحديات"
    ],
    track_mapping: {
      0: { web: 0.8, mobile: 0.8 },
      1: { ai: 0.7, web: 0.6, mobile: 0.6 },
      2: { game: 0.9, web: 0.6 },
      3: { web: 0.7, mobile: 0.7 },
      4: { web: 0.8, mobile: 0.8, game: 0.9 },
      5: { ai: 0.8, data: 0.7, cyber: 0.7 }
    }
  },
  {
    id: 25,
    text_en: "What tech topics interest you? (Select all that apply)",
    text_ar: "ما المواضيع التقنية التي تهمك؟ (اختر كل ما ينطبق)",
    type: "multi" as const,
    category: "Investigative",
    options_en: [
      "How to code",
      "Game design",
      "App development",
      "Robotics",
      "Artificial Intelligence",
      "Internet safety"
    ],
    options_ar: [
      "كيفية البرمجة",
      "تصميم الألعاب",
      "تطوير التطبيقات",
      "الروبوتات",
      "الذكاء الاصطناعي",
      "الأمان على الإنترنت"
    ],
    track_mapping: {
      0: { web: 0.8, mobile: 0.7, ai: 0.6 },
      1: { game: 1.0, web: 0.5 },
      2: { mobile: 1.0, web: 0.8 },
      3: { iot: 0.9, embedded: 0.9, robotics: 1.0 },
      4: { ai: 1.0, data: 0.8 },
      5: { cyber: 1.0, web: 0.5 }
    }
  }
];
