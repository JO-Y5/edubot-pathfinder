export const BANK_UNI = [
  // Part 1: Current Satisfaction & Goals (5 questions)
  {
    id: 'uni_q1',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى رضاك عن تخصصك الحالي؟',
    q_en: 'How satisfied are you with your current major?',
    category: 'satisfaction'
  },
  {
    id: 'uni_q2',
    type: 'single',
    q_ar: 'ما هو هدفك الأساسي بعد التخرج؟',
    q_en: 'What is your main goal after graduation?',
    options_ar: ['العمل مباشرة', 'الدراسات العليا', 'ريادة الأعمال', 'لا أعرف'],
    options_en: ['Work immediately', 'Graduate studies', 'Entrepreneurship', 'Not sure'],
    category: 'goals'
  },
  {
    id: 'uni_q3',
    type: 'multi',
    q_ar: 'ما هي المهارات التي تريد تطويرها؟',
    q_en: 'Which skills do you want to develop?',
    options_ar: ['البرمجة', 'التصميم', 'التحليل', 'الإدارة', 'التسويق', 'التواصل'],
    options_en: ['Programming', 'Design', 'Analysis', 'Management', 'Marketing', 'Communication'],
    category: 'skills'
  },
  {
    id: 'uni_q4',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى استعدادك لسوق العمل؟',
    q_en: 'How ready are you for the job market?',
    category: 'readiness'
  },
  {
    id: 'uni_q5',
    type: 'single',
    q_ar: 'ما هو أسلوب التعلم المفضل لديك؟',
    q_en: 'What is your preferred learning style?',
    options_ar: ['عملي', 'نظري', 'مشاريع', 'تفاعلي'],
    options_en: ['Practical', 'Theoretical', 'Projects', 'Interactive'],
    category: 'learning'
  },
  
  // Part 2: Work Preferences (5 questions)
  {
    id: 'uni_q6',
    type: 'single',
    q_ar: 'ما هو نوع بيئة العمل المفضلة لديك؟',
    q_en: 'What type of work environment do you prefer?',
    options_ar: ['مكتبي', 'ميداني', 'هجين', 'عن بعد'],
    options_en: ['Office', 'Field', 'Hybrid', 'Remote'],
    category: 'work_env'
  },
  {
    id: 'uni_q7',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى راحتك في العمل ضمن فريق؟',
    q_en: 'How comfortable are you working in a team?',
    category: 'teamwork'
  },
  {
    id: 'uni_q8',
    type: 'multi',
    q_ar: 'ما هي القطاعات التي تهمك؟',
    q_en: 'Which sectors interest you?',
    options_ar: ['التقنية', 'الصحة', 'التعليم', 'المالية', 'الصناعة', 'الخدمات'],
    options_en: ['Technology', 'Healthcare', 'Education', 'Finance', 'Industry', 'Services'],
    category: 'sectors'
  },
  {
    id: 'uni_q9',
    type: 'single',
    q_ar: 'ما أهمية الراتب بالنسبة لك؟',
    q_en: 'How important is salary to you?',
    options_ar: ['الأولوية القصوى', 'مهم جداً', 'متوسط الأهمية', 'غير مهم'],
    options_en: ['Top priority', 'Very important', 'Moderately important', 'Not important'],
    category: 'priorities'
  },
  {
    id: 'uni_q10',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى رغبتك في تحمل المسؤولية القيادية؟',
    q_en: 'How willing are you to take on leadership responsibility?',
    category: 'leadership'
  },

  // Part 3: Personality & Strengths (5 questions)
  {
    id: 'uni_q11',
    type: 'single',
    q_ar: 'كيف تصف أسلوب حل المشكلات لديك؟',
    q_en: 'How would you describe your problem-solving style?',
    options_ar: ['تحليلي منطقي', 'إبداعي مبتكر', 'عملي واقعي', 'تعاوني استشاري'],
    options_en: ['Analytical logical', 'Creative innovative', 'Practical realistic', 'Collaborative consultative'],
    category: 'problem_solving'
  },
  {
    id: 'uni_q12',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى راحتك في التعامل مع التغيير المستمر؟',
    q_en: 'How comfortable are you with constant change?',
    category: 'adaptability'
  },
  {
    id: 'uni_q13',
    type: 'multi',
    q_ar: 'ما هي نقاط قوتك الأساسية؟',
    q_en: 'What are your main strengths?',
    options_ar: ['التفكير التحليلي', 'الإبداع', 'التواصل', 'التنظيم', 'التحفيز الذاتي', 'حل المشكلات'],
    options_en: ['Analytical thinking', 'Creativity', 'Communication', 'Organization', 'Self-motivation', 'Problem solving'],
    category: 'strengths'
  },
  {
    id: 'uni_q14',
    type: 'single',
    q_ar: 'ما هو أسلوب اتخاذ القرارات المفضل لديك؟',
    q_en: 'What is your preferred decision-making style?',
    options_ar: ['سريع وحاسم', 'مدروس ومتأني', 'قائم على البيانات', 'استشاري وتعاوني'],
    options_en: ['Quick and decisive', 'Deliberate and careful', 'Data-driven', 'Consultative and collaborative'],
    category: 'decision_making'
  },
  {
    id: 'uni_q15',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى راحتك في تقديم العروض والتحدث أمام الجمهور؟',
    q_en: 'How comfortable are you with presentations and public speaking?',
    category: 'presentation'
  },

  // Part 4: Learning & Development (5 questions)
  {
    id: 'uni_q16',
    type: 'multi',
    q_ar: 'ما هي المواضيع التي تستمتع بتعلمها؟',
    q_en: 'What topics do you enjoy learning about?',
    options_ar: ['التكنولوجيا الحديثة', 'الأعمال والإدارة', 'العلوم والبحث', 'الفنون والتصميم', 'العلوم الإنسانية', 'الرياضة والصحة'],
    options_en: ['Modern technology', 'Business and management', 'Science and research', 'Arts and design', 'Humanities', 'Sports and health'],
    category: 'interests'
  },
  {
    id: 'uni_q17',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى حماسك للتعلم المستمر وتطوير المهارات؟',
    q_en: 'How enthusiastic are you about continuous learning and skill development?',
    category: 'learning_motivation'
  },
  {
    id: 'uni_q18',
    type: 'single',
    q_ar: 'كم من الوقت تخصص أسبوعياً للتطوير الذاتي؟',
    q_en: 'How much time do you dedicate weekly to self-development?',
    options_ar: ['أقل من ساعة', '1-3 ساعات', '4-7 ساعات', 'أكثر من 7 ساعات'],
    options_en: ['Less than 1 hour', '1-3 hours', '4-7 hours', 'More than 7 hours'],
    category: 'time_investment'
  },
  {
    id: 'uni_q19',
    type: 'multi',
    q_ar: 'ما هي الشهادات أو المهارات التي تفكر في اكتسابها؟',
    q_en: 'What certifications or skills are you considering acquiring?',
    options_ar: ['شهادات تقنية', 'شهادات إدارية', 'لغات أجنبية', 'مهارات ناعمة', 'تخصصات أكاديمية', 'مهارات حرفية'],
    options_en: ['Technical certifications', 'Management certifications', 'Foreign languages', 'Soft skills', 'Academic specializations', 'Craft skills'],
    category: 'future_skills'
  },
  {
    id: 'uni_q20',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى معرفتك بالفرص المهنية في مجالك؟',
    q_en: 'How aware are you of career opportunities in your field?',
    category: 'market_awareness'
  },

  // Part 5: Values & Aspirations (5 questions)
  {
    id: 'uni_q21',
    type: 'single',
    q_ar: 'ما هو أهم شيء تبحث عنه في مسيرتك المهنية؟',
    q_en: 'What is the most important thing you seek in your career?',
    options_ar: ['الأمان الوظيفي', 'النمو والتطور', 'التأثير الاجتماعي', 'الحرية والاستقلالية'],
    options_en: ['Job security', 'Growth and development', 'Social impact', 'Freedom and autonomy'],
    category: 'career_values'
  },
  {
    id: 'uni_q22',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى أهمية التوازن بين العمل والحياة الشخصية؟',
    q_en: 'How important is work-life balance to you?',
    category: 'work_life_balance'
  },
  {
    id: 'uni_q23',
    type: 'multi',
    q_ar: 'ما هي العوامل التي تحفزك في العمل؟',
    q_en: 'What factors motivate you at work?',
    options_ar: ['التحديات', 'التقدير والمكافآت', 'التطور المهني', 'بيئة العمل', 'التأثير الإيجابي', 'الاستقلالية'],
    options_en: ['Challenges', 'Recognition and rewards', 'Career advancement', 'Work environment', 'Positive impact', 'Autonomy'],
    category: 'motivators'
  },
  {
    id: 'uni_q24',
    type: 'single',
    q_ar: 'أين ترى نفسك بعد 5 سنوات؟',
    q_en: 'Where do you see yourself in 5 years?',
    options_ar: ['في منصب قيادي', 'خبير متخصص', 'رائد أعمال', 'باحث أو أكاديمي'],
    options_en: ['In a leadership position', 'Specialized expert', 'Entrepreneur', 'Researcher or academic'],
    category: 'future_vision'
  },
  {
    id: 'uni_q25',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى استعدادك للانتقال أو السفر من أجل العمل؟',
    q_en: 'How willing are you to relocate or travel for work?',
    category: 'mobility'
  }
];

export const BANK_HS = [
  // Part 1: Interests & Abilities (5 questions)
  {
    id: 'hs_q1',
    type: 'single',
    q_ar: 'ما هو مجال اهتمامك الأكبر؟',
    q_en: 'What is your main area of interest?',
    options_ar: ['العلوم', 'الهندسة', 'الطب', 'الأدب', 'الأعمال', 'الفنون'],
    options_en: ['Science', 'Engineering', 'Medicine', 'Literature', 'Business', 'Arts'],
    category: 'interests'
  },
  {
    id: 'hs_q2',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى معرفتك بالتخصصات الجامعية المتاحة؟',
    q_en: 'How familiar are you with available university majors?',
    category: 'awareness'
  },
  {
    id: 'hs_q3',
    type: 'multi',
    q_ar: 'ما هي المواد الدراسية التي تتفوق فيها؟',
    q_en: 'Which subjects do you excel in?',
    options_ar: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغات', 'التاريخ'],
    options_en: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Languages', 'History'],
    category: 'academic_strength'
  },
  {
    id: 'hs_q4',
    type: 'single',
    q_ar: 'ما هو أهم عامل في اختيار التخصص الجامعي؟',
    q_en: 'What is the most important factor in choosing a major?',
    options_ar: ['الشغف', 'فرص العمل', 'الراتب', 'سهولة الدراسة'],
    options_en: ['Passion', 'Job opportunities', 'Salary', 'Study ease'],
    category: 'priorities'
  },
  {
    id: 'hs_q5',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى ثقتك في قرارك المهني المستقبلي؟',
    q_en: 'How confident are you in your future career decision?',
    category: 'confidence'
  },

  // Part 2: Skills & Hobbies (5 questions)
  {
    id: 'hs_q6',
    type: 'multi',
    q_ar: 'ما هي الأنشطة التي تستمتع بها في وقت فراغك؟',
    q_en: 'What activities do you enjoy in your free time?',
    options_ar: ['القراءة والكتابة', 'الرياضة', 'البرمجة والتقنية', 'الفنون والرسم', 'التطوع', 'الموسيقى'],
    options_en: ['Reading and writing', 'Sports', 'Programming and tech', 'Arts and drawing', 'Volunteering', 'Music'],
    category: 'hobbies'
  },
  {
    id: 'hs_q7',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى مهارتك في حل المسائل الرياضية والمنطقية؟',
    q_en: 'How skilled are you at solving mathematical and logical problems?',
    category: 'logical_thinking'
  },
  {
    id: 'hs_q8',
    type: 'single',
    q_ar: 'كيف تفضل التعلم؟',
    q_en: 'How do you prefer to learn?',
    options_ar: ['القراءة والاطلاع', 'التجربة العملية', 'مشاهدة الفيديوهات', 'النقاش والحوار'],
    options_en: ['Reading and research', 'Hands-on practice', 'Watching videos', 'Discussion and dialogue'],
    category: 'learning_style'
  },
  {
    id: 'hs_q9',
    type: 'multi',
    q_ar: 'ما هي المهارات التي تعتبر نفسك جيداً فيها؟',
    q_en: 'What skills do you consider yourself good at?',
    options_ar: ['التواصل', 'التفكير النقدي', 'الإبداع', 'القيادة', 'التنظيم', 'العمل الجماعي'],
    options_en: ['Communication', 'Critical thinking', 'Creativity', 'Leadership', 'Organization', 'Teamwork'],
    category: 'soft_skills'
  },
  {
    id: 'hs_q10',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى اهتمامك بالتكنولوجيا والابتكار؟',
    q_en: 'How interested are you in technology and innovation?',
    category: 'tech_interest'
  },

  // Part 3: Career Aspirations (5 questions)
  {
    id: 'hs_q11',
    type: 'single',
    q_ar: 'ما هو نوع المهنة التي تحلم بها؟',
    q_en: 'What type of profession do you dream of?',
    options_ar: ['مهنة إبداعية', 'مهنة تقنية', 'مهنة طبية', 'مهنة إدارية', 'مهنة تعليمية', 'مهنة حرة'],
    options_en: ['Creative profession', 'Technical profession', 'Medical profession', 'Administrative profession', 'Educational profession', 'Freelance profession'],
    category: 'career_type'
  },
  {
    id: 'hs_q12',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى رغبتك في دراسة تخصص يتطلب سنوات دراسة طويلة؟',
    q_en: 'How willing are you to study a major that requires many years?',
    category: 'commitment'
  },
  {
    id: 'hs_q13',
    type: 'multi',
    q_ar: 'ما هي القطاعات المهنية التي تجذبك؟',
    q_en: 'Which professional sectors attract you?',
    options_ar: ['الصحة والطب', 'التقنية والبرمجة', 'الأعمال والمال', 'التعليم والبحث', 'الإعلام والفنون', 'الهندسة والبناء'],
    options_en: ['Health and medicine', 'Technology and programming', 'Business and finance', 'Education and research', 'Media and arts', 'Engineering and construction'],
    category: 'sectors'
  },
  {
    id: 'hs_q14',
    type: 'single',
    q_ar: 'ما مدى أهمية الأمان الوظيفي بالنسبة لك؟',
    q_en: 'How important is job security to you?',
    options_ar: ['الأولوية القصوى', 'مهم جداً', 'متوسط الأهمية', 'غير مهم'],
    options_en: ['Top priority', 'Very important', 'Moderately important', 'Not important'],
    category: 'job_security'
  },
  {
    id: 'hs_q15',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى رغبتك في ريادة الأعمال والعمل الحر؟',
    q_en: 'How interested are you in entrepreneurship and freelancing?',
    category: 'entrepreneurship'
  },

  // Part 4: Personality & Values (5 questions)
  {
    id: 'hs_q16',
    type: 'single',
    q_ar: 'أي من هذه الصفات تصفك بشكل أفضل؟',
    q_en: 'Which of these traits best describes you?',
    options_ar: ['تحليلي ومنطقي', 'إبداعي وفني', 'عملي ومنظم', 'اجتماعي ومتواصل'],
    options_en: ['Analytical and logical', 'Creative and artistic', 'Practical and organized', 'Social and communicative'],
    category: 'personality'
  },
  {
    id: 'hs_q17',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى راحتك في العمل ضمن فريق؟',
    q_en: 'How comfortable are you working in a team?',
    category: 'teamwork'
  },
  {
    id: 'hs_q18',
    type: 'multi',
    q_ar: 'ما هي القيم الأكثر أهمية بالنسبة لك؟',
    q_en: 'What values are most important to you?',
    options_ar: ['مساعدة الآخرين', 'الإنجاز والنجاح', 'الإبداع والابتكار', 'الاستقرار المالي', 'التعلم المستمر', 'التأثير الاجتماعي'],
    options_en: ['Helping others', 'Achievement and success', 'Creativity and innovation', 'Financial stability', 'Continuous learning', 'Social impact'],
    category: 'values'
  },
  {
    id: 'hs_q19',
    type: 'single',
    q_ar: 'كيف تتعامل مع التحديات والصعوبات؟',
    q_en: 'How do you handle challenges and difficulties?',
    options_ar: ['أواجهها مباشرة', 'أفكر وأخطط', 'أطلب المساعدة', 'أتجنبها أحياناً'],
    options_en: ['Face them directly', 'Think and plan', 'Seek help', 'Sometimes avoid them'],
    category: 'resilience'
  },
  {
    id: 'hs_q20',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى انفتاحك على تجربة مجالات جديدة غير متوقعة؟',
    q_en: 'How open are you to exploring unexpected new fields?',
    category: 'openness'
  },

  // Part 5: Planning & Future (5 questions)
  {
    id: 'hs_q21',
    type: 'single',
    q_ar: 'هل لديك خطة واضحة للجامعة والتخصص؟',
    q_en: 'Do you have a clear plan for university and major?',
    options_ar: ['نعم، خطة واضحة', 'لدي بعض الأفكار', 'ما زلت محتاراً', 'لا أعرف من أين أبدأ'],
    options_en: ['Yes, clear plan', 'I have some ideas', 'Still confused', 'Don\'t know where to start'],
    category: 'planning'
  },
  {
    id: 'hs_q22',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى تأثير رأي العائلة في قرارك الدراسي؟',
    q_en: 'How much does family opinion influence your academic decision?',
    category: 'family_influence'
  },
  {
    id: 'hs_q23',
    type: 'multi',
    q_ar: 'ما هي العوامل التي تأخذها في الاعتبار عند اختيار الجامعة؟',
    q_en: 'What factors do you consider when choosing a university?',
    options_ar: ['السمعة الأكاديمية', 'الموقع الجغرافي', 'التكلفة', 'الفرص الوظيفية', 'البيئة الجامعية', 'التخصصات المتاحة'],
    options_en: ['Academic reputation', 'Location', 'Cost', 'Job opportunities', 'Campus environment', 'Available majors'],
    category: 'university_factors'
  },
  {
    id: 'hs_q24',
    type: 'single',
    q_ar: 'متى تخطط للبدء في البحث الجدي عن التخصص المناسب؟',
    q_en: 'When do you plan to start seriously researching the right major?',
    options_ar: ['بدأت بالفعل', 'خلال الشهور القادمة', 'قبل نهاية الثانوية', 'لم أفكر بعد'],
    options_en: ['Already started', 'In the coming months', 'Before high school ends', 'Haven\'t thought about it yet'],
    category: 'timeline'
  },
  {
    id: 'hs_q25',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى استعدادك لبذل جهد إضافي لتحقيق أهدافك الأكاديمية؟',
    q_en: 'How ready are you to put in extra effort to achieve your academic goals?',
    category: 'dedication'
  }
];
