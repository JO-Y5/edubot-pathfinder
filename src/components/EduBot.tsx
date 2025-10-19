import { useState } from "react";
import { X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
      content: "Hello! I'm EduBot, your AI guidance assistant. I can help you understand your assessment results, suggest learning paths, and answer questions about careers and certifications. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simple response logic
    setTimeout(() => {
      const botResponse = generateResponse(input);
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    }, 500);

    setInput("");
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("why") || lowerQuery.includes("match")) {
      return "Your track recommendation is based on your strengths, interests, and career goals. The assessment analyzed your problem-solving approach, creative thinking, and preferred work style to find the best fit. Would you like me to explain any specific aspect of your results?";
    }

    if (lowerQuery.includes("certificate") || lowerQuery.includes("certification")) {
      return "Certifications are a great way to validate your skills! Based on your track, I recommend starting with industry-recognized certifications. Check your dashboard for personalized certificate suggestions. Would you like specific recommendations?";
    }

    if (lowerQuery.includes("course") || lowerQuery.includes("learn")) {
      return "Your learning plan is customized to your track. Start with foundational courses and gradually progress to advanced topics. Each course builds on the previous one. You can track your progress in the Courses section. What topic interests you most?";
    }

    if (lowerQuery.includes("job") || lowerQuery.includes("career") || lowerQuery.includes("role")) {
      return "Your assessment results show you're well-suited for several roles in your field. The job market for your track is growing rapidly. I recommend building a portfolio, networking on LinkedIn, and gaining practical experience through projects. Want to know more about a specific role?";
    }

    if (lowerQuery.includes("next") || lowerQuery.includes("step")) {
      return "Great question! I recommend: 1) Complete your first course to build momentum, 2) Join online communities in your field, 3) Start a personal project, 4) Explore scholarship opportunities. Check your dashboard's Next Steps section for more resources!";
    }

    if (lowerQuery.includes("help") || lowerQuery.includes("stuck")) {
      return "I'm here to help! You can ask me about: 1) Understanding your assessment results, 2) Career paths and roles, 3) Learning resources and courses, 4) Certifications and skills, 5) Next steps in your journey. What would you like to know?";
    }

    return "That's an interesting question! I can help you with understanding your results, exploring career paths, finding courses, and planning your next steps. Could you tell me more specifically what you'd like to know?";
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
        <ScrollArea className="flex-1 p-4">
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
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-muted border-border"
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-primary shadow-glow"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
