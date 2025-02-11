import React from 'react';

function SubCategory({ selectedCategory, handleSubCategorySelect, isDarkMode }) {
  const subCategories = ['genx', 'geny', 'genz'];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        {subCategories.map(subCategory => (
          <button 
            key={subCategory}
            onClick={() => handleSubCategorySelect(subCategory)}
            className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 w-full sm:w-auto ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-900'
            } shadow-lg`}
          >
            {subCategory === 'genx' ? 'Gen X' : 
             subCategory === 'geny' ? 'Gen Y' : 
             'Gen Z'}
          </button>
        ))}
      </div>
      <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Please select a generation
      </div>
    </>
  );
}

export default SubCategory; 