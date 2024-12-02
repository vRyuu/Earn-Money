import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Survey } from '../types';
import { surveyService } from '../services/surveys';
import { useAuthStore } from '../store/useAuthStore';
import { ClipboardList } from 'lucide-react';
import { QuestionCard } from '../components/survey/QuestionCard';
import { SurveyProgress } from '../components/survey/SurveyProgress';
import { NavigationButtons } from '../components/survey/NavigationButtons';

export function SurveyPage() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!surveyId || !user) {
      navigate('/dashboard');
      return;
    }

    const loadSurvey = async () => {
      try {
        const surveyData = await surveyService.getSurveyById(surveyId);
        setSurvey(surveyData);
      } catch (error) {
        console.error('Failed to load survey:', error);
        navigate('/dashboard');
      }
    };

    loadSurvey();
  }, [surveyId, user, navigate]);

  const handleAnswer = (answer: string) => {
    if (!survey) return;
    const questionId = survey.questions[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (!survey || !user) return;

    try {
      await surveyService.submitSurvey(survey.id, answers);
      await surveyService.awardPoints(user.id, survey.pointsReward);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit survey:', error);
    }
  };

  if (!survey) return null;

  const currentQ = survey.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">{survey.title}</h1>
          </div>
          <SurveyProgress
            currentQuestion={currentQuestion}
            totalQuestions={survey.questions.length}
          />
        </div>

        <div className="p-6">
          <QuestionCard
            question={currentQ}
            selectedAnswer={answers[currentQ.id] || null}
            onAnswer={handleAnswer}
          />

          <NavigationButtons
            currentQuestion={currentQuestion}
            totalQuestions={survey.questions.length}
            canProceed={!!answers[currentQ.id]}
            onPrevious={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            onNext={() => setCurrentQuestion((prev) => prev + 1)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}