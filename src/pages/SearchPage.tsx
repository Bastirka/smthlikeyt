import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockVideos, categories } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import { useTheme } from '../contexts/ThemeContext';

const SearchPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedFilter, setSelectedFilter] = useState('all');

  const results = mockVideos.filter(video =>
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.description.toLowerCase().includes(query.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredResults = selectedFilter === 'all'
    ? results
    : results.filter(v => v.category === selectedFilter);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Search results for "<span className="text-blue-600">{query}</span>"
      </h1>

      {/* Filters */}
      <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="font-semibold mb-3">Filter by category:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white'
                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.slice(1).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white'
                  : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredResults.length > 0 ? (
        <div className="space-y-4">
          {filteredResults.map((video) => (
            <VideoCard key={video.id} video={video} variant="list" />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="text-2xl font-bold mb-2">No results found</h2>
          <p className="text-gray-500">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
