import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import VideoUpload from '../components/VideoUpload';
import AnalyticsChart from '../components/AnalyticsChart';
import WalletManager from '../components/WalletManager';
import ProductManager from '../components/ProductManager';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { mockProducts } from '../data/mockData';
import { formatCurrency, formatViewCount } from '../utils/formatters';

const CreatorPanel: React.FC = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const analyticsData = [
    { date: 'Mon', views: 1200, clicks: 400, revenue: 120 },
    { date: 'Tue', views: 1800, clicks: 600, revenue: 180 },
    { date: 'Wed', views: 1400, clicks: 700, revenue: 140 },
    { date: 'Thu', views: 2000, clicks: 800, revenue: 200 },
    { date: 'Fri', views: 2200, clicks: 900, revenue: 220 },
    { date: 'Sat', views: 1900, clicks: 750, revenue: 190 },
    { date: 'Sun', views: 1600, clicks: 600, revenue: 160 },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'upload', label: 'Upload', icon: '📹' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'wallet', label: 'Wallet', icon: '💰' },
    { id: 'store', label: 'Store', icon: '🛍️' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Creator Panel</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm mb-1">Total Views</p>
              <p className="text-3xl font-bold">{formatViewCount(152000)}</p>
              <p className="text-green-500 text-sm mt-2">↑ 12% this week</p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm mb-1">Total Earnings</p>
              <p className="text-3xl font-bold">{formatCurrency(5234.50)}</p>
              <p className="text-green-500 text-sm mt-2">↑ 8% this month</p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm mb-1">Subscribers</p>
              <p className="text-3xl font-bold">125.4K</p>
              <p className="text-green-500 text-sm mt-2">↑ 2.3K new</p>
            </div>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm mb-1">Engagement Rate</p>
              <p className="text-3xl font-bold">8.2%</p>
              <p className="text-green-500 text-sm mt-2">↑ 1.1% this week</p>
            </div>
          </div>

          {/* Analytics Chart */}
          <AnalyticsChart data={analyticsData} type="line" title="Views & Revenue (Last 7 Days)" />
        </div>
      )}

      {activeTab === 'upload' && <VideoUpload />}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <AnalyticsChart data={analyticsData} type="bar" title="Daily Views" />
          <AnalyticsChart
            data={[
              { name: 'Views', value: 45 },
              { name: 'Likes', value: 30 },
              { name: 'Comments', value: 15 },
              { name: 'Shares', value: 10 },
            ]}
            type="pie"
            title="Engagement Breakdown"
          />
        </div>
      )}

      {activeTab === 'wallet' && <WalletManager />}

      {activeTab === 'store' && <ProductManager products={mockProducts} />}
    </div>
  );
};

export default CreatorPanel;
