import React, { useState } from 'react';
import { mockVideos, mockShorts, mockLiveStreams, mockTrendingVideos, categories } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVideos = selectedCategory === 'all' 
    ? mockVideos 
    : mockVideos.filter(v => v.category === selectedCategory);

  return (
    <div>
      {/* Hero Section with Live Streams */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🔴 Live Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLiveStreams.map((video) => (
            <div key={video.id} className="relative rounded-lg overflow-hidden cursor-pointer group">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition">
                <div className="text-center">
                  <div className="bg-red-600 animate-pulse rounded-full px-4 py-2 inline-block mb-2">
                    <span className="text-white font-bold">● LIVE</span>
                  </div>
                  <p className="text-white font-semibold">{video.title}</p>
                  <p className="text-red-400 text-sm">{video.viewerCount?.toLocaleString()} watching</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Bar */}
      <CategoryBar categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Trending Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockTrendingVideos.slice(0, 8).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      {/* Recommended Videos */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">👎 Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      {/* Shorts Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📱 Shorts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mockShorts.map((video) => (
            <div key={video.id} className="cursor-pointer group rounded-lg overflow-hidden">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 rounded px-2 py-1 text-white text-xs font-semibold line-clamp-1">
                  {video.title}
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-1 py-0.5 rounded text-xs text-white">
                  0:30
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
