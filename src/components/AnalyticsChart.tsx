import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface AnalyticsChartProps {
  data: any[];
  type?: 'line' | 'bar' | 'pie';
  title?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, type = 'line', title }) => {
  const { darkMode } = useTheme();

  const chartConfig = {
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
    stroke: darkMode ? '#9CA3AF' : '#6B7280',
  };

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}

      <ResponsiveContainer width="100%" height={300}>
        {type === 'line' ? (
          <LineChart data={data} margin={chartConfig.margin}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.stroke} />
            <XAxis stroke={chartConfig.stroke} />
            <YAxis stroke={chartConfig.stroke} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#FFFFFF' }} />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        ) : type === 'bar' ? (
          <BarChart data={data} margin={chartConfig.margin}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.stroke} />
            <XAxis stroke={chartConfig.stroke} />
            <YAxis stroke={chartConfig.stroke} />
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#FFFFFF' }} />
            <Legend />
            <Bar dataKey="views" fill="#3B82F6" />
            <Bar dataKey="clicks" fill="#EF4444" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} label dataKey="value" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#FFFFFF' }} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
