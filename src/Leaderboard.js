import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/leaderboard`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('❌ Leaderboard fetch error:', err));
  }, []);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
            <th style={{ padding: '0.5rem' }}>Rank</th>
            <th style={{ padding: '0.5rem' }}>Email</th>
            <th style={{ padding: '0.5rem' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const rankIcons = ['🥇', '🥈', '🥉'];
            return (
              <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                  {rankIcons[index] || index + 1}
                </td>
                <td style={{ padding: '0.5rem' }}>{user.email}</td>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>{user.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
