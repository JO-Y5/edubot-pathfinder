import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Award, BookOpen, TrendingUp } from "lucide-react";
import { TRACKS } from "@/data/tracks";

interface Results {
  primaryTrack: string;
  secondaryTrack: string;
  completedCourses: string[];
  progress: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Results | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("eduMentorResults");
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="p-12 text-center glass max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Assessment Results</h2>
          <p className="text-muted-foreground mb-6">
            Take the assessment first to see your personalized dashboard
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

  const primaryTrack = TRACKS[results.primaryTrack];
  const secondaryTrack = TRACKS[results.secondaryTrack];
  const totalCourses = primaryTrack.courses.length;
  const progress = (results.completedCourses.length / totalCourses) * 100;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Your Learning Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and explore your personalized learning path
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Track */}
            <Card className="p-8 glass border-border animate-slide-up">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{primaryTrack.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{primaryTrack.name}</h2>
                      <p className="text-sm text-primary">Primary Track</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">{primaryTrack.description}</p>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {results.completedCourses.length} of {totalCourses} courses completed
                </p>
              </div>

              {/* Why this Match */}
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Why This Match?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your assessment shows strong alignment with {primaryTrack.name}. Your selected skills in {primaryTrack.skills.slice(0, 3).join(", ")} combined with your interests make this an excellent fit. This track offers diverse career opportunities and strong market demand.
                </p>
              </div>

              {/* Related Roles */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Related Career Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {primaryTrack.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Learning Plan */}
            <Card className="p-8 glass border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Your Learning Plan
              </h2>
              <div className="space-y-4">
                {primaryTrack.courses.map((course, index) => {
                  const isCompleted = results.completedCourses.includes(course.id);
                  return (
                    <div
                      key={course.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCompleted
                          ? "bg-success/10 border-success/30"
                          : "glass border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                isCompleted ? "bg-success text-white" : "bg-muted"
                              }`}
                            >
                              {isCompleted ? "✓" : index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">{course.duration}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground ml-11">{course.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Secondary Track */}
            <Card className="p-6 glass border-border animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-semibold mb-4">Secondary Track</h3>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{secondaryTrack.icon}</span>
                <div>
                  <p className="font-semibold">{secondaryTrack.name}</p>
                  <p className="text-xs text-muted-foreground">Great alternative path</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{secondaryTrack.description}</p>
            </Card>

            {/* Certificates */}
            <Card className="p-6 glass border-border animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Suggested Certificates
              </h3>
              <div className="space-y-3">
                {primaryTrack.certificates.slice(0, 4).map((cert) => (
                  <div
                    key={cert}
                    className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors cursor-pointer group"
                  >
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {cert}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Next Steps */}
            <Card className="p-6 glass border-border animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between border-border hover:bg-primary/10"
                  asChild
                >
                  <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer">
                    <span>Browse Courses</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border hover:bg-primary/10"
                  asChild
                >
                  <a href="https://www.linkedin.com/jobs" target="_blank" rel="noopener noreferrer">
                    <span>Find Internships</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between border-border hover:bg-primary/10"
                  asChild
                >
                  <a href="https://www.scholarships.com" target="_blank" rel="noopener noreferrer">
                    <span>Scholarships</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
