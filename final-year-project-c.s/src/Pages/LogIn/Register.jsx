import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import classes from './Auth.module.css';
import logo from '../../Images/headerLogo.png';
import { Link } from 'react-router-dom';

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
        <section>
        <Link to="/"><img className={classes.loginLogo} src={logo} alt="Ethiopian Railways Logo" /></Link>
        <div className={classes.container}>
        <h2>Register</h2>
        {error && <p className='text-danger'>{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
      </section>
  );
};

export default Register;