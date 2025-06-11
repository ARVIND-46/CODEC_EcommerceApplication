const express = require("express");
const router = express.Router();
const Book = require("../../models/Books");

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a book
router.post("/add", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ success: true });
});

// Delete a book
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Update stock
router.put("/stock/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, { stock: req.body.stock });
  res.json({ success: true });
});

module.exports = router;
