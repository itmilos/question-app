import { useState, useEffect } from 'react';
import questionsData from './questions.js';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize questions and get user's viewed questions
  useEffect(() => {
    const initializeQuestions = async () => {
      setIsLoading(true);
      try {
        // Create a promise that resolves after 1 second
        const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get user's viewed questions from server
        const response = await fetch('http://localhost:3001/api/user-info');
        const data = await response.json();
        setUsedQuestions(new Set(data.viewedQuestions));
        
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

  const getRandomQuestion = async () => {
    // Convert IDs to strings to ensure consistent comparison
    const availableQuestions = questions.filter(q => !usedQuestions.has(String(q.id)));

    if (availableQuestions.length === 0) {
      setMessage("You've seen all questions! Starting over.");
      setUsedQuestions(new Set());
      return;
    }

    setMessage('');
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    try {
      // Record viewed question on server
      await fetch('http://localhost:3001/api/record-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId: selectedQuestion.id }),
      });
      
      setUsedQuestions(prev => new Set(prev).add(selectedQuestion.id));
      setCurrentQuestion(selectedQuestion);
    } catch (error) {
      setMessage('Error recording question view');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Random Questions</h1>
      
      {message && <div className="message">{message}</div>}
      
      {isLoading ? (
        <div className="question-card skeleton">
          <div className="skeleton-category"></div>
          <div className="skeleton-text"></div>
        </div>
      ) : currentQuestion && (
        <div className="question-card">
          <h2>Category: {currentQuestion.category}</h2>
          <p>{currentQuestion.text}</p>
        </div>
      )}

      <button onClick={getRandomQuestion} disabled={isLoading}>Next Question</button>
    </div>
  );
}

export default App;