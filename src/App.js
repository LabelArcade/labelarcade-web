import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';

import TaskQuiz from './TaskQuiz';
import SubmissionHistory from './SubmissionHistory';
import SubmissionChart from './SubmissionChart';
import AverageTimeChart from './AverageTimeChart';
import Leaderboard from './Leaderboard';
import MyScoreCard from './MyScoreCard';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

const ScrollToTop = () => {
  const { pathname } = require('react-router-dom').useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        
        {/* 🌐 Navigation Bar */}
        <nav style={{
          padding: '1rem 2rem',
          background: '#343a40',
          color: '#fff',
          display: 'flex',
          gap: '1rem'
        }}>
          <NavLink to="/" end style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>🏠 Home</NavLink>

          <NavLink to="/quiz" style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>🧠 Task Quiz</NavLink>

          <NavLink to="/history" style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>📊 Submission History</NavLink>

          <NavLink to="/leaderboard" style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>🏆 Leaderboard</NavLink>

          <NavLink to="/register" style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>📝 Register</NavLink>

          <NavLink to="/login" style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>🔐 Login</NavLink>

          <NavLink to="/logout" style={({ isActive }) => ({
            color: isActive ? '#00d1b2' : '#fff',
            textDecoration: 'none'
          })}>🚪 Logout</NavLink>
        </nav>

        {/* 🚀 Routes */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            {/* 🏠 Public Home */}
            <Route path="/" element={<Home />} />

            {/* 🔐 Protected Routes */}
            <Route path="/quiz" element={
              <ProtectedRoute>
                <>
                  <MyScoreCard />
                  <TaskQuiz />
                </>
              </ProtectedRoute>
            } />

            <Route path="/history" element={
              <ProtectedRoute>
                <>
                  <SubmissionHistory />
                  <div style={{ marginTop: '3rem' }}><SubmissionChart /></div>
                  <div style={{ marginTop: '3rem' }}><AverageTimeChart /></div>
                </>
              </ProtectedRoute>
            } />

            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />

            {/* 🌐 Public Routes */}
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
