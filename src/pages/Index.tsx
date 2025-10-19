import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Award, Globe, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Career Guidance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your Perfect
            <br />
            <span className="gradient-text">Academic Path</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Take a smart assessment, get AI-driven recommendations, and build a personalized learning roadmap that matches your strengths and goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 group">
                Start Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary/30 hover:bg-primary/10">
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">Career Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">100+</div>
              <div className="text-sm text-muted-foreground">Learning Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
            <p className="text-muted-foreground">
              Advanced AI analyzes your skills, interests, and goals to find your perfect career match.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Learning Plan</h3>
            <p className="text-muted-foreground">
              Get a personalized roadmap with courses, certifications, and milestones tailored to you.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <p className="text-muted-foreground">
              Unlock badges and track progress as you complete courses and reach your goals.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bilingual Support</h3>
            <p className="text-muted-foreground">
              Full support for English and Arabic with seamless language switching.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have discovered their ideal career path with EduMentor+
            </p>
            <Link to="/assessment">
              <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
                Take the Assessment Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
