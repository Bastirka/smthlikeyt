// pages/CreatorPanel.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import VideoUpload from '../components/VideoUpload';
import AnalyticsChart from '../components/AnalyticsChart';
import WalletManager from '../components/WalletManager';
import ProductManager from '../components/ProductManager';

const CreatorPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'upload', name: 'Upload', icon: '📤' },
    { id: 'videos', name: 'Videos', icon: '🎬' },
    { id: 'livestream', name: 'Livestream', icon: '🔴' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'wallet', name: 'Wallet', icon: '💰' },
    { id: 'shop', name: 'Shop', icon: '🛒' },
    { id: 'membership', name: 'Membership', icon: '⭐' },
  ];

  const stats = [
    { label: 'Total Views', value: '1.2M', change: '+15%' },
    { label: 'Subscribers', value: '45.2K', change: '+8%' },
    { label: 'Watch Time', value: '89.5K hrs', change: '+22%' },
    { label: 'Revenue', value: '$3,420', change: '+12%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Creator Studio</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.username}!</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Go Live
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold dark:text-white mt-1">{stat.value}</p>
            <p className="text-green-600 text-sm mt-1">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <AnalyticsChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold dark:text-white mb-4">Recent Videos</h3>
                {/* Video list component */}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold dark:text-white mb-4">Top Comments</h3>
                {/* Comments list */}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'upload' && <VideoUpload />}
        {activeTab === 'wallet' && <WalletManager />}
        {activeTab === 'shop' && <ProductManager />}
      </div>
    </div>
  );
};

export default CreatorPanel;