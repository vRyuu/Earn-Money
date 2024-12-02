import { supabase } from '../config/supabase';

export const adService = {
  async recordAdView(userId: string) {
    const pointsEarned = 5; // Points earned per ad view

    const { error } = await supabase
      .from('ad_views')
      .insert([
        {
          user_id: userId,
          points_earned: pointsEarned,
        },
      ]);

    if (error) throw error;

    // Update user points
    const { error: updateError } = await supabase
      .from('users')
      .update({ points: supabase.raw(`points + ${pointsEarned}`) })
      .eq('id', userId);

    if (updateError) throw updateError;

    return pointsEarned;
  },
};