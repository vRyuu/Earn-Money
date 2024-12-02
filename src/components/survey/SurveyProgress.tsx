import React from 'react';

interface SurveyProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function SurveyProgress({ currentQuestion, totalQuestions }: SurveyProgressProps) {
  return (
    <div className="mt-1 text-blue-100">
      Question {currentQuestion + 1} of {totalQuestions}
    </div>
  );
}