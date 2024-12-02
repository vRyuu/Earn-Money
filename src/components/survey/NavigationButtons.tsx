import React from 'react';

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function NavigationButtons({
  currentQuestion,
  totalQuestions,
  canProceed,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="mt-6 flex justify-between">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
      >
        Previous
      </button>

      {isLastQuestion ? (
        <button
          onClick={onSubmit}
          disabled={!canProceed}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Survey
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      )}
    </div>
  );
}