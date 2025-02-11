import { useState, useEffect } from 'react';
import questionsData from './questions.js';
import axios from 'axios';

const API_URL = "https://questions-api-qng6.onrender.com/api";
// const API_URL = "http://localhost:3001/api";
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Move axios instance and interceptors inside component
  const api = axios.create({
    baseURL: API_URL
  });

  // Request interceptor
  api.interceptors.request.use(
    config => {
      setIsLoading(true);
      return config;
    },
    error => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    response => {
      setIsLoading(false);
      return response;
    },
    error => {
      setIsLoading(false);
      return Promise.reject(error);
    }
  );

  // Initialize questions and get user's viewed questions
  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        const response = await api.get("/user-info");
        setUsedQuestions(new Set(response.data));
        setQuestions(questionsData);
      } catch (error) {
        setMessage('Error initializing questions');
        console.error(error);
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

  // Update category selection handler to reset subcategory
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    
    // Immediately get a question if family category is selected
    if (category === 'family') {
      getRandomQuestion(category, null);
    }
  };

  // Add subcategory selection handler
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    getRandomQuestion(selectedCategory, subCategory);
  };

  // Update getRandomQuestion to handle subcategories
  const getRandomQuestion = async (categoryOverride = null, subCategoryOverride = null) => {
    const category = categoryOverride || selectedCategory;
    const subCategory = subCategoryOverride || selectedSubCategory;
    
    // Filter questions by category, subcategory, and unused status
    const availableQuestions = questionsData.filter(q => {
      const categoryMatch = category ? q.category === category : true;
      // Only check subCategory if it's not the family category
      const subCategoryMatch = category === 'family' ? true : (subCategory ? q.subCategory === subCategory : true);
      return !usedQuestions.has(String(q.id)) && categoryMatch && subCategoryMatch;
    });

    if (availableQuestions.length === 0) {
      if (subCategory) {
        setMessage(`You've seen all questions in this subcategory! Try another one:`);
      } else {
        setMessage(`You've seen all questions in this category! Try another one:`);
      }
      setCurrentQuestion(null);
      return;
    }

    setMessage('');
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    try {
      await api.post("/record-view", {
        questionId: selectedQuestion.id
      });
      
      setUsedQuestions(prev => new Set(prev).add(String(selectedQuestion.id)));
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


        {selectedCategory && (
          <button
            onClick={handleBack}
            className={`absolute left-4 top-4 p-2 ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } rounded-xl shadow-lg transition-all transform hover:scale-105`}
            aria-label="Back to categories"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute right-4 top-4 p-2 ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
          } rounded-xl shadow-lg transition-all transform hover:scale-105`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <h1 className={`text-4xl md:text-4xl text-2xl font-bold text-center mb-8 mt-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Random Questions
        </h1>

        {isLoading ? (
          <div className="space-y-4">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors`}>
              <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-4 animate-pulse`}></div>
              <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4 animate-pulse`}></div>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <div className={`w-32 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg animate-pulse`} />
            </div>
          </div>
        ) : !selectedCategory ? (
          <>
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
          </>
        ) : selectedCategory === 'family' ? (
          <>
            {message && <div className="text-center text-red-500 mb-4">{message}</div>}
            {currentQuestion && (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 sm:p-8 transition-colors`}>
                <h2 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Category: {currentQuestion.category}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-base sm:text-lg`}>
                  {currentQuestion.text}
                </p>
              </div>
            )}
            
            {currentQuestion && (
              <button 
                onClick={() => getRandomQuestion()} 
                className={`mt-6 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 w-full shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-900'
                }`}
              >
                Next Question
              </button>
            )}
          </>
        ) : selectedCategory && (selectedCategory === 'friends' || selectedCategory === 'couples') && !selectedSubCategory ? (
          <>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              {['genx', 'geny', 'genz'].map(subCategory => (
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
        ) : (
          <>
            {message && <div className="text-center text-red-500 mb-4">{message}</div>}
            {currentQuestion && (
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
            )}
            
            {currentQuestion && (
              <button 
                onClick={() => getRandomQuestion()} 
                className={`mt-6 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 w-full shadow-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-900'
                }`}
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