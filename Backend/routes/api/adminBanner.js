const express = require('express');
const router = express.Router();
const multer = require('multer');
const Banner = require('../../models/Banner');

// Multer config to upload to 'uploads/' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// @route POST /api/banner/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newBanner = new Banner({ imageUrl: `/uploads/${req.file.filename}` });
    await newBanner.save();
    res.status(200).json({ msg: 'Banner uploaded', banner: newBanner });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route GET /api/banner
router.get('/', async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
});

// @route DELETE /api/banner/:id
router.delete('/:id', async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Banner deleted' });
});

module.exports = router;
