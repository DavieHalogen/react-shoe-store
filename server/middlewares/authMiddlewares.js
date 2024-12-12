const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user; // Store user information in the request
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Middleware to check for specific roles
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

// Separate admin check for convenience
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

// Middleware to check account status
exports.checkUserStatus = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user || user.status === 'inactive') {
            return res.status(403).json({ message: 'Your account is deactivated. Please contact support.' });
        }
        next(); // User is active, proceed
        
    } catch (error) {
        console.error('Error checking user status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};