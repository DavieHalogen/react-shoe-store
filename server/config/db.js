const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Create a Users table
const createUsersTable = async () => {
  try {
    console.log('Checking if Users table exists...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL UNIQUE,
        role ENUM('admin', 'user') DEFAULT 'user',
        status ENUM('active', 'inactive') DEFAULT 'active',
        registrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log('Users table is ready');
  } catch (error) {
    console.error('Error creating Users table:', error.message);
  }
};

// Create Shoes table
const createShoesTable = async () => {
  try {
    console.log('Checking if Shoes table exists...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Shoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log('Shoes table is ready');
  } catch (error) {
    console.error('Error creating Shoes table:', error.message);
  }
};

// Create the OTPs table
const createOtpTable = async () => {
  try {
    console.log('Checking if OTP table exists...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS OTPs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expiresAt TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (userId) REFERENCES Users(id)
      );
    `);
    console.log('OTP table is ready.');
  } catch (error) {
    console.error('Error creating OTP table:', error.message);
  }
};

// Create ActivityLog table
const createActivityLogTable = async () => {
  try {
    console.log('Checking if ActivityLog table exists...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ActivityLog (
        id INT AUTO_INCREMENT PRIMARY KEY,
        action VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('ActivityLog table is ready');
  } catch (error) {
    console.error('Error creating ActivityLog table:', error.message);
  }
};

// Get dashboard metrics
const getDashboardMetrics = async () => {
  try {
    const [[totalUsers]] = await pool.query('SELECT COUNT(*) AS total FROM Users');
    const [[activeUsers]] = await pool.query('SELECT COUNT(*) AS active FROM Users WHERE status = "active"');
    const [[totalSales]] = await pool.query('SELECT SUM(price) AS totalSales FROM Shoes');

    return {
      totalUsers: totalUsers.total,
      activeUsers: activeUsers.active,
      totalSales: totalSales.totalSales || 0 // Ensure totalSales is a number, defaulting to 0 if null
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error.message);
    throw error; // Rethrow for handling in the controller
  }
};

// Initialize and ensure the schema is applied
(async () => {
  try {
    console.log('Initializing database...');
    await createUsersTable();
    await createShoesTable();
    await createOtpTable();
    await createActivityLogTable(); // Include new table creation
    console.log('Database initialization complete.');
  } catch (error) {
    console.error('Error initializing database:', error.message);
  }
})();

module.exports = pool, getDashboardMetrics ; 