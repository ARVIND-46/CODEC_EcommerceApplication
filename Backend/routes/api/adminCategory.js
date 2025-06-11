const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Add a category
router.post("/add", async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json({ success: true });
});

// Delete a category
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
