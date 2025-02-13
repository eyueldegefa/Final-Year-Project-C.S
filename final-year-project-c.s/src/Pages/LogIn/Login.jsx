import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

// In your Login component's handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // 1. Send the selected role to the backend
    const res = await axios.post('http://localhost:7676/api/login', {
      email,
      password,
      role // Use the selected role from state
    });
    
    // 2. Store the actual role from response
    localStorage.setItem('user', JSON.stringify({
      email: res.data.email,
      role: res.data.role // Use the role from backend response
    }));
    
    // 3. Navigate based on actual role
    switch(res.data.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'conductor':
        navigate('/conductor');
        break;
      default:
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
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Role: </label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{  padding: '5px' }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="conductor">Conductor</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
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
      <p style={{ marginTop: '10px' }}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;