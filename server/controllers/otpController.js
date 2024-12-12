const express = require('express');
const nodemailer = require('nodemailer');
const { authenticator } = require('otplib');
const bcrypt = require('bcryptjs'); 
const pool = require('../config/db');

const saltRounds = 12;

const otpStore = {};


exports.requestOtp= async (req, res) => {
    const { email } = req.body;
    const otp = authenticator.generate(email); 
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'halogendavie1@gmail.com',
            pass: 'xnqp rcvj gfvk avuq'  // Use app-specific password if 2FA is enabled
        }
    });

    const mailOptions = {
        from: 'halogendavie1gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Failed to send OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP.' });
    }
};


exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email] === otp) {
        delete otpStore[email];
        res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid OTP.' });
    }
};


exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (newPassword.length < 6) {
        return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await pool.query('UPDATE Users SET password = ? WHERE email = ?', [hashedPassword, email]);
        res.json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, error: 'Error resetting password. Please try again.' });
    }
   
};

