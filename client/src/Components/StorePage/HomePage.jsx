import React from 'react';
import BookList from './BookList';
import BannerSlider from './BannerSlider';
import '../../styles/styles.css'; 
const HomePage = () => {
  return (
    <div className="homepage">
      <h2>📚 Explore Our Bookstore</h2>
      <BannerSlider />
    </div>
  );
};

export default HomePage;
