import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ACHIEVEMENTS, TRACKS } from "@/data/tracks";
import { Trophy, Lock } from "lucide-react";

interface Results {
  primaryTrack: string;
  completedCourses: string[];
}

const Achievements = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("eduMentorResults");
    if (saved) {
      const data = JSON.parse(saved);
      setResults(data);
      checkAchievements(data);
    }
  }, []);

  const checkAchievements = (data: Results) => {
    const unlocked: string[] = [];
    const track = TRACKS[data.primaryTrack];
    const progress = (data.completedCourses.length / track.courses.length) * 100;

    // First Step
    if (data.completedCourses.length >= 1) {
      unlocked.push("first-step");
    }

    // Half Way
    if (progress >= 50) {
      unlocked.push("half-way");
    }

    // Completion Master
    if (progress === 100) {
      unlocked.push("completion-master");
    }

    // Track-specific achievements
    if (progress === 100) {
      if (data.primaryTrack === "ai") unlocked.push("ai-learner");
      if (data.primaryTrack === "web") unlocked.push("web-developer");
      if (data.primaryTrack === "cyber") unlocked.push("cyber-defender");
      if (data.primaryTrack === "design") unlocked.push("creative-designer");
      if (data.primaryTrack === "business") unlocked.push("business-leader");
    }

    setUnlockedAchievements(unlocked);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">Achievements</h1>
              <p className="text-muted-foreground">
                {unlockedAchievements.length} of {ACHIEVEMENTS.length} unlocked
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 glass border-border mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Overall Achievement Progress</span>
            <span className="text-2xl font-bold text-primary">
              {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{
                width: `${(unlockedAchievements.length / ACHIEVEMENTS.length) * 100}%`,
              }}
            />
          </div>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);

            return (
              <Card
                key={achievement.id}
                className={`p-6 glass border-border animate-slide-up transition-all hover:scale-105 ${
                  isUnlocked
                    ? "border-primary/30 shadow-glow"
                    : "opacity-60 grayscale"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div
                      className={`text-6xl ${
                        isUnlocked ? "animate-pulse-glow" : ""
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/80 rounded-full p-2">
                          <Lock className="w-6 h-6 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>

                  {isUnlocked && (
                    <div className="mt-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium inline-block">
                      Unlocked
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Motivation Card */}
        {unlockedAchievements.length < ACHIEVEMENTS.length && (
          <Card className="p-8 text-center glass border-border mt-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2">Keep Going!</h2>
            <p className="text-muted-foreground">
              Complete more courses to unlock additional achievements and showcase
              your progress!
            </p>
          </Card>
        )}

        {unlockedAchievements.length === ACHIEVEMENTS.length && (
          <Card className="p-8 text-center glass border-primary/30 mt-8 animate-fade-in">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="text-2xl font-bold mb-2">Achievement Master!</h2>
            <p className="text-muted-foreground">
              Incredible! You've unlocked all achievements. You're a true EduMentor+ champion!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Achievements;
