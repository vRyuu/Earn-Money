import { Survey } from '../types';
import { supabase } from '../config/supabase';

export const surveyService = {
  async getAvailableSurveys(): Promise<Survey[]> {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .eq('active', true);
    
    if (error) throw error;
    return data || [];
  },

  async submitSurvey(surveyId: string, answers: Record<string, string>) {
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([
        {
          survey_id: surveyId,
          answers,
          completed_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return data;
  },
};