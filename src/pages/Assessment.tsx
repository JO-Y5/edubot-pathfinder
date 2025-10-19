import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { TRACKS, SKILL_MAP } from "@/data/tracks";
import { toast } from "sonner";

const QUESTIONS = {
  skills: [
    { id: "problem-solving", label: "Problem Solving", skill: "Problem Solving" },
    { id: "analytical", label: "Analytical Thinking", skill: "Analytical Thinking" },
    { id: "creative", label: "Creative Thinking", skill: "Creative Thinking" },
    { id: "communication", label: "Communication", skill: "Communication" },
    { id: "leadership", label: "Leadership", skill: "Leadership" },
    { id: "mathematics", label: "Mathematics", skill: "Mathematics" },
  ],
  interests: [
    { id: "ai-ml", label: "AI & Machine Learning", tracks: ["ai"] },
    { id: "web-dev", label: "Web Development", tracks: ["web"] },
    { id: "security", label: "Cybersecurity", tracks: ["cyber"] },
    { id: "design", label: "Design & User Experience", tracks: ["design"] },
    { id: "business", label: "Business & Management", tracks: ["business"] },
  ],
  goals: [
    { id: "research", label: "Research & Innovation", tracks: ["ai", "cyber"] },
    { id: "build", label: "Build & Create Products", tracks: ["web", "design"] },
    { id: "protect", label: "Protect & Secure Systems", tracks: ["cyber"] },
    { id: "design-exp", label: "Design Experiences", tracks: ["design"] },
    { id: "lead", label: "Lead & Manage Teams", tracks: ["business"] },
  ]
};

const Assessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<{
    skills: string[];
    interests: string[];
    goals: string[];
  }>({
    skills: [],
    interests: [],
    goals: []
  });

  const steps = ["Skills", "Interests", "Goals"];
  const progress = ((step + 1) / steps.length) * 100;

  const handleSelect = (category: "skills" | "interests" | "goals", id: string) => {
    setSelections((prev) => {
      const current = prev[category];
      if (current.includes(id)) {
        return { ...prev, [category]: current.filter((item) => item !== id) };
      } else {
        return { ...prev, [category]: [...current, id] };
      }
    });
  };

  const handleNext = () => {
    const currentCategory = ["skills", "interests", "goals"][step] as keyof typeof selections;
    if (selections[currentCategory].length === 0) {
      toast.error(`Please select at least one ${steps[step].toLowerCase()}`);
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {
      ai: 0,
      web: 0,
      cyber: 0,
      design: 0,
      business: 0
    };

    // Calculate from skills
    selections.skills.forEach((skillId) => {
      const question = QUESTIONS.skills.find((q) => q.id === skillId);
      if (question && SKILL_MAP[question.skill]) {
        SKILL_MAP[question.skill].forEach((track) => {
          scores[track] += 2;
        });
      }
    });

    // Calculate from interests
    selections.interests.forEach((interestId) => {
      const question = QUESTIONS.interests.find((q) => q.id === interestId);
      if (question) {
        question.tracks.forEach((track) => {
          scores[track] += 3;
        });
      }
    });

    // Calculate from goals
    selections.goals.forEach((goalId) => {
      const question = QUESTIONS.goals.find((q) => q.id === goalId);
      if (question) {
        question.tracks.forEach((track) => {
          scores[track] += 2;
        });
      }
    });

    // Get top 2 tracks
    const sortedTracks = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([track]) => track);

    const primaryTrack = sortedTracks[0];
    const secondaryTrack = sortedTracks[1];

    // Save results
    const results = {
      primaryTrack,
      secondaryTrack,
      selectedSkills: selections.skills,
      completedCourses: [],
      progress: 0,
      lastVisit: new Date().toISOString()
    };

    localStorage.setItem("eduMentorResults", JSON.stringify(results));
    toast.success("Assessment completed! Redirecting to your dashboard...");
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const currentQuestions =
    step === 0
      ? QUESTIONS.skills
      : step === 1
      ? QUESTIONS.interests
      : QUESTIONS.goals;

  const currentCategory = ["skills", "interests", "goals"][step] as keyof typeof selections;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Career Assessment</h1>
          <p className="text-muted-foreground">
            Step {step + 1} of {steps.length}: {steps[step]}
          </p>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <Card className="p-8 glass border-border animate-slide-up">
          <h2 className="text-2xl font-semibold mb-6">
            {step === 0 && "Select your top skills"}
            {step === 1 && "What interests you most?"}
            {step === 2 && "What are your career goals?"}
          </h2>

          <div className="grid gap-4 mb-8">
            {currentQuestions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => handleSelect(currentCategory, question.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left hover:scale-[1.02] ${
                  selections[currentCategory].includes(question.id)
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border glass hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{question.label}</span>
                  {selections[currentCategory].includes(question.id) && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="border-border"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-primary shadow-glow"
            >
              {step === steps.length - 1 ? "Complete Assessment" : "Next"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
