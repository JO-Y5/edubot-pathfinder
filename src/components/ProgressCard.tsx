import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProgressCardProps {
  courseId: string;
  courseName: string;
  progress: number;
  completed: boolean;
  startedAt: string;
}

export const ProgressCard = ({
  courseName,
  progress,
  completed,
  startedAt,
}: ProgressCardProps) => {
  const { t } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{courseName}</CardTitle>
        {completed ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <Clock className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {completed ? t("progress.completed") : `${progress}%`}
            </span>
            <span>
              {t("progress.started")}: {formatDate(startedAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};