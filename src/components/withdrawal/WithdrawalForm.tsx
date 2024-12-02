import React from 'react';

interface WithdrawalFormProps {
  paypalEmail: string;
  amount: string;
  maxAmount: number;
  error: string;
  onPaypalEmailChange: (email: string) => void;
  onAmountChange: (amount: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function WithdrawalForm({
  paypalEmail,
  amount,
  maxAmount,
  error,
  onPaypalEmailChange,
  onAmountChange,
  onSubmit,
}: WithdrawalFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">
          PayPal Email
        </label>
        <input
          id="paypalEmail"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={paypalEmail}
          onChange={(e) => onPaypalEmailChange(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount to Withdraw ($)
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="5"
          max={maxAmount}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500">
          Minimum withdrawal: $5.00
        </p>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Request Withdrawal
      </button>
    </form>
  );
}