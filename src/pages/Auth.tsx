import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { z } from "zod";
import { Brain, Mail, Lock, User } from "lucide-react";

const signUpSchema = z.object({
  fullName: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" })
});

const signInSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" })
});

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, user } = useAuth();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // Sign In State
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = signUpSchema.parse(signUpData);
      const { error } = await signUp(validated.email, validated.password, validated.fullName);

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error(language === "ar" ? "هذا البريد مسجل بالفعل" : "Email already registered");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(language === "ar" ? "تم التسجيل بنجاح! جاري تحويلك..." : "Signed up successfully! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err: any) {
      if (err.errors) {
        toast.error(err.errors[0].message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = signInSchema.parse(signInData);
      const { error } = await signIn(validated.email, validated.password);

      if (error) {
        if (error.message.includes("Invalid")) {
          toast.error(language === "ar" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(language === "ar" ? "تم تسجيل الدخول بنجاح!" : "Signed in successfully!");
      }
    } catch (err: any) {
      if (err.errors) {
        toast.error(err.errors[0].message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Brain className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">EduMentor+</h1>
          <p className="text-muted-foreground mt-2">
            {language === "ar" ? "مرحباً بك في منصة التعليم الذكية" : "Welcome to Smart Learning Platform"}
          </p>
        </div>

        <Card className="p-6 glass border-border animate-slide-up">
          <Tabs defaultValue="signin" dir={language === "ar" ? "rtl" : "ltr"}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">
                {language === "ar" ? "تسجيل الدخول" : "Sign In"}
              </TabsTrigger>
              <TabsTrigger value="signup">
                {language === "ar" ? "حساب جديد" : "Sign Up"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary shadow-glow"
                  disabled={loading}
                >
                  {loading ? (language === "ar" ? "جاري التسجيل..." : "Signing in...") : (language === "ar" ? "تسجيل الدخول" : "Sign In")}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">
                    {language === "ar" ? "الاسم الكامل" : "Full Name"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={language === "ar" ? "أدخل كلمة المرور (6 أحرف على الأقل)" : "Enter password (min 6 characters)"}
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary shadow-glow"
                  disabled={loading}
                >
                  {loading ? (language === "ar" ? "جاري الإنشاء..." : "Creating account...") : (language === "ar" ? "إنشاء حساب" : "Create Account")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
