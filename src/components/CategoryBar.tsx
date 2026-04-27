import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium ${
            selectedCategory === category
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
