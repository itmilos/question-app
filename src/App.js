import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import questionsData from './questions.js';
import axios from 'axios';
import Home from './Home';
import SubCategory from './SubCategory';
import Question from './Question';
import StaffKudos from './StaffKudos'; // Import the new component

const API_URL = "https://questions-api-qng6.onrender.com/api";
// const API_URL = "http://localhost:3001/api";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const navigate = useNavigate();

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

  // Add useEffect for system dark mode preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Update category selection handler to reset subcategory and navigate
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());

    if (category === 'family') {
      getRandomQuestion(category, null)
        .then(() => navigate('/question'));
    } else {
      navigate('/subcategory');
    }
  };

  // Add subcategory selection handler with navigation
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    getRandomQuestion(selectedCategory, subCategory)
      .then(() => navigate('/question'));
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
    setSelectedSubCategory(null);
    setCurrentQuestion(null);
    setUsedQuestions(new Set());
    navigate('/');
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
        ) : (
          <Routes>
            <Route path="/" element={
              <Home handleCategorySelect={handleCategorySelect} isDarkMode={isDarkMode} />
            } />

            <Route path="/subcategory" element={
              (selectedCategory === 'friends' || selectedCategory === 'couples') ? (
                <SubCategory 
                  selectedCategory={selectedCategory} 
                  handleSubCategorySelect={handleSubCategorySelect} 
                  isDarkMode={isDarkMode} 
                />
              ) : (
                <Question 
                  currentQuestion={currentQuestion} 
                  isDarkMode={isDarkMode} 
                  getNextQuestion={() => getRandomQuestion()} 
                />
              )
            } />

            <Route path="/question" element={
              <>
                {message && <div className="text-center text-red-500 mb-4">{message}</div>}
                <Question 
                  currentQuestion={currentQuestion} 
                  isDarkMode={isDarkMode} 
                  getNextQuestion={() => getRandomQuestion()} 
                />
              </>
            } />

            {/* New Staff Kudos Route */}
            <Route path="/staff-kudos" element={
              <StaffKudos isDarkMode={isDarkMode} />
            } />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;