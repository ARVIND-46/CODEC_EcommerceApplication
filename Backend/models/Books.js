const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Books', BookSchema);
