import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatDate } from '../utils/formatters';

const AdminPanel: React.FC = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">⚙️ Admin Panel</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-700 overflow-x-auto">
        {['users', 'content', 'reports', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium transition whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Users', value: '125,432', change: '+12.5%' },
              { label: 'Active Today', value: '45,231', change: '+8.3%' },
              { label: 'Creators', value: '5,421', change: '+2.1%' },
              { label: 'Verified', value: '2,134', change: '+15%' },
            ].map((stat, idx) => (
              <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-green-500 text-sm">↑ {stat.change}</p>
              </div>
            ))}
          </div>

          <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { user: 'DevMaster', type: 'Creator', status: 'Active', joined: '2023-01-15' },
                    { user: 'GameMaster', type: 'Creator', status: 'Active', joined: '2022-06-20' },
                    { user: 'John Viewer', type: 'Viewer', status: 'Inactive', joined: '2024-01-10' },
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <td className="px-6 py-3">{row.user}</td>
                      <td className="px-6 py-3">{row.type}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded ${
                          row.status === 'Active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">{row.joined}</td>
                      <td className="px-6 py-3">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mb-6">
            Review Flagged Content
          </button>
          <div className="space-y-4">
            {[
              { title: 'Video Title 1', creator: 'User123', status: 'Pending Review', reason: 'Copyright claim' },
              { title: 'Video Title 2', creator: 'Creator456', status: 'Approved', reason: 'None' },
              { title: 'Video Title 3', creator: 'User789', status: 'Rejected', reason: 'Policy violation' },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-500">by {item.creator}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded ${
                    item.status === 'Approved' ? 'bg-green-600 text-white' :
                    item.status === 'Pending Review' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">Reason: {item.reason}</p>
                {item.status === 'Pending Review' && (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700 transition text-sm font-bold">
                      Approve
                    </button>
                    <button className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 transition text-sm font-bold">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Content Reports</h2>
          <div className="space-y-3">
            {[
              { type: 'Spam', count: 234, change: '+15' },
              { type: 'Copyright', count: 89, change: '+5' },
              { type: 'Harassment', count: 45, change: '-2' },
              { type: 'Misinformation', count: 67, change: '+8' },
            ].map((report, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded hover:bg-gray-700 transition">
                <span className="font-semibold">{report.type}</span>
                <div className="text-right">
                  <p className="font-bold">{report.count}</p>
                  <p className="text-xs text-gray-500">{report.change} this week</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-2xl`}>
          <h2 className="text-xl font-bold mb-6">Platform Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition">
              <span className="font-semibold">Maintenance Mode</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition">
              <span className="font-semibold">Require Email Verification</span>
              <input type="checkbox" checked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition">
              <span className="font-semibold">Enable Monetization</span>
              <input type="checkbox" checked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition">
              <span className="font-semibold">Allow User Uploads</span>
              <input type="checkbox" checked className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
