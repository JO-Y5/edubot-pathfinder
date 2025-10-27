export const BANK_UNI = [
  {
    id: 'uni_q1',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى رضاك عن تخصصك الحالي؟',
    q_en: 'How satisfied are you with your current major?'
  },
  {
    id: 'uni_q2',
    type: 'single',
    q_ar: 'ما هو هدفك الأساسي بعد التخرج؟',
    q_en: 'What is your main goal after graduation?',
    options_ar: ['العمل مباشرة', 'الدراسات العليا', 'ريادة الأعمال', 'لا أعرف'],
    options_en: ['Work immediately', 'Graduate studies', 'Entrepreneurship', 'Not sure']
  },
  {
    id: 'uni_q3',
    type: 'multi',
    q_ar: 'ما هي المهارات التي تريد تطويرها؟',
    q_en: 'Which skills do you want to develop?',
    options_ar: ['البرمجة', 'التصميم', 'التحليل', 'الإدارة', 'التسويق', 'التواصل'],
    options_en: ['Programming', 'Design', 'Analysis', 'Management', 'Marketing', 'Communication']
  },
  {
    id: 'uni_q4',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى استعدادك لسوق العمل؟',
    q_en: 'How ready are you for the job market?'
  },
  {
    id: 'uni_q5',
    type: 'single',
    q_ar: 'ما هو أسلوب التعلم المفضل لديك؟',
    q_en: 'What is your preferred learning style?',
    options_ar: ['عملي', 'نظري', 'مشاريع', 'تفاعلي'],
    options_en: ['Practical', 'Theoretical', 'Projects', 'Interactive']
  }
];

export const BANK_HS = [
  {
    id: 'hs_q1',
    type: 'single',
    q_ar: 'ما هو مجال اهتمامك الأكبر؟',
    q_en: 'What is your main area of interest?',
    options_ar: ['العلوم', 'الهندسة', 'الطب', 'الأدب', 'الأعمال', 'الفنون'],
    options_en: ['Science', 'Engineering', 'Medicine', 'Literature', 'Business', 'Arts']
  },
  {
    id: 'hs_q2',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى معرفتك بالتخصصات الجامعية المتاحة؟',
    q_en: 'How familiar are you with available university majors?'
  },
  {
    id: 'hs_q3',
    type: 'multi',
    q_ar: 'ما هي المواد الدراسية التي تتفوق فيها؟',
    q_en: 'Which subjects do you excel in?',
    options_ar: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'اللغات', 'التاريخ'],
    options_en: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Languages', 'History']
  },
  {
    id: 'hs_q4',
    type: 'single',
    q_ar: 'ما هو أهم عامل في اختيار التخصص الجامعي؟',
    q_en: 'What is the most important factor in choosing a major?',
    options_ar: ['الشغف', 'فرص العمل', 'الراتب', 'سهولة الدراسة'],
    options_en: ['Passion', 'Job opportunities', 'Salary', 'Study ease']
  },
  {
    id: 'hs_q5',
    type: 'scale',
    min: 1,
    max: 5,
    q_ar: 'ما مدى ثقتك في قرارك المهني المستقبلي؟',
    q_en: 'How confident are you in your future career decision?'
  }
];
