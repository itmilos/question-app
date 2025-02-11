import React from 'react';
import { Link } from 'react-router-dom';

function Home({ handleCategorySelect, isDarkMode }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        {['friends', 'couples', 'family'].map(category => (
          <button 
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 w-full sm:w-auto ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-900'
            } shadow-lg`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Please select a category
      </div>
    </div>
  );
}

export default Home; 