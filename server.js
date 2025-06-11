const express = require('express');
const bodyParser = require('body-parser');      
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
//Middleware
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
//Db configuration
const db = require('./Backend/config/keys').mongoURI
//Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./Backend/routes/api/authentication');
app.use('/api/authentication', authRoutes);
const bookRoutes = require('./Backend/routes/api/booksroute');
app.use('/api/books', bookRoutes);
const cartRoutes = require('./Backend/routes/api/cartroute');
app.use('/api/cart', cartRoutes);
const wishListRoutes = require('./Backend/routes/api/wishListroute');
app.use('/api/wishlist', wishListRoutes);
const adminBannerRoutes = require('./Backend/routes/api/adminBanner');
app.use('/api/admin/banner', adminBannerRoutes);
const adminCategoryRoutes = require('./Backend/routes/api/adminCategory');
app.use('/api/admin/category', adminCategoryRoutes);
const adminBooksRoutes = require('./Backend/routes/api/adminBooks');
app.use('/api/admin/books', adminBooksRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});