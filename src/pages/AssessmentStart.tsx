import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AssessmentStart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [track, setTrack] = useState<'university' | 'high_school' | ''>('');
  const [uni, setUni] = useState({ university_name: '', faculty: '', major: '' });
  const [sch, setSch] = useState({ grade: '', target_university: '' });

  const handleStart = () => {
    if (!track) return;
    navigate('/assessment/questions', { state: { track, uni, sch } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t('assessment_choose_title') || 'اختر مرحلتك الدراسية'}
        </h1>
        <p className="text-muted-foreground">
          {t('assessment_choose_desc') || 'ساعدنا على تخصيص التقييم المناسب لك'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card
          onClick={() => setTrack('university')}
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            track === 'university' ? 'border-primary ring-2 ring-primary' : ''
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="text-xl font-semibold mb-2">
              {t('uni_student') || 'طالب جامعي'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('uni_desc') || 'أنا أدرس في الجامعة حالياً'}
            </p>
          </div>
        </Card>

        <Card
          onClick={() => setTrack('high_school')}
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            track === 'high_school' ? 'border-primary ring-2 ring-primary' : ''
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-semibold mb-2">
              {t('hs_student') || 'طالب ثانوي'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('hs_desc') || 'أنا أدرس في المرحلة الثانوية'}
            </p>
          </div>
        </Card>
      </div>

      {track === 'university' && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {t('university_info') || 'معلومات الجامعة'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="university">
                {t('university') || 'الجامعة'}
              </Label>
              <Input
                id="university"
                placeholder={t('university') as string || 'الجامعة'}
                value={uni.university_name}
                onChange={(e) => setUni({ ...uni, university_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="faculty">
                {t('faculty') || 'الكلية'}
              </Label>
              <Input
                id="faculty"
                placeholder={t('faculty') as string || 'الكلية'}
                value={uni.faculty}
                onChange={(e) => setUni({ ...uni, faculty: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="major">
                {t('major') || 'التخصص'}
              </Label>
              <Input
                id="major"
                placeholder={t('major') as string || 'التخصص'}
                value={uni.major}
                onChange={(e) => setUni({ ...uni, major: e.target.value })}
              />
            </div>
          </div>
        </Card>
      )}

      {track === 'high_school' && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {t('school_info') || 'معلومات المرحلة الدراسية'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grade">
                {t('grade') || 'الصف الدراسي'}
              </Label>
              <Input
                id="grade"
                placeholder={t('grade') as string || 'مثال: الصف الأول الثانوي'}
                value={sch.grade}
                onChange={(e) => setSch({ ...sch, grade: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="target_university">
                {t('target_university') || 'الجامعة المستهدفة (اختياري)'}
              </Label>
              <Input
                id="target_university"
                placeholder={t('target_university') as string || 'الجامعة التي تطمح للالتحاق بها'}
                value={sch.target_university}
                onChange={(e) => setSch({ ...sch, target_university: e.target.value })}
              />
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleStart}
          disabled={!track}
          size="lg"
          className="min-w-[200px]"
        >
          {t('start_questions') || 'ابدأ التقييم'}
        </Button>
      </div>
    </div>
  );
}
