import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, DollarSign, BarChart3 } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Turn Your Time Into Real Money
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Complete surveys, watch ads, and earn points that you can exchange for PayPal cash.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
            >
              Start Earning Now
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
              <Coins className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-center">Complete Surveys</h3>
            <p className="mt-2 text-gray-600 text-center">
              Share your opinion and earn points for each completed survey
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-center">Watch Ads</h3>
            <p className="mt-2 text-gray-600 text-center">
              Earn points by watching short advertisements
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-center">Get Paid</h3>
            <p className="mt-2 text-gray-600 text-center">
              Exchange your points for real money via PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}