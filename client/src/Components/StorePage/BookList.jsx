import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCards from './BookCards';
import '../../styles/Store.css'; 

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCards key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
