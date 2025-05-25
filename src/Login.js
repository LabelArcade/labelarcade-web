import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        setMessage('✅ Login successful! Redirecting...');
        navigate('/');
      } else {
        setMessage(`❌ ${data.error || 'Login failed'}`);
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setMessage('❌ Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', margin: '0.5rem 0' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', margin: '0.5rem 0' }}
      />
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>Login</button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default Login;
