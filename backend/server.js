const express = require('express');
const app = express();
const cors = require('cors');

// Get port from environment variable or use 3001 as default
const PORT = process.env.PORT || 3001;

// In-memory storage (replace with database in production)
const viewedQuestions = new Map();

// Update CORS configuration for production
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000'
// }));
app.use(cors());
app.use(express.json());

// Get client IP and viewed questions
app.get('/api/user-info', (req, res) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const userViewedQuestions = viewedQuestions.get(clientIP) || new Set();
  
  res.json({
    ip: clientIP,
    viewedQuestions: Array.from(userViewedQuestions)
  });
});

// Record viewed question
app.post('/api/record-view', (req, res) => {
  const { questionId } = req.body;
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (!viewedQuestions.has(clientIP)) {
    viewedQuestions.set(clientIP, new Set());
  }
  
  viewedQuestions.get(clientIP).add(questionId);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 