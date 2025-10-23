import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CourseProgressData {
  id: string;
  course_id: string;
  progress: number;
  completed: boolean;
  started_at: string;
  completed_at: string | null;
}

export const useCourseProgress = (userId: string | undefined) => {
  const [courseProgress, setCourseProgress] = useState<CourseProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from("course_progress")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching course progress:", error);
      } else {
        setCourseProgress(data || []);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [userId]);

  return { courseProgress, loading };
};