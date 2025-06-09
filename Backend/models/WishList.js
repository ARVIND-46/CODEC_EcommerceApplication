const mongoose = require('mongoose');
const WishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('WishList', WishListSchema);