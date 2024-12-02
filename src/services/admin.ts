import { supabase } from '../config/supabase';

export const adminService = {
  async getDashboardStats() {
    const { data: stats, error } = await supabase.rpc('get_admin_dashboard_stats');
    if (error) throw error;
    return stats;
  },

  async getPendingWithdrawals() {
    const { data, error } = await supabase
      .from('withdrawals')
      .select(`
        id,
        amount,
        paypal_email,
        status,
        created_at,
        users (
          email
        )
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async processWithdrawal(withdrawalId: string, action: 'approve' | 'reject') {
    const { error } = await supabase
      .from('withdrawals')
      .update({ status: action === 'approve' ? 'completed' : 'rejected' })
      .eq('id', withdrawalId);

    if (error) throw error;
  },

  async getAllSurveys() {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};