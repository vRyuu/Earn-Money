import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { adminService } from '../services/admin';
import { 
  Users, 
  ClipboardList, 
  DollarSign, 
  BarChart3,
  CheckCircle,
  XCircle 
} from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSurveys: 0,
    pendingWithdrawals: 0,
    totalEarnings: 0
  });
  const [withdrawals, setWithdrawals] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/dashboard');
      return;
    }

    const loadAdminData = async () => {
      try {
        const dashboardStats = await adminService.getDashboardStats();
        setStats(dashboardStats);
        
        if (activeTab === 'withdrawals') {
          const withdrawalData = await adminService.getPendingWithdrawals();
          setWithdrawals(withdrawalData);
        } else if (activeTab === 'surveys') {
          const surveyData = await adminService.getAllSurveys();
          setSurveys(surveyData);
        }
      } catch (error) {
        console.error('Failed to load admin data:', error);
      }
    };

    loadAdminData();
  }, [user, activeTab, navigate]);

  const handleWithdrawalAction = async (withdrawalId: string, action: 'approve' | 'reject') => {
    try {
      await adminService.processWithdrawal(withdrawalId, action);
      const updatedWithdrawals = await adminService.getPendingWithdrawals();
      setWithdrawals(updatedWithdrawals);
    } catch (error) {
      console.error('Failed to process withdrawal:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-sm text-gray-500">Total Users</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">{stats.totalUsers}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <ClipboardList className="h-6 w-6 text-green-600" />
            <span className="ml-2 text-sm text-gray-500">Active Surveys</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">{stats.totalSurveys}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-yellow-600" />
            <span className="ml-2 text-sm text-gray-500">Pending Withdrawals</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">{stats.pendingWithdrawals}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <span className="ml-2 text-sm text-gray-500">Total Revenue</span>
          </div>
          <div className="mt-2 text-2xl font-semibold">${stats.totalEarnings}</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'withdrawals'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setActiveTab('surveys')}
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'surveys'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Surveys
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'withdrawals' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PayPal Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {withdrawals.map((withdrawal: any) => (
                    <tr key={withdrawal.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {withdrawal.user_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${withdrawal.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {withdrawal.paypal_email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleWithdrawalAction(withdrawal.id, 'approve')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleWithdrawalAction(withdrawal.id, 'reject')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'surveys' && (
            <div className="space-y-6">
              {surveys.map((survey: any) => (
                <div key={survey.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {survey.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {survey.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        {survey.points_reward} points
                      </span>
                      <button
                        onClick={() => {/* Handle edit survey */}}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}