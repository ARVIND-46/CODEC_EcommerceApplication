import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigation = useNavigate();
    const handleRegistration = () => {
        navigation('/');
    }

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { email, password } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/authentication/login', credentials);
      alert(res.data.msg);
      setTimeout(() => {
        navigation('/home');
        
      }, 1000);
      
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container" id="login">
      <h2>Login Form</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default Login;
