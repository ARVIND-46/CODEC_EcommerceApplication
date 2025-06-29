import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';  
import '../../styles/Layout.css';

const NavBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === '') {
        setSuggestions([]);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/books/search?q=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Function to clear input and suggestions on click
  const handleSuggestionClick = () => {
    setQuery('');
    setSuggestions([]);
  };

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
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((book) => (
              <li key={book._id} className="suggestion-item">
                <Link
                  to={`/book/${book._id}`}
                  className="suggestion-link"
                  onClick={handleSuggestionClick}
                >
                  {book.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="navbar-right">
        <Link to="/login" className="auth-link">Login</Link> / 
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </nav>
  );
};

export default NavBar;
