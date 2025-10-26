import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserPoints {
  total_points: number;
  level: number;
  experience: number;
  streak_days: number;
  last_activity_date: string;
}

interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  earned?: boolean;
  earned_at?: string;
}

export function useGamification() {
  const { user } = useAuth();
  const [points, setPoints] = useState<UserPoints | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUserPoints = useCallback(async () => {
    if (!user) return;

    try {
      // Get or create user points
      let { data: userPoints, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // User points don't exist, create them
        const { data: newPoints, error: insertError } = await supabase
          .from('user_points')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        userPoints = newPoints;
      } else if (error) {
        throw error;
      }

      setPoints(userPoints);
    } catch (error) {
      console.error('Error loading user points:', error);
    }
  }, [user]);

  const loadAchievements = useCallback(async () => {
    if (!user) return;

    try {
      // Get all achievements
      const { data: allAchievements, error: achError } = await supabase
        .from('achievements')
        .select('*');

      if (achError) throw achError;

      // Get user's earned achievements
      const { data: userAchievements, error: userAchError } = await supabase
        .from('user_achievements')
        .select('achievement_id, earned_at')
        .eq('user_id', user.id);

      if (userAchError) throw userAchError;

      // Merge data
      const earnedMap = new Map(
        userAchievements?.map(ua => [ua.achievement_id, ua.earned_at]) || []
      );

      const mergedAchievements = allAchievements?.map(ach => ({
        ...ach,
        earned: earnedMap.has(ach.id),
        earned_at: earnedMap.get(ach.id),
      })) || [];

      setAchievements(mergedAchievements);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserPoints();
      loadAchievements();
    }
  }, [user, loadUserPoints, loadAchievements]);

  const addPoints = useCallback(async (amount: number, reason: string) => {
    if (!user || !points) return;

    try {
      // Add transaction
      await supabase.from('point_transactions').insert({
        user_id: user.id,
        points: amount,
        reason,
        type: 'earned',
      });

      // Calculate new level based on experience
      const newExperience = points.experience + amount;
      const newLevel = Math.floor(newExperience / 1000) + 1;

      // Update user points
      const { error } = await supabase
        .from('user_points')
        .update({
          total_points: points.total_points + amount,
          experience: newExperience,
          level: newLevel,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Refresh points
      await loadUserPoints();
    } catch (error) {
      console.error('Error adding points:', error);
    }
  }, [user, points, loadUserPoints]);

  const unlockAchievement = useCallback(async (achievementCode: string) => {
    if (!user) return;

    try {
      const achievement = achievements.find(a => a.code === achievementCode);
      if (!achievement || achievement.earned) return;

      // Add user achievement
      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievement.id,
        });

      if (error) throw error;

      // Award points
      await addPoints(achievement.points, `إنجاز: ${achievement.name}`);

      // Refresh achievements
      await loadAchievements();
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  }, [user, achievements, addPoints, loadAchievements]);

  const updateStreak = useCallback(async () => {
    if (!user || !points) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const lastActivity = points.last_activity_date;

      let newStreak = points.streak_days;

      if (lastActivity !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActivity === yesterdayStr) {
          // Continue streak
          newStreak += 1;
        } else {
          // Reset streak
          newStreak = 1;
        }

        await supabase
          .from('user_points')
          .update({
            streak_days: newStreak,
            last_activity_date: today,
          })
          .eq('user_id', user.id);

        // Check for streak achievements
        if (newStreak === 7) {
          await unlockAchievement('week_streak');
        }

        await loadUserPoints();
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }, [user, points, loadUserPoints, unlockAchievement]);

  return {
    points,
    achievements,
    loading,
    addPoints,
    unlockAchievement,
    updateStreak,
    refresh: () => {
      loadUserPoints();
      loadAchievements();
    },
  };
}
