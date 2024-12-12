const express = require('express');
const multer = require('multer');
const {
    getShoes,
    createShoe,
    getShoeById,
    updateShoe,
    deleteShoe
} = require('../controllers/shoeController');

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/images/shoes'); // Ensure this directory exists for storing images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

const upload = multer({ storage });

const router = express.Router();

// Get all shoes
router.get('/', getShoes);

// Create a new shoe with image upload
router.post('/', upload.single('image'), createShoe); // Handle file upload

// Get a shoe by ID
router.get('/:id', getShoeById);

// Update a shoe by ID with image upload
router.put('/:id', upload.single('image'), updateShoe); // Handle file upload

// Delete a shoe by ID
router.delete('/:id', deleteShoe);

module.exports = router;
