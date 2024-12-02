import React from 'react';
import { SurveyQuestion } from '../../types';

interface QuestionCardProps {
  question: SurveyQuestion;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-gray-900">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full text-left px-4 py-3 rounded-lg border ${
              selectedAnswer === option
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}