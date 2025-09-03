const { Pool } = require('pg');
require('dotenv').config();

// Create a Postgres connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// Function to create tables if they don't exist
const initializeTables = async () => {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Users" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        "phoneNumber" VARCHAR(20) NOT NULL UNIQUE,
        role VARCHAR(10) DEFAULT 'user',
        status VARCHAR(10) DEFAULT 'active',
        "registrationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Shoes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Shoes" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // OTP table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "OTPs" (
        id SERIAL PRIMARY KEY,
        "userId" INT NOT NULL REFERENCES "Users"(id),
        otp VARCHAR(6) NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE
      );
    `);

    // ActivityLog table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "ActivityLog" (
        id SERIAL PRIMARY KEY,
        action VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('All tables are ready.');
  } catch (error) {
    console.error('Error initializing tables:', error.message);
  }
};

// Function to get dashboard metrics
const getDashboardMetrics = async () => {
  try {
    const totalUsersRes = await pool.query('SELECT COUNT(*) FROM "Users";');
    const activeUsersRes = await pool.query('SELECT COUNT(*) FROM "Users" WHERE status = $1;', ['active']);
    const totalSalesRes = await pool.query('SELECT SUM(price) FROM "Shoes";');

    return {
      totalUsers: parseInt(totalUsersRes.rows[0].count),
      activeUsers: parseInt(activeUsersRes.rows[0].count),
      totalSales: parseFloat(totalSalesRes.rows[0].sum) || 0
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error.message);
    throw error;
  }
};

// Initialize tables on server start
initializeTables();

module.exports = { pool, getDashboardMetrics };
