import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './Auth.module.css';
import logo from '../../Images/headerLogo.png';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7676/api/login', {
        email,
        password,
        role: 'admin' // Force admin role
      });

      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify({
        email: res.data.email,
        role: 'admin'
      }));

      alert("Admin Login Successful");
      navigate('/admin');

    } catch (error) {
      setError('Admin login failed: ' + (error.response?.data.message || error.message));
    }
  };

  return (
    <section>
    <Link to="/"><img className={classes.loginLogo} src={logo} alt="Ethiopian Railways Logo" /></Link>
    <div className={classes.container}>
      <h2>Admin Login</h2>
      {error && <p className='text-danger'>{error}</p>}
      
      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login as an Admin</button>
      </form>

      <p>
        <a href="/login">← Back to regular login</a>
      </p>
    </div>
    </section>
  );
};

export default AdminLogin;
