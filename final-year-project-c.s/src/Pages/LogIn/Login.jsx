import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegularLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7676/api/login', {
        email,
        password,
        role: 'user' // Default role for regular login
      });
      
      localStorage.setItem('user', JSON.stringify({
        email: res.data.email,
        role: res.data.role
      }));
      
      // Redirect based on role
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else if (res.data.role === 'conductor') {
        navigate('/conductor');
      } else {
        alert("Login Successsful!");
        navigate('/');
      }
    } catch (error) {
      setError('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Regular Login Form */}
      <form onSubmit={handleRegularLogin}>
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
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Login
        </button>
      </form>

      {/* Admin Login Button */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => navigate('/admin/login')}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login as Administrator
        </button>
      </div>

      <p style={{ marginTop: '20px' }}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;