import { useState } from 'react';
import { EduBot } from './EduBot';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AssistantLauncher(){
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-primary shadow-glow hover:shadow-glow-lg rounded-full w-14 h-14 md:w-16 md:h-16 p-0 animate-bounce hover:animate-none transition-all"
        size="icon"
        title={language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
      >
        <Bot className="w-6 h-6 md:w-8 md:h-8" />
      </Button>
      <EduBot isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
