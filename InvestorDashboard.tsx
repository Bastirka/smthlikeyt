// pages/InvestorDashboard.tsx
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const InvestorDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const metrics = [
    { label: 'Monthly Active Users', value: '2.4M', change: '+23%', trend: 'up' },
    { label: 'Daily Active Users', value: '892K', change: '+15%', trend: 'up' },
    { label: 'Total Watch Hours', value: '12.8M', change: '+45%', trend: 'up' },
    { label: 'Creator Count', value: '18.4K', change: '+32%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$1.2M', change: '+67%', trend: 'up' },
    { label: 'Ad Revenue', value: '$723K', change: '+28%', trend: 'up' },
    { label: 'Subscription Revenue', value: '$342K', change: '+89%', trend: 'up' },
    { label: 'Marketplace Revenue', value: '$157K', change: '+156%', trend: 'up' },
    { label: 'Retention Rate (Day 30)', value: '68%', change: '+5%', trend: 'up' },
    { label: 'Churn Rate', value: '4.2%', change: '-0.8%', trend: 'down' },
  ];

  const growthData = [
    { month: 'Jan', mau: 1.2, revenue: 450, watchHours: 5.2 },
    { month: 'Feb', mau: 1.5, revenue: 520, watchHours: 6.1 },
    { month: 'Mar', mau: 1.8, revenue: 680, watchHours: 7.5 },
    { month: 'Apr', mau: 2.0, revenue: 790, watchHours: 8.9 },
    { month: 'May', mau: 2.2, revenue: 950, watchHours: 10.4 },
    { month: 'Jun', mau: 2.4, revenue: 1200, watchHours: 12.8 },
  ];

  const categoryData = [
    { name: 'Gaming', value: 35, color: '#8B5CF6' },
    { name: 'Music', value: 22, color: '#EC4899' },
    { name: 'Education', value: 18, color: '#10B981' },
    { name: 'News', value: 12, color: '#F59E0B' },
    { name: 'Sports', value: 8, color: '#EF4444' },
    { name: 'Business', value: 5, color: '#3B82F6' },
  ];

  const exportReport = () => {
    const csv = metrics.map(m => `${m.label},${m.value},${m.change}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investor-report-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Investor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time platform analytics & growth metrics</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metrics.slice(0, 5).map((metric) => (
          <div key={metric.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">{metric.label}</p>
            <p className="text-2xl font-bold dark:text-white mt-1">{metric.value}</p>
            <p className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change}
            </p>
          </div>
        ))}
      </div>

      {/* Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold dark:text-white mb-4">Growth Trajectory</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={growthData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($K)" />
            <Line yAxisId="right" type="monotone" dataKey="mau" stroke="#10B981" name="MAU (M)" />
            <Line yAxisId="left" type="monotone" dataKey="watchHours" stroke="#F59E0B" name="Watch Hours (M)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold dark:text-white mb-4">Content Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold dark:text-white mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            {[
              { source: 'Advertising', amount: '$723K', percent: 60 },
              { source: 'Subscriptions', amount: '$342K', percent: 28 },
              { source: 'Marketplace', amount: '$157K', percent: 12 },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.source}</span>
                  <span className="font-semibold dark:text-white">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm overflow-x-auto">
        <h2 className="text-xl font-semibold dark:text-white mb-4">Detailed Metrics</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4">Metric</th>
              <th className="text-right py-3 px-4">Value</th>
              <th className="text-right py-3 px-4">Change</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.label} className="border-b border-gray-100 dark:border-gray-700/50">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{metric.label}</td>
                <td className="py-3 px-4 text-right font-semibold dark:text-white">{metric.value}</td>
                <td className={`py-3 px-4 text-right ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorDashboard;
