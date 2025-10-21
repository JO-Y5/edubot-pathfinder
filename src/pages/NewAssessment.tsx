import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ASSESSMENT_QUESTIONS } from "@/data/questions";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const SECTIONS = [
  { start: 0, end: 10, titleKey: "assessment.section1" },
  { start: 10, end: 17, titleKey: "assessment.section2" },
  { start: 17, end: 22, titleKey: "assessment.section3" },
  { start: 22, end: 25, titleKey: "assessment.section4" }
];

const NewAssessment = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const question = ASSESSMENT_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100;
  
  const currentSection = SECTIONS.find(
    (s) => currentQuestion >= s.start && currentQuestion < s.end
  );

  const handleAnswer = (value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = () => {
    if (!answers[question.id]) {
      toast.error(t("assessment.selectError"));
      return;
    }

    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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

    ASSESSMENT_QUESTIONS.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      let weight = 1;
      if (q.type === "scale") {
        weight = answer / 5; // Scale from 0-1
      }

      Object.entries(q.tracks).forEach(([track, points]) => {
        scores[track] += points * weight;
      });
    });

    const sortedTracks = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([track]) => track);

    const results = {
      primaryTrack: sortedTracks[0],
      secondaryTrack: sortedTracks[1],
      selectedSkills: [],
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

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">{t("assessment.title")}</h1>
          <p className="text-muted-foreground">
            {t("assessment.stepOf")} {currentQuestion + 1} {t("assessment.from")} {ASSESSMENT_QUESTIONS.length}
          </p>
          {currentSection && (
            <p className="text-primary font-medium mt-2">
              {t(currentSection.titleKey)}
            </p>
          )}
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <Card className="p-8 glass border-border animate-slide-up">
          <h2 className="text-2xl font-semibold mb-8">
            {t(question.textKey)}
          </h2>

          <div className="mb-12">
            {question.type === "scale" && (
              <div className="space-y-6">
                <Slider
                  value={[answers[question.id] || 3]}
                  onValueChange={(value) => handleAnswer(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{language === "ar" ? "ضعيف جدًا" : "Very Low"}</span>
                  <span>{language === "ar" ? "ضعيف" : "Low"}</span>
                  <span>{language === "ar" ? "متوسط" : "Medium"}</span>
                  <span>{language === "ar" ? "جيد" : "High"}</span>
                  <span>{language === "ar" ? "ممتاز" : "Very High"}</span>
                </div>
              </div>
            )}

            {question.type === "select" && question.options && (
              <RadioGroup
                value={answers[question.id]}
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 space-x-reverse">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="text-lg cursor-pointer flex-1 p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                    >
                      {t(option.labelKey)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "multiselect" && question.options && (
              <div className="space-y-4">
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 space-x-reverse">
                    <Checkbox
                      id={option.value}
                      checked={answers[question.id]?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const current = answers[question.id] || [];
                        if (checked) {
                          handleAnswer([...current, option.value]);
                        } else {
                          handleAnswer(current.filter((v: string) => v !== option.value));
                        }
                      }}
                    />
                    <Label
                      htmlFor={option.value}
                      className="text-lg cursor-pointer flex-1 p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                    >
                      {t(option.labelKey)}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-border"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t("assessment.previous")}
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-primary shadow-glow"
            >
              {currentQuestion === ASSESSMENT_QUESTIONS.length - 1
                ? t("assessment.complete")
                : t("assessment.next")}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewAssessment;
