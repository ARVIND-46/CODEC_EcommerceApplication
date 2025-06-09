const express = require('express');
const router = express.Router();
const WishList = require('../../models/WishList');
const Book = require('../../models/Books'); 

// 1. Add to Wishlist
router.post('/add', async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    // Check if already in wishlist
    const exists = await WishList.findOne({ userId, bookId });
    if (exists) {
      return res.status(400).json({ msg: 'Book already in wishlist' });
    }

    const wishItem = new WishList({ userId, bookId });
    await wishItem.save();

    res.status(201).json({ msg: 'Added to wishlist', wishItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 2. Remove from Wishlist
router.delete('/remove', async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const removed = await WishList.findOneAndDelete({ userId, bookId });

    if (!removed) {
      return res.status(404).json({ msg: 'Book not found in wishlist' });
    }

    res.status(200).json({ msg: 'Removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// 3. Get User's Wishlist
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await WishList.find({ userId: req.params.userId })
      .populate('bookId', 'title author price coverImage');

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// (Optional) 4. Check if book is in wishlist
router.get('/check/:userId/:bookId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const exists = await WishList.findOne({ userId, bookId });
    res.json({ inWishlist: !!exists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
