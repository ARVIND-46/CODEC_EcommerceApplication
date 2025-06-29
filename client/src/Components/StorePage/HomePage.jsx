import React from 'react';
import { useParams } from 'react-router-dom'; 
import BannerSlider from './BannerSlider';
import Carts from './Carts';
import BookList from './BookList';
import '../../styles/styles.css'; 
import '../../styles/Store.css'; 
import { useNavigate } from 'react-router-dom'; 
const HomePage = () => {
  const navigate = useNavigate();
 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};
  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="homepage">
      <h2>📚 Explore Our Bookstore</h2>
       <button onClick={handleLogout}>Logout</button>
      <div className="homepage">
        {user && <h2>Welcome, {user.name}</h2>}

      </div>
      <BannerSlider />
      <BookList />
    </div>
  );
};

export default HomePage;
