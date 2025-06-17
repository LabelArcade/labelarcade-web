import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskQuiz from './TaskQuiz';
import SubmissionHistory from './SubmissionHistory';
import SubmissionChart from './SubmissionChart';
import AverageTimeChart from './AverageTimeChart';
import Leaderboard from './Leaderboard';
import MyScoreCard from './MyScoreCard';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Home from './pages/Home'; // ✅ Home page added

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        
        {/* 🌐 Navigation Bar */}
        <nav style={{ padding: '1rem 2rem', background: '#343a40', color: '#fff', display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>🏠 Home</Link>
          <Link to="/quiz" style={{ color: '#fff', textDecoration: 'none' }}>🧠 Task Quiz</Link>
          <Link to="/history" style={{ color: '#fff', textDecoration: 'none' }}>📊 Submission History</Link>
          <Link to="/leaderboard" style={{ color: '#fff', textDecoration: 'none' }}>🏆 Leaderboard</Link>
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>📝 Register</Link>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>🔐 Login</Link>
          <Link to="/logout" style={{ color: '#fff', textDecoration: 'none' }}>🚪 Logout</Link>
        </nav>

        {/* 🚀 Routes */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/quiz"
              element={
                <>
                  <MyScoreCard />
                  <TaskQuiz />
                </>
              }
            />
            <Route
              path="/history"
              element={
                <>
                  <SubmissionHistory />
                  <div style={{ marginTop: '3rem' }}><SubmissionChart /></div>
                  <div style={{ marginTop: '3rem' }}><AverageTimeChart /></div>
                </>
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
