import { useState, useEffect } from 'react';
import questionsData from './questions.js';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize questions and get user's viewed questions
  useEffect(() => {
    const initializeQuestions = async () => {
      setIsLoading(true);
      try {
        // Create a promise that resolves after 1 second
        const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get user's viewed questions from server
        const response = await fetch("http://localhost:3001/api/user-info");
        const data = await response.json();
        setUsedQuestions(new Set(data));
        
        setQuestions(questionsData);
        
        // Wait for both the data and the minimum delay
        await minDelay;
      } catch (error) {
        setMessage('Error initializing questions');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuestions();
  }, []);

  // Add new useEffect to set initial question when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && currentQuestion === null) {
      getRandomQuestion();
    }
  }, [questions]);

  // Add useEffect for system dark mode preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Add category selection handler
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    getRandomQuestion(category);
  };

  const getRandomQuestion = async (categoryOverride = null) => {
    const category = categoryOverride || selectedCategory;
    
    // Filter questions by category and unused status
    const availableQuestions = questionsData.filter(q => 
      !usedQuestions.has(String(q.id)) && 
      (category ? q.category === category : true)
    );

    if (availableQuestions.length === 0) {
      // Get remaining categories that have unused questions
      const remainingCategories = ['friends', 'couples'].filter(cat => 
        cat !== category && 
        questionsData.some(q => q.category === cat && !usedQuestions.has(String(q.id)))
      );

      if (remainingCategories.length > 0) {
        setMessage(`You've seen all ${category} questions! Try another category:`);
        setCurrentQuestion(null);
        return;
      } else {
        setMessage(`You've seen all questions! Starting over.`);
        setUsedQuestions(new Set());
        const newAvailableQuestions = questions.filter(q => q.category === category);
        const randomIndex = Math.floor(Math.random() * newAvailableQuestions.length);
        const selectedQuestion = newAvailableQuestions[randomIndex];
        setCurrentQuestion(selectedQuestion);
        return;
      }
    }

    setMessage('');
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    try {
      // Record viewed question on server
      await fetch("http://localhost:3001/api/record-view", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId: selectedQuestion.id }),
      });
      
      setUsedQuestions(prev => new Set(prev).add(String(selectedQuestion.id)));  // Convert ID to string
      setCurrentQuestion(selectedQuestion);
    } catch (error) {
      setMessage('Error recording question view');
      console.error(error);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl relative">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute right-4 top-4 p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {selectedCategory && (
          <button
            onClick={handleBack}
            className={`absolute left-4 top-4 p-2 ${
              isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
            } transition-colors`}
            aria-label="Back to categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}

        <h1 className={`text-4xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Random Questions
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-center gap-4 mb-6">
              {[1, 2].map((i) => (
                <div key={i} className={`w-32 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg animate-pulse`} />
              ))}
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors`}>
              <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-4 animate-pulse`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 animate-pulse`}></div>
            </div>
          </div>
        ) : !selectedCategory ? (
          <>
            <div className="flex justify-center gap-4 mb-6">
              {['friends', 'couples', 'family'].map(category => (
                <button 
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
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
          </>
        ) : (
          <>
            {message && <div className="text-center text-red-500 mb-4">{message}</div>}
            {currentQuestion ? (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 transition-colors`}>
                <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Category: {currentQuestion.category}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                  {currentQuestion.text}
                </p>
              </div>
            ) : (
              <div className="flex justify-center gap-4 mb-6">
                {['friends', 'couples', 'family'].map(cat => 
                  cat !== selectedCategory && (
                    <button 
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="px-6 py-2 rounded-lg font-medium transition-colors bg-gray-200 hover:bg-gray-300"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  )
                )}
              </div>
            )}
            
            {currentQuestion && (
              <button 
                onClick={() => getRandomQuestion()} 
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium 
                  hover:bg-blue-700 transition-all transform hover:scale-105 w-full shadow-lg"
              >
                Next Question
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;