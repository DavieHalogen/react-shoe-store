const express = require('express');
const {
    requestOtp,
    verifyOtp,
    resetPassword
} =require('../controllers/otpController.js');

const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;