// src/components/ProtectedRoute.js

import React from 'react';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); 

  if (!token) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem' }}>
        <h2>🔐 Access Denied</h2>
        <p>You must <a href="/login">log in</a> to access this page.</p>
        <p>Don’t have an account? <a href="/register">Register here</a>.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
