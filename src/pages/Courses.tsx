import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TRACKS } from "@/data/tracks";
import { toast } from "sonner";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";

interface Results {
  primaryTrack: string;
  completedCourses: string[];
}

const Courses = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("eduMentorResults");
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  const handleToggleCourse = (courseId: string) => {
    if (!results) return;

    const updated = { ...results };
    if (updated.completedCourses.includes(courseId)) {
      updated.completedCourses = updated.completedCourses.filter((id) => id !== courseId);
      toast.info("Course marked as incomplete");
    } else {
      updated.completedCourses.push(courseId);
      toast.success("Course completed! Keep up the great work! 🎉");
    }

    setResults(updated);
    localStorage.setItem("eduMentorResults", JSON.stringify(updated));
  };

  if (!results) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="p-12 text-center glass max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Assessment Results</h2>
          <p className="text-muted-foreground mb-6">
            Take the assessment first to see your personalized courses
          </p>
          <Button
            onClick={() => navigate("/assessment")}
            className="bg-gradient-primary shadow-glow"
          >
            Start Assessment
          </Button>
        </Card>
      </div>
    );
  }

  const track = TRACKS[results.primaryTrack];
  const completedCount = results.completedCourses.length;
  const totalCount = track.courses.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{track.icon}</span>
            <div>
              <h1 className="text-4xl font-bold">{track.name}</h1>
              <p className="text-muted-foreground">Learning Path</p>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="p-6 glass border-border mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Progress</p>
              <p className="text-3xl font-bold text-primary">{Math.round(progress)}%</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-semibold">
                  {completedCount} / {totalCount} Completed
                </span>
              </div>
            </div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Course List */}
        <div className="space-y-6">
          {track.courses.map((course, index) => {
            const isCompleted = results.completedCourses.includes(course.id);
            return (
              <Card
                key={course.id}
                className={`p-6 glass border-border animate-slide-up transition-all hover:shadow-glow ${
                  isCompleted ? "border-success/30" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => handleToggleCourse(course.id)}
                      className="w-6 h-6 border-2"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3
                          className={`text-xl font-semibold mb-2 ${
                            isCompleted ? "text-muted-foreground line-through" : ""
                          }`}
                        >
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>Course {index + 1}</span>
                          </div>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Completed
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4">{course.description}</p>

                    {!isCompleted && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:bg-primary/10"
                        onClick={() => handleToggleCourse(course.id)}
                      >
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <Card className="p-8 text-center glass border-primary/30 mt-8 animate-fade-in">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-muted-foreground mb-6">
              You've completed all courses in the {track.name} track!
            </p>
            <Button
              onClick={() => navigate("/achievements")}
              className="bg-gradient-primary shadow-glow"
            >
              View Your Achievements
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Courses;
