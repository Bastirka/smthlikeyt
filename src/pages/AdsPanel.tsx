import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatters';

const AdsPanel: React.FC = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📺 Ads Panel</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-700">
        {['campaigns', 'create', 'analytics'].map(tab => (
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
            + Create New Campaign
          </button>
          <div className="space-y-4">
            {[
              { name: 'Q1 New Product Launch', status: 'Active', spent: 5200, budget: 10000, impressions: 125000, clicks: 3400 },
              { name: 'Summer Sale Campaign', status: 'Paused', spent: 8500, budget: 15000, impressions: 250000, clicks: 8200 },
              { name: 'Brand Awareness Push', status: 'Active', spent: 3200, budget: 5000, impressions: 95000, clicks: 2100 },
            ].map((campaign, idx) => (
              <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">{campaign.name}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded ${
                    campaign.status === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                  }`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs">Impressions</p>
                    <p className="font-bold">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Clicks</p>
                    <p className="font-bold">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Spent</p>
                    <p className="font-bold">{formatCurrency(campaign.spent)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Budget</p>
                    <p className="font-bold">{formatCurrency(campaign.budget)}</p>
                  </div>
                </div>

                <div className={`w-full h-2 rounded-full mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  ></div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-500 py-2 rounded hover:bg-gray-700 transition">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                    Stop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-2xl`}>
          <h2 className="text-2xl font-bold mb-6">Create New Ad Campaign</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Campaign Name</label>
              <input
                type="text"
                placeholder="e.g., Summer Sale 2024"
                className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Ad Format</label>
              <select className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                <option>Pre-roll Video</option>
                <option>Display Banner</option>
                <option>Sponsored Content</option>
                <option>Native Ad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Target Audience</label>
              <select className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                <option>All Users</option>
                <option>By Age</option>
                <option>By Interest</option>
                <option>By Location</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Daily Budget</label>
              <div className="flex items-center gap-2">
                <span>$</span>
                <input
                  type="number"
                  placeholder="100"
                  className={`flex-1 px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Duration (Days)</label>
              <input
                type="number"
                placeholder="30"
                className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold"
            >
              Create Campaign
            </button>
          </form>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Impressions', value: '1.2M', change: '+25%' },
            { label: 'Total Clicks', value: '42K', change: '+18%' },
            { label: 'Total Spent', value: formatCurrency(12500), change: '+10%' },
            { label: 'Avg. CTR', value: '3.5%', change: '+0.2%' },
          ].map((stat, idx) => (
            <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-green-500 text-sm">↑ {stat.change}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsPanel;
