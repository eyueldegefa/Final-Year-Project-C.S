import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7676/api/register', { email, password });
      navigate('/');
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
    }
  };

  return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Register
          </button>
        </form>
        <p style={{ marginTop: '10px' }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
  );
};

export default Register;