const express = require('express');
const router = express.Router();
const Book = require('../../models/Books');

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
// Get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
// Add a new book
router.post('/',async (req,res)=> {
    const { title, author, price, description, coverImage, stock, category } = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            price,
            description,
            coverImage,
            stock,
            category
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});
// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json({ msg: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
