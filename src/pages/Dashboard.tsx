import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Survey } from '../types';
import { surveyService } from '../services/surveys';
import { useAuthStore } from '../store/useAuthStore';
import { ClipboardList, DollarSign, Award } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export function Dashboard() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadSurveys = async () => {
      try {
        const availableSurveys = await surveyService.getAvailableSurveys();
        setSurveys(availableSurveys);
      } catch (error) {
        console.error('Failed to load surveys:', error);
      }
    };

    loadSurveys();
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Ad Banner */}
      <AdBanner slot="1234567890" format="horizontal" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Points
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {user?.points || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Available for Withdrawal
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    ${((user?.points || 0) * 0.01).toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Ad Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Available Surveys
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {surveys.map((survey) => (
                <li key={survey.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ClipboardList className="h-5 w-5 text-blue-600 mr-3" />
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {survey.title}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2.5 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          {survey.pointsReward} points
                        </span>
                        <button
                          onClick={() => navigate(`/surveys/${survey.id}`)}
                          className="ml-4 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Start Survey →
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {survey.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-1">
          <AdBanner slot="9876543210" format="vertical" />
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="mt-8">
        <AdBanner slot="5432109876" format="horizontal" />
      </div>
    </div>
  );
}