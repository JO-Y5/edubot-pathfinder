-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  pdf_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for certificates
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON public.certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_number ON public.certificates(certificate_number);

-- Enable RLS on certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create policies for certificates
CREATE POLICY "Users can view their own certificates"
ON public.certificates
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Public certificates are viewable by certificate number"
ON public.certificates
FOR SELECT
USING (true);

-- Create user_points table for gamification
CREATE TABLE IF NOT EXISTS public.user_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_points INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  experience INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for user_points
CREATE INDEX IF NOT EXISTS idx_user_points_user_id ON public.user_points(user_id);
CREATE INDEX IF NOT EXISTS idx_user_points_total_points ON public.user_points(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_user_points_level ON public.user_points(level DESC);

-- Enable RLS on user_points
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;

-- Create policies for user_points
CREATE POLICY "Users can view their own points"
ON public.user_points
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view leaderboard"
ON public.user_points
FOR SELECT
USING (true);

CREATE POLICY "Users can update their own points"
ON public.user_points
FOR UPDATE
USING (auth.uid() = user_id);

-- Create point_transactions table
CREATE TABLE IF NOT EXISTS public.point_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('earned', 'spent', 'bonus', 'penalty')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for point_transactions
CREATE INDEX IF NOT EXISTS idx_point_transactions_user_id ON public.point_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_created_at ON public.point_transactions(created_at);

-- Enable RLS on point_transactions
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for point_transactions
CREATE POLICY "Users can view their own transactions"
ON public.point_transactions
FOR SELECT
USING (auth.uid() = user_id);

-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  requirements JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on achievements
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for achievements
CREATE POLICY "Achievements are viewable by everyone"
ON public.achievements
FOR SELECT
USING (true);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create indexes for user_achievements
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON public.user_achievements(achievement_id);

-- Enable RLS on user_achievements
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for user_achievements
CREATE POLICY "Users can view their own achievements"
ON public.user_achievements
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' achievements"
ON public.user_achievements
FOR SELECT
USING (true);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  score NUMERIC NOT NULL,
  reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for recommendations
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_score ON public.recommendations(score DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_created_at ON public.recommendations(created_at);

-- Enable RLS on recommendations
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies for recommendations
CREATE POLICY "Users can view their own recommendations"
ON public.recommendations
FOR SELECT
USING (auth.uid() = user_id);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('progress', 'performance', 'usage', 'financial')),
  title TEXT NOT NULL,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for reports
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_org_id ON public.reports(org_id);
CREATE INDEX IF NOT EXISTS idx_reports_type ON public.reports(type);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at);

-- Enable RLS on reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for reports
CREATE POLICY "Users can view their own reports"
ON public.reports
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Org owners can view org reports"
ON public.reports
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organizations
    WHERE organizations.id = reports.org_id
    AND organizations.owner_id = auth.uid()
  )
);

-- Create triggers for updated_at
CREATE TRIGGER update_user_points_updated_at
BEFORE UPDATE ON public.user_points
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default achievements
INSERT INTO public.achievements (code, name, description, icon, points, category) VALUES
  ('first_login', 'مرحباً بك!', 'سجل الدخول لأول مرة', '👋', 10, 'getting_started'),
  ('complete_assessment', 'المقيّم', 'أكمل أول تقييم', '📝', 50, 'assessment'),
  ('complete_first_course', 'المتعلم', 'أكمل أول دورة', '🎓', 100, 'learning'),
  ('complete_five_courses', 'الخبير', 'أكمل 5 دورات', '⭐', 500, 'learning'),
  ('week_streak', 'المثابر', 'حافظ على نشاط لمدة 7 أيام متتالية', '🔥', 200, 'engagement'),
  ('reach_level_5', 'المحترف', 'وصل إلى المستوى 5', '🏆', 300, 'progression'),
  ('reach_level_10', 'الخبير المتقدم', 'وصل إلى المستوى 10', '👑', 1000, 'progression')
ON CONFLICT (code) DO NOTHING;