import { supabase } from '../config/supabase';

interface WithdrawalRequest {
  userId: string;
  amount: number;
  paypalEmail: string;
  pointsToDeduct: number;
}

export const withdrawalService = {
  async requestWithdrawal(request: WithdrawalRequest) {
    const { data, error } = await supabase
      .from('withdrawals')
      .insert([
        {
          user_id: request.userId,
          amount: request.amount,
          paypal_email: request.paypalEmail,
          status: 'pending',
        },
      ]);

    if (error) throw error;

    // Deduct points from user
    const { error: pointsError } = await supabase
      .from('users')
      .update({ points: supabase.raw(`points - ${request.pointsToDeduct}`) })
      .eq('id', request.userId);

    if (pointsError) throw pointsError;

    return data;
  },

  async getWithdrawalHistory(userId: string) {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};