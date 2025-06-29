import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null); // Simulated user check, replace with auth logic

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error('Failed to fetch book:', err);
      }
    };

    fetchBook();

    // Dummy auth check — replace with actual user state management (like Redux, Context, etc.)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Add to cart logic
    console.log(`Adding ${book.title} to cart for ${user.name}`);
  };

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Like logic
    console.log(`Liked ${book.title}`);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Buy now logic
    console.log(`Buying ${book.title} for ${user.name}`);
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-details-container">
      <img
        src={`http://localhost:5000/uploads/${book.coverImage}`}
        alt={book.title}
        className="book-details-img"
      />
      <div className="book-details-info">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>
        <p><strong>Stock:</strong> {book.stock}</p>
        <p>{book.description}</p>
        <div className="book-details-actions">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="like-btn" onClick={handleLike}>Like</button>
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
