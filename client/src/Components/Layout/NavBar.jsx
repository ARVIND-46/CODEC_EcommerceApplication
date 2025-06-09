import React from 'react';
import '../../styles/styles.css'; 
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom'; 
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <select className="location-select">
          <option value="chennai">Chennai</option>
          <option value="bangalore">Bangalore</option>
          <option value="mumbai">Mumbai</option>
        </select>
      </div>
      <div className="navbar-center">
        <input type="text" className="search-input" placeholder="Search books..." />
        <button className="search-btn">Search</button>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="auth-link">Login</Link> / 
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </nav>
  );
};

export default NavBar;
