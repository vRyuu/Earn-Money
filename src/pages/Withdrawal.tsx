import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { withdrawalService } from '../services/withdrawal';
import { DollarSign } from 'lucide-react';
import { WithdrawalForm } from '../components/withdrawal/WithdrawalForm';

export function Withdrawal() {
  const [paypalEmail, setPaypalEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    navigate('/login');
    return null;
  }

  const maxAmount = Math.floor((user.points * 0.01) * 100) / 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount < 5 || withdrawalAmount > maxAmount) {
      setError('Invalid withdrawal amount');
      return;
    }

    try {
      await withdrawalService.requestWithdrawal({
        userId: user.id,
        amount: withdrawalAmount,
        paypalEmail,
        pointsToDeduct: Math.ceil(withdrawalAmount * 100),
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to process withdrawal');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-green-600">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">Withdraw Funds</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-sm text-gray-600">Available Balance</div>
            <div className="text-2xl font-bold text-gray-900">${maxAmount.toFixed(2)}</div>
          </div>

          <WithdrawalForm
            paypalEmail={paypalEmail}
            amount={amount}
            maxAmount={maxAmount}
            error={error}
            onPaypalEmailChange={setPaypalEmail}
            onAmountChange={setAmount}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}