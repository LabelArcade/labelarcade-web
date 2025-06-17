// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #141E30, #243B55)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯 Welcome to <span style={{ color: '#00FFC6' }}>LabelArcade</span>!</h1>
      <p style={{ fontSize: '1.3rem', maxWidth: '600px', marginBottom: '2rem' }}>
        🧠 A fun way to help AI learn while earning points and badges.<br />
        Start your journey today by logging in or signing up!
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login" style={buttonStyle}>🔐 Login</Link>
        <Link to="/register" style={{ ...buttonStyle, backgroundColor: '#FF6B81' }}>📝 Register</Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#00C9A7',
  padding: '0.8rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: 'background 0.3s ease',
};

