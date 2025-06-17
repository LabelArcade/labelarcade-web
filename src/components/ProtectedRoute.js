// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>🔐 Login Required</h2>
        <p>You must <a href="/login">log in</a> to access this page.</p>
        <p>Don't have an account? <a href="/register">Register here</a>.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
