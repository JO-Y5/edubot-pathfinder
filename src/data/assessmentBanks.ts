// Professional Assessment Banks based on RIASEC and Big5 personality models
// Each question has a category that maps to personality traits and career tracks

export const BANK_UNI = [
  // ========== RIASEC: Investigative (تحليلي، بحثي) ==========
  {
    id: 'logical_thinking_1',
    q_ar: 'أستمتع بحل المسائل المعقدة التي تتطلب تفكير منطقي',
    q_en: 'I enjoy solving complex problems that require logical thinking',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'logical_thinking',
    tracks: { ai: 1.0, cyber: 0.8, web: 0.6 }
  },
  {
    id: 'academic_strength_1',
    q_ar: 'أفضل المواد التي تحتوي على تحليل عميق وبحث علمي',
    q_en: 'I prefer subjects with deep analysis and scientific research',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'academic_strength',
    tracks: { ai: 0.9, cyber: 0.7 }
  },
  {
    id: 'problem_solving_1',
    q_ar: 'عندما أواجه مشكلة، أحب أن أفهم السبب الجذري قبل إيجاد الحل',
    q_en: 'When facing a problem, I like to understand the root cause before finding a solution',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'problem_solving',
    tracks: { ai: 0.8, cyber: 0.9, web: 0.6 }
  },
  {
    id: 'learning_motivation_1',
    q_ar: 'أستمتع بتعلم تقنيات وأدوات جديدة بشكل مستمر',
    q_en: 'I enjoy continuously learning new technologies and tools',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'learning_motivation',
    tracks: { ai: 0.9, web: 0.8, cyber: 0.7 }
  },

  // ========== RIASEC: Realistic (عملي، تقني) ==========
  {
    id: 'tech_interest_1',
    q_ar: 'أفضل العمل مع الأجهزة والبرمجيات أكثر من الأمور النظرية',
    q_en: 'I prefer working with devices and software over theoretical matters',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'tech_interest',
    tracks: { web: 1.0, cyber: 0.8, ai: 0.6 }
  },
  {
    id: 'skills_1',
    q_ar: 'أستطيع تطبيق ما أتعلمه عملياً بسرعة',
    q_en: 'I can quickly apply what I learn practically',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'skills',
    tracks: { web: 0.9, ai: 0.7, cyber: 0.7 }
  },
  {
    id: 'hands_on',
    q_ar: 'أفضل المشاريع العملية على القراءة والكتابة',
    q_en: 'I prefer practical projects over reading and writing',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'skills',
    tracks: { web: 0.8, design: 0.7 }
  },

  // ========== RIASEC: Artistic (فني، إبداعي) ==========
  {
    id: 'interests_1',
    q_ar: 'أحب التصميم والابتكار في حل المشكلات',
    q_en: 'I love designing and innovating in problem solving',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'interests',
    tracks: { design: 1.0, web: 0.7, ai: 0.5 }
  },
  {
    id: 'hobbies_1',
    q_ar: 'أهتم بالتفاصيل البصرية وتجربة المستخدم',
    q_en: 'I care about visual details and user experience',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'hobbies',
    tracks: { design: 0.9, web: 0.8 }
  },
  {
    id: 'creativity',
    q_ar: 'أستمتع بإيجاد حلول إبداعية غير تقليدية',
    q_en: 'I enjoy finding creative unconventional solutions',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'interests',
    tracks: { design: 0.8, ai: 0.6, business: 0.5 }
  },

  // ========== RIASEC: Social (اجتماعي، خدمي) ==========
  {
    id: 'teamwork_1',
    q_ar: 'أفضل العمل ضمن فريق على العمل الفردي',
    q_en: 'I prefer working in a team over individual work',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'teamwork',
    tracks: { business: 0.8, design: 0.5, web: 0.4 }
  },
  {
    id: 'presentation_1',
    q_ar: 'أجيد شرح الأفكار المعقدة بطريقة بسيطة للآخرين',
    q_en: 'I can explain complex ideas simply to others',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'presentation',
    tracks: { business: 0.9, design: 0.5 }
  },
  {
    id: 'communication',
    q_ar: 'أستمتع بالنقاش وتبادل الأفكار مع الزملاء',
    q_en: 'I enjoy discussing and exchanging ideas with colleagues',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'teamwork',
    tracks: { business: 0.7, web: 0.4 }
  },

  // ========== RIASEC: Enterprising (قيادي، ريادي) ==========
  {
    id: 'leadership_1',
    q_ar: 'أحب قيادة المشاريع واتخاذ القرارات الاستراتيجية',
    q_en: 'I like leading projects and making strategic decisions',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'leadership',
    tracks: { business: 1.0, ai: 0.4 }
  },
  {
    id: 'entrepreneurship_1',
    q_ar: 'أفكر في بناء مشروعي الخاص مستقبلاً',
    q_en: 'I think about building my own project in the future',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'entrepreneurship',
    tracks: { business: 0.9, web: 0.5, design: 0.5 }
  },
  {
    id: 'career_values_1',
    q_ar: 'أهتم بتطوير مهارات إدارة الأعمال والتسويق',
    q_en: 'I care about developing business management and marketing skills',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'career_values',
    tracks: { business: 1.0, design: 0.3 }
  },

  // ========== RIASEC: Conventional (منظم، إداري) ==========
  {
    id: 'planning_1',
    q_ar: 'أحب التخطيط المسبق وتنظيم المهام بدقة',
    q_en: 'I like planning ahead and organizing tasks precisely',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'planning',
    tracks: { cyber: 0.8, ai: 0.6, business: 0.7 }
  },
  {
    id: 'learning_style_1',
    q_ar: 'أفضل اتباع منهجية واضحة عند التعلم',
    q_en: 'I prefer following a clear methodology when learning',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'learning_style',
    tracks: { cyber: 0.7, ai: 0.6 }
  },
  {
    id: 'decision_making_1',
    q_ar: 'أعتمد على البيانات والأدلة في اتخاذ القرارات',
    q_en: 'I rely on data and evidence in decision making',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'decision_making',
    tracks: { ai: 0.9, cyber: 0.8, business: 0.6 }
  },

  // ========== Multiple Choice Questions ==========
  {
    id: 'preferred_work',
    q_ar: 'ما نوع العمل الذي تفضله؟',
    q_en: 'What type of work do you prefer?',
    type: 'single',
    options_ar: ['تطوير الأنظمة والبرمجة', 'تحليل البيانات والذكاء الاصطناعي', 'التصميم والإبداع', 'الأمن السيبراني', 'إدارة الأعمال والتسويق'],
    options_en: ['Systems Development & Programming', 'Data Analysis & AI', 'Design & Creativity', 'Cybersecurity', 'Business Management & Marketing'],
    category: 'interests',
    tracks: { web: 0.0, ai: 0.0, design: 0.0, cyber: 0.0, business: 0.0 },
    track_mapping: {
      0: { web: 5 },
      1: { ai: 5 },
      2: { design: 5 },
      3: { cyber: 5 },
      4: { business: 5 }
    }
  },
  {
    id: 'tech_topics',
    q_ar: 'ما المواضيع التقنية التي تثير اهتمامك؟ (اختر كل ما ينطبق)',
    q_en: 'Which tech topics interest you? (Select all that apply)',
    type: 'multi',
    options_ar: ['تعلم الآلة والذكاء الاصطناعي', 'تطوير المواقع والتطبيقات', 'الأمن السيبراني والحماية', 'تصميم واجهات المستخدم', 'تحليل البيانات', 'ريادة الأعمال التقنية'],
    options_en: ['Machine Learning & AI', 'Web & App Development', 'Cybersecurity & Protection', 'UI/UX Design', 'Data Analysis', 'Tech Entrepreneurship'],
    category: 'tech_interest',
    tracks: { ai: 0, web: 0, cyber: 0, design: 0, business: 0 },
    track_mapping: {
      0: { ai: 3 },
      1: { web: 3 },
      2: { cyber: 3 },
      3: { design: 3 },
      4: { ai: 2 },
      5: { business: 3 }
    }
  },
  {
    id: 'strength_areas',
    q_ar: 'ما المجالات التي تشعر بالقوة فيها؟ (اختر كل ما ينطبق)',
    q_en: 'Which areas do you feel strong in? (Select all that apply)',
    type: 'multi',
    options_ar: ['الرياضيات والإحصاء', 'البرمجة والخوارزميات', 'التصميم الجرافيكي', 'حل المشكلات التقنية', 'التواصل والعرض', 'التخطيط والتنظيم'],
    options_en: ['Mathematics & Statistics', 'Programming & Algorithms', 'Graphic Design', 'Technical Problem Solving', 'Communication & Presentation', 'Planning & Organization'],
    category: 'skills',
    tracks: { ai: 0, web: 0, design: 0, cyber: 0, business: 0 },
    track_mapping: {
      0: { ai: 3 },
      1: { web: 3, ai: 2 },
      2: { design: 3 },
      3: { cyber: 3, web: 2 },
      4: { business: 3 },
      5: { business: 2, cyber: 2 }
    }
  },
  {
    id: 'career_goals',
    q_ar: 'ما هدفك المهني الأساسي؟',
    q_en: 'What is your primary career goal?',
    type: 'single',
    options_ar: ['أن أصبح خبير تقني متخصص', 'بناء منتجات وشركات ناشئة', 'العمل في مجال الأمن والحماية', 'تصميم تجارب مستخدم مميزة', 'قيادة فرق وإدارة مشاريع'],
    options_en: ['Become a specialized technical expert', 'Build products and startups', 'Work in security and protection', 'Design exceptional user experiences', 'Lead teams and manage projects'],
    category: 'career_values',
    tracks: { ai: 0, web: 0, cyber: 0, design: 0, business: 0 },
    track_mapping: {
      0: { ai: 5 },
      1: { web: 4, business: 3 },
      2: { cyber: 5 },
      3: { design: 5 },
      4: { business: 5 }
    }
  },
  {
    id: 'work_environment',
    q_ar: 'ما بيئة العمل المفضلة لديك؟',
    q_en: 'What is your preferred work environment?',
    type: 'single',
    options_ar: ['مختبر بحثي أو شركة تقنية كبيرة', 'شركة ناشئة سريعة النمو', 'فريلانس أو عمل حر', 'مؤسسة كبيرة منظمة', 'استوديو تصميم إبداعي'],
    options_en: ['Research lab or big tech company', 'Fast-growing startup', 'Freelance or independent work', 'Large organized corporation', 'Creative design studio'],
    category: 'career_values',
    tracks: { ai: 0, web: 0, cyber: 0, design: 0, business: 0 },
    track_mapping: {
      0: { ai: 4 },
      1: { web: 4, business: 3 },
      2: { web: 3, design: 3 },
      3: { cyber: 4, business: 3 },
      4: { design: 5 }
    }
  },
  {
    id: 'learning_preference',
    q_ar: 'كيف تفضل تعلم مهارات جديدة؟',
    q_en: 'How do you prefer learning new skills?',
    type: 'single',
    options_ar: ['قراءة الوثائق التقنية والأبحاث', 'مشاهدة فيديوهات تعليمية', 'التطبيق العملي المباشر', 'دورات منظمة خطوة بخطوة', 'التجربة والخطأ'],
    options_en: ['Reading technical documentation and research', 'Watching video tutorials', 'Direct hands-on practice', 'Structured step-by-step courses', 'Trial and error'],
    category: 'learning_style',
    tracks: { ai: 0, web: 0, cyber: 0, design: 0, business: 0 },
    track_mapping: {
      0: { ai: 4 },
      1: { web: 3, design: 2 },
      2: { web: 4, cyber: 3 },
      3: { cyber: 3, business: 2 },
      4: { design: 3, web: 2 }
    }
  },
  {
    id: 'problem_approach',
    q_ar: 'عند مواجهة مشكلة معقدة، ما أول شيء تفعله؟',
    q_en: 'When facing a complex problem, what do you do first?',
    type: 'single',
    options_ar: ['أحللها إلى أجزاء صغيرة', 'أبحث عن حلول مشابهة', 'أرسم مخطط أو تصميم', 'أستشير الخبراء', 'أجرب حلول مختلفة بسرعة'],
    options_en: ['Break it into smaller parts', 'Search for similar solutions', 'Draw a diagram or design', 'Consult experts', 'Try different solutions quickly'],
    category: 'problem_solving',
    tracks: { ai: 0, web: 0, cyber: 0, design: 0, business: 0 },
    track_mapping: {
      0: { ai: 4, cyber: 3 },
      1: { web: 4 },
      2: { design: 4, ai: 2 },
      3: { business: 3 },
      4: { web: 3, design: 2 }
    }
  }
];

export const BANK_HS = [
  // High school students - simpler, more exploratory questions
  {
    id: 'fav_subject',
    q_ar: 'ما المادة الدراسية المفضلة لديك؟',
    q_en: 'What is your favorite school subject?',
    type: 'single',
    options_ar: ['الرياضيات', 'العلوم (فيزياء، كيمياء، أحياء)', 'اللغات والأدب', 'الفن والتصميم', 'التاريخ والجغرافيا', 'الحاسوب'],
    options_en: ['Mathematics', 'Sciences (Physics, Chemistry, Biology)', 'Languages & Literature', 'Art & Design', 'History & Geography', 'Computer Science'],
    category: 'academic_strength',
    tracks: { ai: 0, web: 0, design: 0, cyber: 0, business: 0 },
    track_mapping: {
      0: { ai: 4 },
      1: { ai: 3, cyber: 2 },
      2: { business: 2, design: 1 },
      3: { design: 5 },
      4: { business: 3 },
      5: { web: 4, ai: 3 }
    }
  },
  {
    id: 'tech_comfort',
    q_ar: 'ما مدى راحتك مع التكنولوجيا والحاسوب؟',
    q_en: 'How comfortable are you with technology and computers?',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'tech_interest',
    tracks: { ai: 0.8, web: 0.9, cyber: 0.8, design: 0.6, business: 0.4 }
  },
  {
    id: 'future_field',
    q_ar: 'ما المجال الجامعي الذي تميل إليه؟ (اختر كل ما ينطبق)',
    q_en: 'Which university field are you interested in? (Select all that apply)',
    type: 'multi',
    options_ar: ['الهندسة', 'الطب', 'علوم الحاسوب', 'إدارة الأعمال', 'الإعلام والفنون', 'العلوم الطبيعية'],
    options_en: ['Engineering', 'Medicine', 'Computer Science', 'Business Administration', 'Media & Arts', 'Natural Sciences'],
    category: 'interests',
    tracks: { ai: 0, web: 0, design: 0, cyber: 0, business: 0 },
    track_mapping: {
      0: { ai: 3, web: 2 },
      1: { ai: 2 },
      2: { ai: 4, web: 4, cyber: 4 },
      3: { business: 5 },
      4: { design: 5, business: 2 },
      5: { ai: 3 }
    }
  },
  {
    id: 'hobby_activities',
    q_ar: 'ما الأنشطة التي تستمتع بها في وقت فراغك؟ (اختر كل ما ينطبق)',
    q_en: 'What activities do you enjoy in your free time? (Select all that apply)',
    type: 'multi',
    options_ar: ['ألعاب الفيديو والتقنية', 'الرسم والتصميم', 'القراءة والتعلم', 'الرياضة والأنشطة البدنية', 'البرمجة وبناء المشاريع', 'النشاطات الاجتماعية'],
    options_en: ['Video games & tech', 'Drawing & design', 'Reading & learning', 'Sports & physical activities', 'Programming & building projects', 'Social activities'],
    category: 'hobbies',
    tracks: { ai: 0, web: 0, design: 0, cyber: 0, business: 0 },
    track_mapping: {
      0: { web: 3, ai: 2 },
      1: { design: 4 },
      2: { ai: 3, business: 2 },
      3: { business: 2 },
      4: { web: 5, ai: 4 },
      5: { business: 3 }
    }
  },
  {
    id: 'problem_solving_style',
    q_ar: 'عندما تواجه مشكلة، كيف تتعامل معها؟',
    q_en: 'When you face a problem, how do you deal with it?',
    type: 'single',
    options_ar: ['أبحث عن الحل على الإنترنت', 'أحاول حلها بنفسي', 'أطلب المساعدة من الآخرين', 'أفكر بطريقة إبداعية', 'أتبع خطوات منظمة'],
    options_en: ['Search for solution online', 'Try to solve it myself', 'Ask others for help', 'Think creatively', 'Follow organized steps'],
    category: 'problem_solving',
    tracks: { ai: 0, web: 0, design: 0, cyber: 0, business: 0 },
    track_mapping: {
      0: { web: 3, ai: 2 },
      1: { cyber: 3, web: 3 },
      2: { business: 3 },
      3: { design: 4, ai: 2 },
      4: { cyber: 3, business: 2 }
    }
  },
  {
    id: 'work_preference',
    q_ar: 'هل تفضل العمل الفردي أم الجماعي؟',
    q_en: 'Do you prefer individual or team work?',
    type: 'scale',
    min: 1,
    max: 5,
    category: 'teamwork',
    tracks: { business: 0.8, design: 0.5, web: 0.4, ai: 0.3, cyber: 0.3 }
  },
  {
    id: 'learning_style',
    q_ar: 'كيف تتعلم بشكل أفضل؟',
    q_en: 'How do you learn best?',
    type: 'single',
    options_ar: ['بالمشاهدة (فيديوهات)', 'بالقراءة (كتب، مقالات)', 'بالممارسة (تطبيق عملي)', 'بالاستماع (محاضرات)', 'بالتجربة والخطأ'],
    options_en: ['By watching (videos)', 'By reading (books, articles)', 'By practicing (hands-on)', 'By listening (lectures)', 'By trial and error'],
    category: 'learning_style',
    tracks: { ai: 0, web: 0, design: 0, cyber: 0, business: 0 },
    track_mapping: {
      0: { web: 3, design: 3 },
      1: { ai: 4, business: 3 },
      2: { web: 4, cyber: 3 },
      3: { business: 3, ai: 2 },
      4: { design: 3, web: 3 }
    }
  }
];
