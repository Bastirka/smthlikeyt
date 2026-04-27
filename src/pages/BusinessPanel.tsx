import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency, formatDate } from '../utils/formatters';

const BusinessPanel: React.FC = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">💼 Business Panel</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-700">
        {['campaigns', 'sponsors', 'analytics', 'contracts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium transition ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'campaigns' && (
        <div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-6">
            + New Campaign
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-bold mb-2">Campaign {i}</h3>
                <p className="text-gray-500 text-sm mb-4">Promote your latest video</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-semibold">{formatCurrency(500 * i)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-semibold">{formatCurrency(320 * i)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reach</span>
                    <span className="font-semibold">{(125 * i * 100).toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full border border-gray-500 py-2 rounded hover:bg-gray-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sponsors' && (
        <div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-6">
            + Find Sponsors
          </button>
          <div className="space-y-4">
            {[
              { name: 'Tech Corp', budget: 50000, status: 'Active', duration: '3 months' },
              { name: 'Gaming Brand', budget: 30000, status: 'Active', duration: '2 months' },
              { name: 'Energy Drink', budget: 20000, status: 'Pending', duration: '1 month' },
            ].map((sponsor, idx) => (
              <div key={idx} className={`p-6 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div>
                  <h3 className="font-bold text-lg">{sponsor.name}</h3>
                  <p className="text-sm text-gray-500">{sponsor.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-green-500">{formatCurrency(sponsor.budget)}</p>
                  <span className={`text-xs font-bold px-3 py-1 rounded ${
                    sponsor.status === 'Active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                  }`}>
                    {sponsor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: formatCurrency(125000), change: '+15%' },
            { label: 'Active Campaigns', value: '12', change: '+3' },
            { label: 'Sponsorships', value: '8', change: '+2' },
            { label: 'Avg. Campaign ROI', value: '340%', change: '+45%' },
          ].map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-green-500 text-sm">↑ {stat.change}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold">Sponsorship Contract #{i}</h3>
                <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">Active</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Valid from {formatDate(new Date())} to {formatDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))}</p>
              <div className="flex gap-3">
                <button className="flex-1 border border-gray-500 py-2 rounded hover:bg-gray-700 transition">
                  View Contract
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessPanel;
