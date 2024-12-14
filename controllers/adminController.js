const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { getDashboardMetrics, getRecentActivity, logActivity } = require('../services/dashboardService');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role, status } = req.body;

    // Check if username, email, or phone number is already taken
    const userExists = await User.findByUsername(username) || 
                       await User.findByEmail(email) || 
                       await User.findByPhoneNumber(phoneNumber);

    if (userExists) {
      return res.status(400).json({ message: 'Username, email, or phone number already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user in the database
    const userId = await User.create({ username, email, password: hashedPassword, phoneNumber, role, status});

    // Log the activity with the username
    await logActivity(`Created a new user: ${username}`);

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Admin toggles user activation status
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID to get the current status and username
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the new status
    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    // Update the user status
    await User.updateStatus(id, newStatus);

    // Log the activity including the username
    await logActivity(`${user.username}'s status changed to ${newStatus}`);

    res.status(200).json({ message: `User status updated to ${newStatus}` });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    try {
      
        await User.delete(id);
        
        await logActivity(`${user.username} was deleted from database.`);

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new admin user
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

   const userExists = await User.findByUsername(username) ||
                       await User.findByEmail(email) || 
                       await User.findByPhoneNumber(phoneNumber);

    if (userExists) {
      return res.status(409).json({ message: 'Username, email, or phone number already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      phoneNumber, 
      role: 'admin', // Set role to admin
      status: 'active'
    });

    await logActivity(`Created a new admin user: ${username}`);

    res.status(201).json({ message: 'Admin created successfully', userId });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  const { sortBy = 'id', order = 'ASC' } = req.query;

  try {
    const users = await User.findAll(sortBy, order);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, phoneNumber, role } = req.body;

  try {
    const result = await User.update(userId, { username, email, phoneNumber, role });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' }); 
    }

    await logActivity(`Updated ${username}'s details`);

    res.status(200).json({ message: 'User updated successfully' }); 
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get combined dashboard metrics and recent activity
exports.getDashboardData = async (req, res) => {
  try {
    const metrics = await getDashboardMetrics();
    const recentActivity = await getRecentActivity();
  
    res.status(200).json({
      metrics,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data.' });
  }
};