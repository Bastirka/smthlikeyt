import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency, formatViewCount } from '../utils/formatters';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InvestorDashboard: React.FC = () => {
  const { darkMode } = useTheme();

  const chartData = [
    { month: 'Jan', revenue: 42000, users: 24000, engagement: 24 },
    { month: 'Feb', revenue: 48000, users: 28000, engagement: 25 },
    { month: 'Mar', revenue: 55000, users: 32000, engagement: 26 },
    { month: 'Apr', revenue: 62000, users: 38000, engagement: 28 },
    { month: 'May', revenue: 71000, users: 45000, engagement: 30 },
    { month: 'Jun', revenue: 82000, users: 52000, engagement: 32 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Investor Dashboard</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          📥 Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: formatCurrency(412000), change: '+45%', period: 'YoY' },
          { label: 'Active Users', value: '524K', change: '+62%', period: 'YoY' },
          { label: 'Growth Rate', value: '3.2%', change: '+0.8%', period: 'MoM' },
          { label: 'Market Share', value: '8.5%', change: '+1.2%', period: 'YoY' },
        ].map((metric, idx) => (
          <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <p className="text-gray-500 text-sm mb-2">{metric.label}</p>
            <p className="text-3xl font-bold mb-2">{metric.value}</p>
            <div className="flex justify-between">
              <p className="text-green-500 font-semibold text-sm">↑ {metric.change}</p>
              <p className="text-gray-500 text-xs">{metric.period}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-bold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#FFFFFF' }} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-bold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#FFFFFF' }} />
              <Bar dataKey="users" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Business Segments */}
      <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-4">Revenue Breakdown by Segment</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { segment: 'Video Ads', revenue: formatCurrency(145000), percentage: '35%' },
            { segment: 'Premium Subs', revenue: formatCurrency(98000), percentage: '24%' },
            { segment: 'Shop Sales', revenue: formatCurrency(87000), percentage: '21%' },
            { segment: 'Sponsorships', revenue: formatCurrency(82000), percentage: '20%' },
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-gray-500 text-sm mb-2">{item.segment}</p>
              <p className="text-2xl font-bold mb-1">{item.revenue}</p>
              <p className="text-blue-600 font-semibold text-sm">{item.percentage} of total</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Top Creators</h2>
          <div className="space-y-3">
            {[
              { name: 'DevMaster', revenue: formatCurrency(45000), subscribers: '125K', growth: '+12%' },
              { name: 'GameMaster', revenue: formatCurrency(38000), subscribers: '98K', growth: '+8%' },
              { name: 'Vlog Master', revenue: formatCurrency(32000), subscribers: '76K', growth: '+15%' },
            ].map((creator, idx) => (
              <div key={idx} className={`p-3 rounded flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div>
                  <p className="font-bold">{creator.name}</p>
                  <p className="text-xs text-gray-500">{creator.subscribers} subscribers</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-500">{creator.revenue}</p>
                  <p className="text-xs text-green-500">↑ {creator.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Platform Insights</h2>
          <div className="space-y-3">
            {[
              { metric: 'Avg Session Duration', value: '28 min', trend: '↑ +15%' },
              { metric: 'Daily Active Users', value: '234K', trend: '↑ +8%' },
              { metric: 'Upload Rate', value: '1,234/day', trend: '↑ +22%' },
              { metric: 'Engagement Rate', value: '4.2%', trend: '↑ +0.3%' },
            ].map((insight, idx) => (
              <div key={idx} className={`p-3 rounded flex justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="font-semibold">{insight.metric}</p>
                <div className="text-right">
                  <p className="font-bold">{insight.value}</p>
                  <p className="text-xs text-green-500">{insight.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
