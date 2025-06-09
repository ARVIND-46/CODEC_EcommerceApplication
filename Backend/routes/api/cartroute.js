const exporess = require('express');
const router = exporess.Router();
const Cart = require('../../models/Cart');
const Book = require('../../models/Books');

// Add item to cart
router.post('/add', async (req, res) => {
    const {userId, bookId, quantity} = req.body;
    try{
        let cart = await Cart.findOne({user: userId});
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({message: 'Book not found'});
        }
        const price = book.price * quantity;
        if (!cart){
            cart = new Cart({
                user: userId,
                items: [{
                    book: bookId,
                    quantity
                }],
                totalPrice: price
            });
        }else {
      // check if book already in cart
      const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }

      // Recalculate total price
      cart.totalPrice += price;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update item quantity
router.put('/update', async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
    if (itemIndex === -1) return res.status(404).json({ msg: "Book not in cart" });

    // Update quantity
    const oldQuantity = cart.items[itemIndex].quantity;
    cart.items[itemIndex].quantity = quantity;

    // Update price
    cart.totalPrice += (quantity - oldQuantity) * book.price;

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Remove item from cart
router.delete('/remove', async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
    if (itemIndex === -1) return res.status(404).json({ msg: "Book not in cart" });

    const removedItem = cart.items[itemIndex];
    const book = await Book.findById(bookId);

    cart.totalPrice -= removedItem.quantity * book.price;

    cart.items.splice(itemIndex, 1); // remove item

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Fetch user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId })
      .populate('items.book', 'title author price coverImage');

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
