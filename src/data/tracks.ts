export interface Track {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: string[];
  roles: string[];
  certificates: string[];
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export const TRACKS: Record<string, Track> = {
  ai: {
    id: "ai",
    name: "AI & Data Science",
    description: "Master artificial intelligence, machine learning, and data analytics to solve complex problems and build intelligent systems.",
    icon: "🤖",
    skills: ["Problem Solving", "Analytical Thinking", "Mathematics", "Programming"],
    roles: ["Data Scientist", "ML Engineer", "AI Researcher", "Data Analyst", "Business Intelligence Analyst"],
    certificates: ["Google Data Analytics", "AWS Machine Learning", "IBM Data Science", "TensorFlow Developer"],
    courses: [
      {
        id: "python-basics",
        title: "Python Programming Fundamentals",
        description: "Learn Python syntax, data structures, and basic algorithms",
        duration: "4 weeks"
      },
      {
        id: "data-analysis",
        title: "Data Analysis with Pandas & NumPy",
        description: "Master data manipulation and analysis techniques",
        duration: "3 weeks"
      },
      {
        id: "ml-intro",
        title: "Introduction to Machine Learning",
        description: "Understand ML concepts, algorithms, and model training",
        duration: "6 weeks"
      }
    ]
  },
  web: {
    id: "web",
    name: "Web Development",
    description: "Build modern, responsive web applications using the latest technologies and frameworks.",
    icon: "💻",
    skills: ["Creative Thinking", "Problem Solving", "Attention to Detail", "Logical Thinking"],
    roles: ["Frontend Developer", "Full-Stack Developer", "Web Designer", "UI Developer", "JavaScript Engineer"],
    certificates: ["Meta Frontend Developer", "Google UX Design", "AWS Cloud Practitioner", "React Developer"],
    courses: [
      {
        id: "html-css",
        title: "HTML & CSS Fundamentals",
        description: "Build the foundation of web development",
        duration: "3 weeks"
      },
      {
        id: "javascript",
        title: "JavaScript & Modern ES6+",
        description: "Master JavaScript and modern programming patterns",
        duration: "5 weeks"
      },
      {
        id: "react",
        title: "React & Frontend Frameworks",
        description: "Build interactive UIs with React and modern tools",
        duration: "6 weeks"
      }
    ]
  },
  cyber: {
    id: "cyber",
    name: "Cybersecurity",
    description: "Protect systems and networks from digital threats through ethical hacking and security analysis.",
    icon: "🔒",
    skills: ["Analytical Thinking", "Problem Solving", "Attention to Detail", "Curiosity"],
    roles: ["Security Analyst", "Penetration Tester", "Security Engineer", "Ethical Hacker", "SOC Analyst"],
    certificates: ["CompTIA Security+", "CEH", "CISSP", "Google Cybersecurity"],
    courses: [
      {
        id: "network-basics",
        title: "Networking Fundamentals",
        description: "Understand network protocols, architecture, and security",
        duration: "4 weeks"
      },
      {
        id: "security-basics",
        title: "Cybersecurity Basics & Threat Analysis",
        description: "Learn about common threats and protection methods",
        duration: "4 weeks"
      },
      {
        id: "ethical-hacking",
        title: "Ethical Hacking & Penetration Testing",
        description: "Master offensive security techniques",
        duration: "8 weeks"
      }
    ]
  },
  design: {
    id: "design",
    name: "Design & UX",
    description: "Create beautiful, user-centered designs that solve real problems and delight users.",
    icon: "🎨",
    skills: ["Creative Thinking", "Empathy", "Visual Communication", "Problem Solving"],
    roles: ["UX Designer", "UI Designer", "Product Designer", "Visual Designer", "Design Researcher"],
    certificates: ["Google UX Design", "Adobe Certified Professional", "Figma Design", "Nielsen Norman Group UX"],
    courses: [
      {
        id: "figma-basics",
        title: "Figma & Design Tools",
        description: "Master professional design tools and workflows",
        duration: "3 weeks"
      },
      {
        id: "ux-research",
        title: "UX Research & User Psychology",
        description: "Understand user behavior and research methods",
        duration: "4 weeks"
      },
      {
        id: "ui-design",
        title: "UI Design & Visual Systems",
        description: "Create beautiful and consistent interfaces",
        duration: "5 weeks"
      }
    ]
  },
  business: {
    id: "business",
    name: "Business Management",
    description: "Lead teams, manage projects, and drive business growth through strategic thinking and leadership.",
    icon: "💼",
    skills: ["Leadership", "Communication", "Strategic Thinking", "Organization"],
    roles: ["Product Manager", "Business Analyst", "Project Manager", "Marketing Manager", "Operations Manager"],
    certificates: ["PMP", "Google Project Management", "MBA Essentials", "Agile Scrum Master"],
    courses: [
      {
        id: "project-mgmt",
        title: "Project Management Fundamentals",
        description: "Learn to plan, execute, and deliver projects",
        duration: "4 weeks"
      },
      {
        id: "marketing",
        title: "Digital Marketing & Strategy",
        description: "Master marketing principles and digital channels",
        duration: "5 weeks"
      },
      {
        id: "leadership",
        title: "Leadership & Team Management",
        description: "Develop leadership skills and team dynamics",
        duration: "4 weeks"
      }
    ]
  }
};

export const SKILL_MAP: Record<string, string[]> = {
  "Problem Solving": ["ai", "web", "cyber"],
  "Analytical Thinking": ["ai", "cyber"],
  "Creative Thinking": ["web", "design"],
  "Communication": ["business", "design"],
  "Leadership": ["business"],
  "Mathematics": ["ai"],
  "Programming": ["ai", "web", "cyber"],
  "Attention to Detail": ["web", "cyber", "design"],
  "Logical Thinking": ["ai", "web", "cyber"],
  "Empathy": ["design", "business"],
  "Visual Communication": ["design"],
  "Strategic Thinking": ["business"],
  "Organization": ["business"],
  "Curiosity": ["ai", "cyber"]
};

export const ACHIEVEMENTS = [
  {
    id: "first-step",
    name: "First Step",
    description: "Complete your first course",
    icon: "📗",
    requirement: "complete_1_course"
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Log in for 3 consecutive days",
    icon: "⏱️",
    requirement: "3_day_streak"
  },
  {
    id: "ai-learner",
    name: "AI Learner",
    description: "Complete the AI & Data Science track",
    icon: "🤖",
    requirement: "complete_ai_track"
  },
  {
    id: "web-developer",
    name: "Web Developer",
    description: "Complete the Web Development track",
    icon: "💻",
    requirement: "complete_web_track"
  },
  {
    id: "cyber-defender",
    name: "Cyber Defender",
    description: "Complete the Cybersecurity track",
    icon: "🔒",
    requirement: "complete_cyber_track"
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Complete the Design & UX track",
    icon: "🎨",
    requirement: "complete_design_track"
  },
  {
    id: "business-leader",
    name: "Business Leader",
    description: "Complete the Business Management track",
    icon: "💼",
    requirement: "complete_business_track"
  },
  {
    id: "half-way",
    name: "Half Way There",
    description: "Complete 50% of your learning plan",
    icon: "🎯",
    requirement: "50_percent_complete"
  },
  {
    id: "completion-master",
    name: "Completion Master",
    description: "Complete 100% of your learning plan",
    icon: "🏆",
    requirement: "100_percent_complete"
  }
];
