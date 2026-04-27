import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatDate } from '../utils/formatters';

const StreamerPanel: React.FC = () => {
  const { darkMode } = useTheme();
  const [isLive, setIsLive] = useState(false);
  const [liveTitle, setLiveTitle] = useState('Gaming Session - Come Join!');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', user: 'User123', message: 'Great stream bro!', timestamp: new Date() },
    { id: '2', user: 'Gaming_Fan', message: 'Love the gameplay', timestamp: new Date(Date.now() - 60000) },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const stats = {
    viewers: 2340,
    maxViewers: 3200,
    duration: '2:34:12',
    followers: 125400,
  };

  const handleGoLive = () => {
    setIsLive(true);
  };

  const handleEndStream = () => {
    setIsLive(false);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now().toString(),
          user: 'You',
          message: newMessage,
          timestamp: new Date(),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎮 Streamer Panel</h1>

      {isLive ? (
        <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-red-900 bg-opacity-30 border border-red-700' : 'bg-red-50 border border-red-300'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-red-600">● LIVE NOW</h2>
            </div>
            <button
              onClick={handleEndStream}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-bold"
            >
              End Stream
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm">Current Viewers</p>
              <p className="text-3xl font-bold text-blue-600">{stats.viewers.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm">Peak Viewers</p>
              <p className="text-3xl font-bold">{stats.maxViewers.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm">Stream Duration</p>
              <p className="text-3xl font-bold">{stats.duration}</p>
            </div>
            <div className={`p-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <p className="text-gray-500 text-sm">Followers</p>
              <p className="text-3xl font-bold">{stats.followers.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-bold mb-4">Start a New Stream</h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Stream Title</label>
              <input
                type="text"
                value={liveTitle}
                onChange={(e) => setLiveTitle(e.target.value)}
                className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                  <option>Gaming</option>
                  <option>Creative</option>
                  <option>Music</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Language</label>
                <select className={`w-full px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleGoLive}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold text-lg"
          >
            🔴 Go Live
          </button>
        </div>
      )}

      {/* Stream Chat */}
      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-xl font-bold mb-4">💬 Live Chat</h2>
        <div className={`h-96 overflow-y-auto mb-4 p-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="space-y-3">
            {chatMessages.map(msg => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold">{msg.user}</p>
                  <p className="text-sm text-gray-500">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Send a message..."
            className={`flex-1 px-4 py-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamerPanel;
