import React from 'react';

function Question({ currentQuestion, isDarkMode, getNextQuestion }) {
  if (!currentQuestion) return null;

  return (
    <>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 sm:p-8 transition-colors`}>
        <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          Category: {currentQuestion.category}
          {currentQuestion.subCategory && ` - ${currentQuestion.subCategory === 'genx' ? 'Gen X' : 
                                             currentQuestion.subCategory === 'geny' ? 'Gen Y' : 
                                             'Gen Z'}`}
        </h2>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base sm:text-lg`}>
          {currentQuestion.text}
        </p>
      </div>
      
      <button 
        onClick={getNextQuestion} 
        className={`mt-6 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 w-full shadow-lg ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-900'
        }`}
      >
        Next Question
      </button>
    </>
  );
}

export default Question; 