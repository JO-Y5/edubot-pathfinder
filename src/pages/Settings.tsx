import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Globe, Palette, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your data? This action cannot be undone.")) {
      localStorage.removeItem("eduMentorResults");
      toast.success("All data cleared successfully");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <Card className="p-6 glass border-border animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Language Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Select Language</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-xl border-2 border-primary bg-primary/10 text-left hover:scale-105 transition-transform">
                    <div className="font-semibold mb-1">English</div>
                    <div className="text-sm text-muted-foreground">Default language</div>
                  </button>
                  <button className="p-4 rounded-xl border-2 border-border glass text-left hover:scale-105 transition-transform">
                    <div className="font-semibold mb-1">العربية</div>
                    <div className="text-sm text-muted-foreground">Arabic (Coming Soon)</div>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Theme Settings */}
          <Card className="p-6 glass border-border animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Theme</Label>
                <div className="p-4 rounded-xl border-2 border-primary bg-primary/10">
                  <div className="font-semibold mb-1">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Optimized for learning</div>
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Accent Color</Label>
                <div className="flex gap-3">
                  <button className="w-12 h-12 rounded-full bg-gradient-primary border-2 border-primary shadow-glow"></button>
                  <button className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-transparent hover:border-green-400"></button>
                  <button className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 border-2 border-transparent hover:border-orange-400"></button>
                  <button className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-transparent hover:border-purple-400"></button>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 glass border-border animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-semibold">Data Management</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-muted-foreground mb-4">
                  This will permanently delete all your assessment results, progress, and achievements. This action cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleClearData}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6 glass border-border animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-xl font-semibold mb-4">About EduMentor+</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Platform:</strong> AI-Powered Academic Guidance</p>
              <p className="pt-2">
                EduMentor+ helps students discover their ideal career path through intelligent assessment and personalized learning recommendations.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
