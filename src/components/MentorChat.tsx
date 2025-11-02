import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Mic, Volume2, Map, Globe, Star } from "lucide-react";

const EDGE = import.meta.env.VITE_SUPABASE_URL + "/functions/v1";

export default function MentorChat() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const isAr = language === "ar";

  // Send regular chat message
  const ask = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || !user) return;

    setMsgs((m) => [...m, { role: "user", content }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${EDGE}/ai-chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          user_id: user.id, 
          message: content, 
          lang: language 
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const j = await res.json();
      const reply = j.reply || (isAr ? "عذراً، حدث خطأ ما." : "Sorry, something went wrong.");
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error("Chat error:", e);
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr ? "فشل الحصول على رد من المعلم" : "Failed to get mentor response",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Ask for roadmap
  const askRoadmap = async () => {
    if (!user) return;
    
    const goal = prompt(
      isAr 
        ? "ما هدفك؟ (مثال: مهندس برمجيات)" 
        : "What's your target? (e.g., Software Engineer)"
    );
    if (!goal) return;

    const userMsg = (isAr ? "أريد خارطة تعلم لهدف: " : "Roadmap for: ") + goal;
    setMsgs((m) => [...m, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const system = isAr
        ? "أريد خريطة تعلم مفصلة من الصفر لهدف المستخدم القادم، تتضمن كورسات ومهارات ومشاريع صغيرة أسبوع–أسبوع."
        : "Generate a detailed step-by-step learning roadmap from zero for the user target, including courses, skills, and mini-projects, week-by-week.";

      const res = await fetch(`${EDGE}/ai-chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          user_id: user.id, 
          message: goal, 
          lang: language, 
          system 
        }),
      });

      if (!res.ok) throw new Error("Failed to generate roadmap");

      const j = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: j.reply || "…" }]);
    } catch (e) {
      console.error("Roadmap error:", e);
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr ? "فشل إنشاء خارطة التعلم" : "Failed to generate roadmap",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Translate last assistant reply
  const translateLast = async () => {
    if (!user) return;
    
    const last = [...msgs].reverse().find((m) => m.role === "assistant");
    if (!last) {
      toast({
        title: isAr ? "تنبيه" : "Notice",
        description: isAr ? "لا يوجد رد للترجمة" : "No assistant reply to translate",
      });
      return;
    }

    const to = isAr ? "English" : "Arabic";
    const promptText = `Translate the following answer to ${to}, keep bullet points and formatting:\n\n${last.content}`;
    setLoading(true);

    try {
      const res = await fetch(`${EDGE}/ai-chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          user_id: user.id, 
          message: promptText, 
          lang: language 
        }),
      });

      if (!res.ok) throw new Error("Failed to translate");

      const j = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: j.reply || "…" }]);
    } finally {
      setLoading(false);
    }
  };

  // Save insight
  const saveInsight = async () => {
    if (!user) return;
    
    const last = [...msgs].reverse().find((m) => m.role === "assistant");
    if (!last) {
      toast({
        title: isAr ? "تنبيه" : "Notice",
        description: isAr ? "لا يوجد رد للحفظ" : "No assistant reply to save",
      });
      return;
    }

    const title = prompt(isAr ? "عنوان الملخص؟" : "Insight title?");
    if (!title) return;

    try {
      const res = await fetch(`${EDGE}/insights`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          title,
          content: last.content,
          tags: ["mentor"],
        }),
      });

      const j = await res.json();
      if (!j.ok) throw new Error("Save failed");

      toast({
        title: isAr ? "تم الحفظ" : "Saved",
        description: isAr ? "تم حفظ الملخص في Insights" : "Saved to Insights",
      });
    } catch (e) {
      console.error("Save insight error:", e);
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr ? "فشل حفظ الملخص" : "Failed to save insight",
        variant: "destructive",
      });
    }
  };

  // STT: Using Web Speech API (Free!)
  const startRecord = async () => {
    if (!user) return;

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        toast({
          title: isAr ? "خطأ" : "Error",
          description: isAr ? "المتصفح لا يدعم التعرف على الصوت. جرب Chrome أو Edge" : "Browser doesn't support speech recognition. Try Chrome or Edge",
          variant: "destructive",
        });
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = isAr ? "ar-SA" : "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setRecording(true);
        toast({
          title: isAr ? "🎤 استمع" : "🎤 Listening",
          description: isAr ? "تكلم الآن..." : "Speak now...",
        });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          ask(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("STT error:", event.error);
        setRecording(false);
        
        let errorMsg = isAr ? "فشل التعرف على الصوت" : "Speech recognition failed";
        if (event.error === "not-allowed") {
          errorMsg = isAr ? "يرجى السماح باستخدام المايك" : "Please allow microphone access";
        } else if (event.error === "no-speech") {
          errorMsg = isAr ? "لم يتم سماع أي صوت" : "No speech detected";
        }
        
        toast({
          title: isAr ? "خطأ" : "Error",
          description: errorMsg,
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.error("Recording error:", e);
      setRecording(false);
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr ? "فشل الوصول للمايك. تحقق من الصلاحيات" : "Failed to access microphone. Check permissions",
        variant: "destructive",
      });
    }
  };

  // TTS: Using Web Speech API (Free!)
  const ttsSpeak = () => {
    if (!user) return;
    
    const last = [...msgs].reverse().find((m) => m.role === "assistant");
    if (!last) {
      toast({
        title: isAr ? "تنبيه" : "Notice",
        description: isAr ? "لا يوجد رد للاستماع إليه" : "No reply to speak",
      });
      return;
    }

    try {
      if (!('speechSynthesis' in window)) {
        toast({
          title: isAr ? "خطأ" : "Error",
          description: isAr ? "المتصفح لا يدعم تحويل النص إلى كلام" : "Browser doesn't support text-to-speech",
          variant: "destructive",
        });
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(last.content);
      utterance.lang = isAr ? "ar-SA" : "en-US";
      utterance.rate = 1.1; // Slightly faster
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Wait for voices to load
      const speakWithVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a better Arabic voice
        const voice = voices.find(v => {
          if (isAr) {
            // Prefer Google Arabic or Microsoft Arabic voices
            return v.lang.startsWith('ar') && (v.name.includes('Google') || v.name.includes('Microsoft'));
          } else {
            return v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Microsoft'));
          }
        }) || voices.find(v => isAr ? v.lang.startsWith('ar') : v.lang.startsWith('en'));
        
        if (voice) {
          utterance.voice = voice;
          console.log('Using voice:', voice.name);
        }

        window.speechSynthesis.speak(utterance);

        toast({
          title: isAr ? "🔊 تشغيل" : "🔊 Playing",
          description: isAr ? "جاري تشغيل الرد" : "Playing response",
        });
      };

      // If voices are already loaded, speak immediately
      if (window.speechSynthesis.getVoices().length > 0) {
        speakWithVoice();
      } else {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = speakWithVoice;
      }
    } catch (e) {
      console.error("TTS error:", e);
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr ? "فشل تشغيل الصوت" : "Failed to play audio",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="border rounded-2xl shadow-lg bg-card overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary p-4 text-white">
          <h2 className="text-2xl font-bold">
            {isAr ? "🤖 المرشد الذكي EduBot" : "🤖 EduBot AI Mentor"}
          </h2>
          <p className="text-sm opacity-90 mt-1">
            {isAr 
              ? "مرشدك الأكاديمي الشخصي لتحقيق أهدافك" 
              : "Your personal academic mentor for achieving your goals"}
          </p>
        </div>

        {/* Messages */}
        <div className="h-[480px] overflow-y-auto p-4 space-y-3 bg-background">
          {msgs.length === 0 && (
            <div className="text-center text-muted-foreground mt-20">
              <p className="text-lg">
                {isAr 
                  ? "مرحباً! كيف يمكنني مساعدتك اليوم؟" 
                  : "Hello! How can I help you today?"}
              </p>
              <p className="text-sm mt-2 opacity-70">
                {isAr 
                  ? "اسألني عن التخصصات، الوظائف، أو الدورات المناسبة لك" 
                  : "Ask me about majors, careers, or courses that fit you"}
              </p>
            </div>
          )}
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground ml-8"
                  : "bg-muted mr-8"
              }`}
            >
              <div className="text-xs opacity-70 mb-1 font-semibold">
                {m.role === "user" 
                  ? (isAr ? "أنت" : "You") 
                  : (isAr ? "المعلم" : "Mentor")}
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">
                {isAr ? "جاري التفكير..." : "Thinking..."}
              </span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-card">
          <div className="flex gap-2 mb-3">
            <Input
              className="flex-1"
              placeholder={isAr ? "اكتب رسالتك..." : "Type your message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask();
                }
              }}
              disabled={loading || !user}
            />
            <Button onClick={() => ask()} disabled={loading || !user || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startRecord}
              disabled={loading || recording || !user}
            >
              <Mic className="w-4 h-4 mr-1" />
              {recording ? (isAr ? "تسجيل..." : "Recording...") : "STT"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={ttsSpeak}
              disabled={loading || msgs.length === 0 || !user}
            >
              <Volume2 className="w-4 h-4 mr-1" />
              TTS
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={askRoadmap}
              disabled={loading || !user}
            >
              <Map className="w-4 h-4 mr-1" />
              {isAr ? "خارطة" : "Roadmap"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={translateLast}
              disabled={loading || msgs.length === 0 || !user}
            >
              <Globe className="w-4 h-4 mr-1" />
              {isAr ? "ترجمة" : "Translate"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={saveInsight}
              disabled={loading || msgs.length === 0 || !user}
            >
              <Star className="w-4 h-4 mr-1" />
              {isAr ? "حفظ" : "Save"}
            </Button>
          </div>

          {!user && (
            <p className="text-xs text-muted-foreground mt-3 text-center">
              {isAr 
                ? "يرجى تسجيل الدخول لاستخدام المعلم الذكي" 
                : "Please sign in to use the AI Mentor"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
