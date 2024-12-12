const express = require('express');
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  verifyToken
} = require('../controllers/userController');

const router = express.Router();

// User registration
router.post('/signup', registerUser);

// User login
router.post('/login', loginUser);


module.exports = router;
