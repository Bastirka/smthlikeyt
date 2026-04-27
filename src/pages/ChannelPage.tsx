import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockVideos } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import { useTheme } from '../contexts/ThemeContext';

const ChannelPage: React.FC = () => {
  const { channelId } = useParams();
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('videos');
  const [subscribed, setSubscribed] = useState(false);

  // Mock channel data
  const channel = {
    name: 'DevMaster',
    subscribers: 125400,
    views: 12540000,
    verified: true,
    description: 'Full-stack developer teaching web development, programming tutorials, and tech reviews.',
    coverImage: 'https://picsum.photos/id/102/1200/400',
    avatar: 'https://picsum.photos/id/1/100/100',
  };

  const channelVideos = mockVideos.filter(v => v.creatorId === 'creator1');

  return (
    <div>
      {/* Cover Image */}
      <div className="h-48 rounded-lg overflow-hidden mb-4">
        <img src={channel.coverImage} alt="Cover" className="w-full h-full object-cover" />
      </div>

      {/* Channel Header */}
      <div className={`p-6 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-start gap-6 mb-6">
          <img src={channel.avatar} alt={channel.name} className="w-24 h-24 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{channel.name}</h1>
              {channel.verified && <span className="text-blue-600 text-2xl">✓</span>}
            </div>
            <p className="text-gray-500 mb-3">
              {channel.subscribers.toLocaleString()} subscribers • {channel.views.toLocaleString()} views
            </p>
            <p className="text-sm mb-4">{channel.description}</p>
            <button
              onClick={() => setSubscribed(!subscribed)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                subscribed
                  ? darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-700">
          {['videos', 'playlists', 'community', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold transition ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'videos' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Videos ({channelVideos.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {channelVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'playlists' && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No playlists yet</p>
        </div>
      )}

      {activeTab === 'community' && (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <img src={channel.avatar} alt="Post" className="w-8 h-8 rounded-full" />
                  <span className="font-semibold">{channel.name}</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p>Check out my latest video! It's going to blow your mind 🚀</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-gray-500">{channel.description}</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Channel Details</h3>
              <ul className="space-y-2 text-sm">
                <li>Joined: January 1, 2023</li>
                <li>Total Views: {channel.views.toLocaleString()}</li>
                <li>Videos: {channelVideos.length}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Contact</h3>
              <p className="text-sm text-gray-500">Email: devmaster@example.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
