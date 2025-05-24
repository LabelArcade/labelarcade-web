import React, { useEffect, useState } from 'react';

function MyScoreCard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setProfile(data);
        }
      })
      .catch(err => console.error('❌ Failed to fetch user profile:', err));
  }, []);

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
