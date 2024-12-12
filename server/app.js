require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // Optional for logging


const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const shoeRoutes = require('./routes/shoeRoutes');
const otpRoutes = require('./routes/otpRoutes');
const backgroundImageRoutes = require('./routes/backgroundImageRoutes')

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log requests to the console

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shoes', shoeRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/backgroundImages', backgroundImageRoutes);

// Error handling middleware for 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});