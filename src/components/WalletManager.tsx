import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';

const WalletManager: React.FC = () => {
  const { darkMode } = useTheme();
  const { user, updateUser } = useAuth();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && user && amount <= user.walletBalance) {
      updateUser({
        ...user,
        walletBalance: user.walletBalance - amount,
      });
      setWithdrawAmount('');
      setShowWithdraw(false);
      alert('Withdrawal request submitted!');
    }
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-6">Wallet & Earnings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-gray-500 text-sm mb-1">Balance</p>
          <p className="text-3xl font-bold text-green-500">{formatCurrency(user?.walletBalance || 0)}</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-gray-500 text-sm mb-1">Total Earned</p>
          <p className="text-3xl font-bold text-blue-500">{formatCurrency(5234.50)}</p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-gray-500 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-orange-500">{formatCurrency(452.30)}</p>
        </div>
      </div>

      {!showWithdraw ? (
        <button
          onClick={() => setShowWithdraw(true)}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Withdraw Funds
        </button>
      ) : (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <label className="block text-sm font-semibold mb-2">Withdrawal Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount"
              max={user?.walletBalance}
              className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'}`}
            />
            <button
              onClick={handleWithdraw}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowWithdraw(false);
                setWithdrawAmount('');
              }}
              className={`px-6 py-2 rounded-lg border ${darkMode ? 'border-gray-500 hover:bg-gray-600' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Earnings History */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recent Earnings</h3>
        <div className="space-y-2">
          {[
            { date: 'Today', amount: 45.50, source: 'Video Views' },
            { date: 'Yesterday', amount: 120.00, source: 'Video Views' },
            { date: '2 days ago', amount: 80.00, source: 'Sponsored' },
            { date: '3 days ago', amount: 206.80, source: 'Video Views' },
          ].map((earning, idx) => (
            <div key={idx} className={`flex justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div>
                <p className="font-semibold">{earning.source}</p>
                <p className="text-sm text-gray-500">{earning.date}</p>
              </div>
              <p className="font-bold text-green-500">+{formatCurrency(earning.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletManager;
