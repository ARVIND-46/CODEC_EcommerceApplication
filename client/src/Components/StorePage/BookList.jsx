import React, { useEffect, useState } from 'react';
import BookCard from './BookCards';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books'); 
        setBooks(res.data);
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
