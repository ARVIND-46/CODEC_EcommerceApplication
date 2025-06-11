import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stock: '',
    price: '',
    author: '',
    category: ''
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res =  await axios.get('http://localhost:5000/api/books')
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('stock', formData.stock);
    data.append('price', formData.price);
    data.append('author', formData.author);
    data.append('category', formData.category);
    if (image) data.append('coverImage', image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/books/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
       await axios.post('http://localhost:5000/api/books', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      fetchBooks();
      setFormData({ title: '', description: '', stock: '', price: '', author: '', category: '' });
      setImage(null);
      setEditingId(null);
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`)
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title || '',
      description: book.description || '',
      stock: book.stock || '',
      price: book.price || '',
      author: book.author || '',
      category: book.category || ''
    });
    setEditingId(book._id);
  };

  return (
    <div style={styles.container}>
      <h2>{editingId ? 'Edit Book' : 'Add New Book'}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          style={styles.input}
          />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="file"
          onChange={handleImageChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editingId ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      <h3>📚 Book List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${book.coverImage}`}
                    alt="cover"
                    style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.stock}</td>
                <td>₹{book.price}</td>
                <td>
                  <button onClick={() => handleEdit(book)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDelete(book._id)} style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6">No books found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '30px', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  editBtn: { marginRight: '10px', padding: '5px 10px', backgroundColor: '#0288d1', color: '#fff', border: 'none' },
  deleteBtn: { padding: '5px 10px', backgroundColor: '#c62828', color: '#fff', border: 'none' }
};

export default ManageBooks;
