// pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import { mockVideos, mockTrending, mockShorts, mockLiveStreams } from '../data/mockData';
import CategoryBar from '../components/CategoryBar';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'recommended' | 'shorts' | 'live'>('trending');

  const getVideos = () => {
    switch (activeTab) {
      case 'trending': return mockTrending;
      case 'recommended': return mockVideos;
      case 'shorts': return mockShorts;
      case 'live': return mockLiveStreams;
      default: return mockVideos;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to StreamHub Pro</h1>
        <p className="text-lg opacity-90">Discover amazing content from creators worldwide</p>
      </div>

      {/* Category Bar */}
      <CategoryBar />

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        {['trending', 'recommended', 'shorts', 'live'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 font-semibold capitalize transition-colors ${
              activeTab === tab
                ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab === 'live' ? '🔴 Live Now' : tab}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getVideos().map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Shorts Section */}
      {activeTab === 'shorts' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockShorts.map((short) => (
            <div key={short.id} className="aspect-[9/16] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;