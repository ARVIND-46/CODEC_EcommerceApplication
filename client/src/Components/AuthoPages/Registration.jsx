import React, { useState } from 'react';    
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Registration = () => {
    
  const navigate = useNavigate();
  const handleLogin = () => {
        navigate('/login');
    }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/authentication/register', formData);

      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
    
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} required />
        <button type="submit">Register</button>
        <button onClick={handleLogin }>Login</button>
      </form>
    </div>
  );
};

export default Registration;
