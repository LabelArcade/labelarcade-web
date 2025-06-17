import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Registration successful for ${email}`);

        // Auto login after registration
        const loginResponse = await fetch(
          `${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          }
        );

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.token) {
          localStorage.setItem('authToken', loginData.token);
          setShowToast(true);
          setTimeout(() => {
            navigate('/quiz');
          }, 1500);
        } else {
          setMessage('⚠️ Login failed after registration. Please login manually.');
        }
      } else {
        setMessage(`❌ ${data.error || 'Registration failed'}`);
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      setMessage('❌ Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>📝 Create Your LabelArcade Account</h2>
      <input
        type="text"
        placeholder="👤 Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
      />
      <input
        type="email"
        placeholder="📧 Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
      />
      <input
        type="password"
        placeholder="🔑 Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
      />
      <button
        onClick={handleRegister}
        style={{
          padding: '0.6rem 1.2rem',
          background: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '0.5rem',
        }}
      >
        🚀 Register
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {showToast && (
        <div
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '1rem',
            marginTop: '1rem',
            borderRadius: '5px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          🎉 Account created! You’re now logged in.
        </div>
      )}
    </div>
  );
}

export default Register;
