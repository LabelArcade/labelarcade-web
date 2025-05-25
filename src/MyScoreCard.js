import React, { useEffect, useState } from 'react';

function MyScoreCard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text(); // log raw error
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          setProfile(data);
        }
      })
      .catch(err => {
        console.error('❌ Failed to fetch user profile:', err);
        setError(err.message); // Optional: display on UI
      });
  }, []);

  if (error) {
    return (
      <div style={{ color: 'red', marginBottom: '1rem' }}>
        ⚠️ Could not load profile: {error}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div style={{
      backgroundColor: '#e9f7ef',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h3>👋 Welcome, {profile.email}</h3>
      <p>Your Current Score: <strong style={{ fontSize: '1.4rem' }}>{profile.score} 🏆</strong></p>
    </div>
  );
}

export default MyScoreCard;
