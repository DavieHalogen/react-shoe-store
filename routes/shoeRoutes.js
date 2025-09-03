const express = require('express');
const multer = require('multer');
const {
    getShoes,
    createShoe,
    getShoeById,
    updateShoe,
    deleteShoe
} = require('../controllers/shoeController');

// Use memory storage for multer (no local folder needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Routes
router.get('/', getShoes);
router.post('/', upload.single('image'), createShoe);
router.get('/:id', getShoeById);
router.put('/:id', upload.single('image'), updateShoe);
router.delete('/:id', deleteShoe);

module.exports = router;
