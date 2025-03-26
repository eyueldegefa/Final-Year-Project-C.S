import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './Auth.module.css';
import logo from '../../Images/headerLogo.png';
import { Link } from 'react-router-dom';

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
        alert("Login Successful!");
        navigate('/');
      }
    } catch (error) {
      setError('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <section>
    <Link to="/"><img className={classes.loginLogo} src={logo} alt="Ethiopian Railways Logo" /></Link>
    <div className={classes.container}>
      <h2>Login</h2>
      {error && <p className='text-danger'>{error}</p>}
      
      {/* Regular Login Form */}
      <form onSubmit={handleRegularLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {/* <button onClick={() => navigate('/admin/login')}>Admin</button> */}
      </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
    </section>
  );
};

export default Login;