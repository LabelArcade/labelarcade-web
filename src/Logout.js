// src/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth token
    localStorage.removeItem('authToken');

    // Optional: delay before redirect
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>👋 You have been logged out.</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
}

export default Logout;
