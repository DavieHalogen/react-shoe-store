const express = require('express');
const { backgroundImages } = require('../controllers/backgroundImageController');

const router = express.Router();

// Endpoint to get all background image URLs
router.get('/', backgroundImages)

module.exports = router;