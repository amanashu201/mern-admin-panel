import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await await axios.post('http://localhost:5000/api/register', {
        f_userName: email, // or let user set their username separately
        f_Pwd: password
    });

      setSuccess('Registration successful! You can now log in.');
      navigate('/login'); // Redirect immediately after success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: 'auto',
      padding: '2rem',
      background: '#f9fafb',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      marginTop: '5vh'
    }}>
      <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            value={password}
            onChange={e => setPassword(e.target.value)}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;