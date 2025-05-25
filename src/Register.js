import React, { useState } from 'react';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || 'Registration failed'}`);
        return;
      }

      // ✅ After successful registration, login to get token
      const loginRes = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setMessage(`⚠️ Registered, but login failed: ${loginData.error}`);
        return;
      }

      // ✅ Save token
      localStorage.setItem('authToken', loginData.token);

      setMessage(`✅ Registration successful for ${form.email}`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} value={form.username} style={{ width: '100%', marginBottom: 10 }} />
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} style={{ width: '100%', marginBottom: 10 }} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} style={{ width: '100%', marginBottom: 10 }} />
      <button onClick={handleRegister} style={{ padding: '8px 16px' }}>Register</button>
      {message && (
        <p style={{ marginTop: 16, color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
}

export default Register;
