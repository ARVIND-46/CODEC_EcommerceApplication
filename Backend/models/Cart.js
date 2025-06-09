const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [{
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Books',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Cart', CartSchema);