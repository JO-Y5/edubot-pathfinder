export interface Question {
  id: string;
  textKey: string;
  type: "scale" | "select" | "multiselect";
  options?: { value: string; labelKey: string }[];
  tracks: Record<string, number>;
  skills?: string[];
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Section 1: Skills & Abilities (10 questions)
  {
    id: "q1",
    textKey: "q1",
    type: "scale",
    tracks: { ai: 3, web: 2, cyber: 3 },
    skills: ["Problem Solving"]
  },
  {
    id: "q2",
    textKey: "q2",
    type: "scale",
    tracks: { ai: 4, cyber: 2 },
    skills: ["Analytical Thinking"]
  },
  {
    id: "q3",
    textKey: "q3",
    type: "scale",
    tracks: { ai: 3, web: 4, cyber: 3 },
    skills: ["Programming"]
  },
  {
    id: "q4",
    textKey: "q4",
    type: "scale",
    tracks: { business: 3, design: 2 },
    skills: ["Communication"]
  },
  {
    id: "q5",
    textKey: "q5",
    type: "scale",
    tracks: { business: 4, design: 2 },
    skills: ["Communication", "Leadership"]
  },
  {
    id: "q6",
    textKey: "q6",
    type: "scale",
    tracks: { business: 4 },
    skills: ["Leadership", "Organization"]
  },
  {
    id: "q7",
    textKey: "q7",
    type: "select",
    options: [
      { value: "structured", labelKey: "answer.structured" },
      { value: "creative", labelKey: "answer.creative" }
    ],
    tracks: { ai: 1, web: 2, design: 3 }
  },
  {
    id: "q8",
    textKey: "q8",
    type: "scale",
    tracks: { ai: 4, cyber: 2 },
    skills: ["Analytical Thinking"]
  },
  {
    id: "q9",
    textKey: "q9",
    type: "scale",
    tracks: { web: 3, business: 2 },
    skills: ["Organization"]
  },
  {
    id: "q10",
    textKey: "q10",
    type: "scale",
    tracks: { cyber: 4, design: 2 },
    skills: ["Attention to Detail"]
  },
  
  // Section 2: Interests & Passions (7 questions)
  {
    id: "q11",
    textKey: "q11",
    type: "multiselect",
    options: [
      { value: "coding", labelKey: "answer.coding" },
      { value: "designing", labelKey: "answer.designing" },
      { value: "analyzing", labelKey: "answer.analyzing" },
      { value: "managing", labelKey: "answer.managing" },
      { value: "creating", labelKey: "answer.creating" }
    ],
    tracks: { ai: 3, web: 4, cyber: 2, design: 4, business: 3 }
  },
  {
    id: "q12",
    textKey: "q12",
    type: "select",
    options: [
      { value: "computers", labelKey: "answer.computers" },
      { value: "people", labelKey: "answer.people" },
      { value: "ideas", labelKey: "answer.ideas" }
    ],
    tracks: { ai: 3, web: 3, cyber: 3, design: 2, business: 2 }
  },
  {
    id: "q13",
    textKey: "q13",
    type: "scale",
    tracks: { web: 4, design: 3 }
  },
  {
    id: "q14",
    textKey: "q14",
    type: "scale",
    tracks: { ai: 2, business: 3 }
  },
  {
    id: "q15",
    textKey: "q15",
    type: "select",
    options: [
      { value: "logical", labelKey: "answer.logicalPuzzles" },
      { value: "creative", labelKey: "answer.brainstorming" }
    ],
    tracks: { ai: 3, cyber: 3, design: 2 }
  },
  {
    id: "q16",
    textKey: "q16",
    type: "select",
    options: [
      { value: "startups", labelKey: "answer.startups" },
      { value: "corporations", labelKey: "answer.corporations" },
      { value: "research", labelKey: "answer.researchLabs" }
    ],
    tracks: { ai: 2, web: 2, cyber: 2, design: 2, business: 3 }
  },
  {
    id: "q17",
    textKey: "q17",
    type: "select",
    options: [
      { value: "teamwork", labelKey: "answer.teamwork" },
      { value: "independent", labelKey: "answer.independent" }
    ],
    tracks: { business: 2, design: 1 }
  },
  
  // Section 3: Career Goals & Motivation (5 questions)
  {
    id: "q18",
    textKey: "q18",
    type: "select",
    options: [
      { value: "stability", labelKey: "answer.stability" },
      { value: "flexibility", labelKey: "answer.flexibility" }
    ],
    tracks: { business: 2, design: 2 }
  },
  {
    id: "q19",
    textKey: "q19",
    type: "select",
    options: [
      { value: "highPaying", labelKey: "answer.highPaying" },
      { value: "aligned", labelKey: "answer.alignedWithValues" }
    ],
    tracks: { ai: 2, business: 2 }
  },
  {
    id: "q20",
    textKey: "q20",
    type: "select",
    options: [
      { value: "recognition", labelKey: "answer.recognition" },
      { value: "growth", labelKey: "answer.personalGrowth" }
    ],
    tracks: { business: 2, design: 2 }
  },
  {
    id: "q21",
    textKey: "q21",
    type: "select",
    options: [
      { value: "innovation", labelKey: "answer.innovation" },
      { value: "helping", labelKey: "answer.helpingPeople" },
      { value: "managing", labelKey: "answer.managingTeams" }
    ],
    tracks: { ai: 3, design: 2, business: 3 }
  },
  {
    id: "q22",
    textKey: "q22",
    type: "scale",
    tracks: { business: 4 },
    skills: ["Leadership"]
  },
  
  // Section 4: Learning & Personal Development (3 questions)
  {
    id: "q23",
    textKey: "q23",
    type: "select",
    options: [
      { value: "handsOn", labelKey: "answer.handsOn" },
      { value: "videos", labelKey: "answer.videos" },
      { value: "reading", labelKey: "answer.reading" }
    ],
    tracks: { web: 2, design: 2 }
  },
  {
    id: "q24",
    textKey: "q24",
    type: "select",
    options: [
      { value: "1-3", labelKey: "answer.1to3hours" },
      { value: "4-7", labelKey: "answer.4to7hours" },
      { value: "8+", labelKey: "answer.8plus" }
    ],
    tracks: {}
  },
  {
    id: "q25",
    textKey: "q25",
    type: "multiselect",
    options: [
      { value: "research", labelKey: "answer.academicResearch" },
      { value: "business", labelKey: "answer.startBusiness" },
      { value: "tech", labelKey: "answer.techCompanies" },
      { value: "content", labelKey: "answer.digitalContent" },
      { value: "cyber", labelKey: "answer.cybersecurity" }
    ],
    tracks: { ai: 4, web: 3, cyber: 4, design: 3, business: 4 }
  }
];
