import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskQuiz from './TaskQuiz';
import SubmissionHistory from './SubmissionHistory';
import SubmissionChart from './SubmissionChart';
import AverageTimeChart from './AverageTimeChart';
import Leaderboard from './Leaderboard';
import MyScoreCard from './MyScoreCard'; // ✅ Import added

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        {/* Navigation */}
        <nav style={{ padding: '1rem 2rem', background: '#343a40', color: '#fff', display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>🏠 Task Quiz</Link>
          <Link to="/history" style={{ color: '#fff', textDecoration: 'none' }}>📊 Submission History</Link>
          <Link to="/leaderboard" style={{ color: '#fff', textDecoration: 'none' }}>🏆 Leaderboard</Link>
        </nav>

        {/* Main Routes */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MyScoreCard /> {/* ✅ Show current score on homepage */}
                  <TaskQuiz />
                </>
              }
            />
            <Route
              path="/history"
              element={
                <>
                  <SubmissionHistory />
                  <div style={{ marginTop: '3rem' }}>
                    <SubmissionChart />
                  </div>
                  <div style={{ marginTop: '3rem' }}>
                    <AverageTimeChart />
                  </div>
                </>
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
