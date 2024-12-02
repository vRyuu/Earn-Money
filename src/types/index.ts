export interface User {
  id: string;
  email: string;
  points: number;
  paypalEmail: string | null;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  questions: SurveyQuestion[];
}

export interface SurveyQuestion {
  id: string;
  question: string;
  options: string[];
}