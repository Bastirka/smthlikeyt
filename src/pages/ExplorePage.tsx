import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import CategoryBar from '../components/CategoryBar';
import { mockVideos } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const ExplorePage: React.FC = () => {
  const { category } = useParams() || { category: 'all' };
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    navigate(`/explore/${cat}`);
  };

  const filteredVideos = selectedCategory === 'all'
    ? mockVideos
    : mockVideos.filter(v => v.category === selectedCategory);

  const categoryEmojis: { [key: string]: string } = {
    all: '🌐',
    technology: '💻',
    gaming: '🎮',
    music: '🎵',
    fitness: '💪',
    lifestyle: '🌟',
    education: '📚',
    entertainment: '🎬',
    sports: '⚽',
    cooking: '🍳',
    art: '🎨',
    business: '💼',
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {categoryEmojis[selectedCategory]} {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h1>
        <p className="text-gray-500">Explore content in this category</p>
      </div>

      {/* Category Navigation */}
      <CategoryBar categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-gray-500 text-lg">No videos found in this category</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
