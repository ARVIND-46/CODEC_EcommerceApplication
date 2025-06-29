import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Store.css'; 

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  if (!book) return null;

  const user = JSON.parse(localStorage.getItem('user'));

  const handleCardClick = () => {
    navigate(`/book/${book._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent navigating to details
    if (!user) {
      return navigate('/login');
    }
    // Add to cart logic here
    console.log(`Adding book ${book.title} to cart for user ${user.name}`);
  };

  const handleLike = (e) => {
    e.stopPropagation(); // prevent navigating to details
    if (!user) {
      return navigate('/login');
    }
    // Like logic here
    console.log(`Liking book ${book.title} for user ${user.name}`);
  };

  const imageSrc = book.coverImage
    ? `http://localhost:5000/uploads/${book.coverImage}`
    : 'https://via.placeholder.com/200x250?text=No+Image';

  return (
    <div className="book-card" onClick={handleCardClick}>
      <img className="book-image" src={imageSrc} alt={book.title || 'Book'} />
      <h3 className="book-title">{book.title || 'Untitled'}</h3>
      <p className="book-author">{book.author || 'Unknown Author'}</p>
      <p className="book-stock">Stock: {book.stock ?? 0}</p>
      <p className="book-price">₹{book.price ?? 'N/A'}</p>

      <div className="book-card-buttons">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>
        <button className="like-btn" onClick={handleLike}>
          ❤️ Like
        </button>
      </div>
    </div>
  );
};

export default BookCard;
