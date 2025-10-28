import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BANK_UNI, BANK_HS } from '../data/assessmentBanks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function AssessmentQuestions() {
  const { state } = useLocation() as any;
  const nav = useNavigate();
  const { i18n, t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const isUni = state?.track === 'university';
  const BANK = isUni ? BANK_UNI : BANK_HS;
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAr = i18n.language === 'ar';

  const progress = (Object.keys(answers).length / BANK.length) * 100;

  const handleSliderChange = (questionId: string, value: number[]) => {
    setAnswers({ ...answers, [questionId]: value[0] });
  };

  const handleSingleChoice = (questionId: string, value: string, question: any) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
  };

  const handleMultiChoice = (questionId: string, option: string, checked: boolean, question: any) => {
    const current: string[] = answers[questionId] || [];
    const updated = checked 
      ? [...current, option]
      : current.filter(x => x !== option);
    
    setAnswers({ ...answers, [questionId]: updated.length > 0 ? updated : undefined });
  };

  async function submit() {
    const answeredCount = Object.keys(answers).length;
    
    if (answeredCount < BANK.length) {
      toast({
        title: isAr ? 'يرجى إكمال جميع الأسئلة' : 'Please complete all questions',
        description: isAr 
          ? `لقد أجبت على ${answeredCount} من ${BANK.length} سؤال`
          : `You answered ${answeredCount} of ${BANK.length} questions`,
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const EDGE = import.meta.env.VITE_SUPABASE_URL;
      
      // Build answers array with proper structure for edge function
      const answersArray = BANK.map((question: any) => {
        const answer = answers[question.id];
        
        // Handle track_mapping for multi/single choice questions
        let tracks = question.tracks || {};
        
        if (question.track_mapping && answer !== undefined) {
          if (question.type === 'single') {
            const selectedIndex = question[isAr ? 'options_ar' : 'options_en'].indexOf(answer);
            if (selectedIndex >= 0 && question.track_mapping[selectedIndex]) {
              tracks = question.track_mapping[selectedIndex];
            }
          } else if (question.type === 'multi' && Array.isArray(answer)) {
            // For multi-choice, sum up tracks from all selected options
            const combinedTracks: Record<string, number> = {};
            answer.forEach((selectedOption: string) => {
              const optionIndex = question[isAr ? 'options_ar' : 'options_en'].indexOf(selectedOption);
              if (optionIndex >= 0 && question.track_mapping[optionIndex]) {
                const optionTracks = question.track_mapping[optionIndex];
                Object.entries(optionTracks).forEach(([track, weight]) => {
                  combinedTracks[track] = (combinedTracks[track] || 0) + (weight as number);
                });
              }
            });
            tracks = combinedTracks;
          }
        }

        return {
          id: question.id,
          value: answer,
          category: question.category,
          tracks: tracks
        };
      });

      const payload = {
        user_id: user?.id || '',
        track: state?.track,
        profile: state?.uni || state?.sch || {},
        answers: answersArray
      };

      const res = await fetch(`${EDGE}/functions/v1/assessment-cat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to process assessment');
      }

      const data = await res.json();
      nav('/assessment/results', { state: { assessment: data, profile: state } });
    } catch (error) {
      console.error('Assessment error:', error);
      toast({
        title: isAr ? 'حدث خطأ' : 'Error occurred',
        description: isAr 
          ? 'حدث خطأ أثناء معالجة التقييم. يرجى المحاولة مرة أخرى.'
          : 'An error occurred while processing the assessment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 pb-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          {isUni ? (t('uni_track_title') ?? 'University Track Assessment') : (t('hs_track_title') ?? 'High School Track Assessment')}
        </h1>
        <p className="text-muted-foreground">
          {isAr 
            ? 'أجب على جميع الأسئلة بصدق للحصول على أفضل النتائج'
            : 'Answer all questions honestly for the best results'}
        </p>
        
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{isAr ? 'التقدم' : 'Progress'}</span>
            <span>{Object.keys(answers).length} / {BANK.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="space-y-6">
        {BANK.map((question: any, idx: number) => {
          const q = isAr ? question.q_ar : question.q_en;
          const options = isAr ? question.options_ar : question.options_en;
          const isAnswered = answers[question.id] !== undefined;

          return (
            <Card
              key={question.id}
              className={`p-6 glass border-border transition-all animate-slide-up ${
                isAnswered ? 'border-primary/30 shadow-glow' : ''
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-4">{q}</h3>

                  {question.type === 'scale' && (
                    <div className="space-y-4">
                      <Slider
                        min={question.min}
                        max={question.max}
                        step={1}
                        value={[answers[question.id] || 3]}
                        onValueChange={(value) => handleSliderChange(question.id, value)}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{isAr ? 'لا أوافق بشدة' : 'Strongly Disagree'}</span>
                        <span className="font-bold text-primary">
                          {answers[question.id] || 3}
                        </span>
                        <span>{isAr ? 'أوافق بشدة' : 'Strongly Agree'}</span>
                      </div>
                    </div>
                  )}

                  {question.type === 'single' && (
                    <div className="grid gap-2">
                      {options?.map((option: string, optIdx: number) => (
                        <Button
                          key={optIdx}
                          variant={answers[question.id] === option ? 'default' : 'outline'}
                          className={`justify-start text-right h-auto py-3 ${
                            answers[question.id] === option
                              ? 'bg-gradient-primary shadow-glow'
                              : ''
                          }`}
                          onClick={() => handleSingleChoice(question.id, option, question)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {question.type === 'multi' && (
                    <div className="grid gap-3">
                      {options?.map((option: string, optIdx: number) => {
                        const isSelected = (answers[question.id] || []).includes(option);
                        return (
                          <label
                            key={optIdx}
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) =>
                                handleMultiChoice(question.id, option, checked as boolean, question)
                              }
                            />
                            <span className="flex-1 text-right">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={submit}
          disabled={isSubmitting || Object.keys(answers).length < BANK.length}
          size="lg"
          className="bg-gradient-primary shadow-glow text-lg px-12"
        >
          {isSubmitting
            ? (isAr ? 'جاري المعالجة...' : 'Processing...')
            : (t('finish_assessment') ?? 'Finish Assessment')}
        </Button>
      </div>
    </div>
  );
}
