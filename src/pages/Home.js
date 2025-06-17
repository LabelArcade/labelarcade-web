// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        🎯 Welcome to <span style={styles.brand}>LabelArcade</span>
      </h1>
      <p style={styles.subText}>
        🧠 Play fun micro-tasks, help train AI, earn XP & badges. <br />
        Join the annotation revolution today!
      </p>
      <div style={styles.buttonGroup}>
        <Link to="/login" style={{ ...styles.button, backgroundColor: '#00C9A7' }}>
          🔐 Login
        </Link>
        <Link to="/register" style={{ ...styles.button, backgroundColor: '#FF6B81' }}>
          📝 Register
        </Link>
      </div>
      <p style={styles.tip}>🚀 Pro tip: The earlier you start, the faster you rise on the leaderboard!</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #141E30, #243B55)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3.2rem',
    fontWeight: 'bold',
    marginBottom: '1.2rem',
  },
  brand: {
    color: '#00FFC6',
    textShadow: '0 0 8px #00FFC6',
  },
  subText: {
    fontSize: '1.4rem',
    maxWidth: '700px',
    lineHeight: '1.8',
    marginBottom: '2rem',
    color: '#e0f7fa',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '0.9rem 2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease',
  },
  tip: {
    marginTop: '2rem',
    fontSize: '1rem',
    color: '#b2ebf2',
    fontStyle: 'italic',
  },
};
