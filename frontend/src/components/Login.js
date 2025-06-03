import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [f_userName, setUsername] = useState('');
  const [f_Pwd, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { f_userName, f_Pwd });
      const { token, username } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      onLogin(true);
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(37,99,235,0.10)',
        marginTop: '7vh',
        border: '2px solid #2563eb'
      }}
    >
      <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '1.5rem' }}>Admin Panel Login</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Username:</label>
          <input
            type="text"
            value={f_userName}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #2563eb',
              marginTop: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={f_Pwd}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #2563eb',
              marginTop: '4px'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            background: '#2563eb',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <button
        onClick={handleRegister}
        style={{
          marginTop: '1rem',
          width: '100%',
          background: '#fbbf24',
          color: '#1e293b',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
    </div>
  );
};

export default Login;