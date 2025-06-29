const express = require('express');
const router = express.Router();
const Book = require('../../models/Books');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ SEARCH route first
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  try {
    const books = await Book.find({
      title: { $regex: query, $options: 'i' }
    }).limit(5);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single book by ID (with ObjectId validation)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid Book ID' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new book
router.post('/', upload.single('coverImage'), async (req, res) => {
  const { title, author, price, description, stock, category } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      price,
      description,
      stock,
      category,
      coverImage: `/uploads/${req.file.filename}`
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a book by ID
router.put('/:id', upload.single('coverImage'), async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid Book ID' });
  }

  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      stock: req.body.stock,
      price: req.body.price,
      author: req.body.author,
      category: req.body.category
    };

    if (req.file) {
      updateData.coverImage = `/uploads/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ msg: 'Failed to update book' });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid Book ID' });
  }

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json({ msg: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Bulk upload books
router.post('/bulk', async (req, res) => {
  try {
    const books = req.body; // Expecting an array of books
    const createdBooks = await Book.insertMany(books);
    res.status(201).json(createdBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bulk insert failed' });
  }
});

module.exports = router;
