import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface EduBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EduBot = ({ isOpen, onClose }: EduBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "مرحباً بك! 👋 أنا EduBot، مساعدك الذكي في EduMentor+.\n\nيمكنني مساعدتك في:\n• فهم نتائج التقييم\n• اقتراح مسارات تعليمية مناسبة\n• الإجابة عن أسئلتك حول المهن والتخصصات\n• تقديم نصائح للتطوير المهني\n\nكيف يمكنني مساعدتك اليوم؟ 💡"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("EduBot isOpen:", isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending message to EduBot...");
      
      // Add empty bot message that will be updated
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      // Get authentication session
      const { data: { session } } = await supabase.auth.getSession();
      
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/edubot-chat`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [
            ...messages.map(m => ({ 
              role: m.role === "bot" ? "assistant" : "user", 
              content: m.content 
            })), 
            { role: "user", content: userMessage.content }
          ]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API error:", response.status, errorData);
        throw new Error(errorData?.error || "فشل الاتصال بالذكاء الاصطناعي");
      }

      if (!response.body) {
        throw new Error("لم يتم استلام رد من الذكاء الاصطناعي");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              // Update the last message
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "bot",
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch (e) {
            console.error("Parse error:", e);
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ في الاتصال بالذكاء الاصطناعي";
      toast.error(errorMessage);
      // Remove the empty bot message if there was an error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div className="glass border border-border rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-card pointer-events-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">EduBot</h3>
              <p className="text-xs opacity-90">AI Guidance Assistant</p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="hover:bg-background/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "bot" ? "bg-primary/20" : "bg-secondary/20"
                  )}
                >
                  {message.role === "bot" ? (
                    <Bot className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">You</span>
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 max-w-[80%]",
                    message.role === "bot"
                      ? "bg-muted"
                      : "bg-gradient-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder="اسألني أي سؤال..."
              className="flex-1 bg-muted border-border"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-primary shadow-glow"
              size="icon"
              disabled={isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
