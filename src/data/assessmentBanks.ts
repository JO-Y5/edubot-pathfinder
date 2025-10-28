
export const BANK_UNI = [
  { id:'interest_major_fit', q_ar:'ما مدى انسجامك مع مقررات تخصصك الحالي؟', q_en:'How well do you fit your current major courses?', type:'scale', min:1, max:5 },
  { id:'study_time', q_ar:'كم ساعة دراسة أسبوعيًا فعليًا؟', q_en:'How many hours do you study weekly?', type:'scale', min:1, max:5 },
  { id:'career_goal', q_ar:'هدفك المهني الأقرب؟', q_en:'Closest career goal?', type:'single', options_ar:['أكاديمي','صناعي','ريادة أعمال','غير متأكد'], options_en:['Academia','Industry','Entrepreneurship','Not sure'] },
];
export const BANK_HS = [
  { id:'fav_subject', q_ar:'أكتر مادة بتحبها؟', q_en:'Which subject do you like most?', type:'single', options_ar:['رياضيات','علوم','لغات','تاريخ/جغرافيا','فن/تصميم'], options_en:['Math','Science','Languages','History/Geo','Art/Design'] },
  { id:'uni_interest', q_ar:'مجال الجامعة الذي تميل إليه؟', q_en:'Which university field are you into?', type:'multi', options_ar:['هندسة','طب','حاسبات','تجارة','إعلام','لسانيات'], options_en:['Engineering','Medicine','CS','Business','Media','Linguistics'] },
  { id:'study_style', q_ar:'تفضّل أي أسلوب تعلم؟', q_en:'Preferred learning style?', type:'single', options_ar:['فيديو','قراءة','مشاريع','مختبر'], options_en:['Video','Reading','Projects','Lab'] },
];
