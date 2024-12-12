const pool = require('../config/db'); // Assuming you're using a pool connection

const User = {
  create: async (userData) => {
    const { username, email, password, phoneNumber, role, status } = userData;
    const registrationDate = new Date();
    const [result] = await pool.query(
      'INSERT INTO Users (username, email, password, phoneNumber, role, registrationDate, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, password, phoneNumber, role, registrationDate, status]
    );
    return result.insertId;
  },
  
  findAll: async (sortBy = 'id', order = 'ASC') => {
    // Define valid sorting fields and order directions
    const validSortFields = ['id', 'username', 'email', 'role', 'registrationDate'];
    const validOrder = ['ASC', 'DESC'];

    // Validate sortBy and order
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
    const sortOrder = validOrder.includes(order) ? order : 'ASC';

    // Query to fetch all users
    const query = `
      SELECT * 
      FROM Users 
      ORDER BY ${sortField} ${sortOrder}
    `;

    // Execute the query
    const [rows] = await pool.query(query);
    return rows;
  },
  
  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  },
  
  findByEmailOrUsername: async (identifier) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ? OR username = ?', 
    [identifier, identifier]
    );
    return rows[0];
  },

  findByPhoneNumber: async (phoneNumber) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE phoneNumber = ?', [phoneNumber]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, userData) => {
    const { username, email, phoneNumber, role } = userData; // Include role in the update
    const [result] = await pool.query(
      'UPDATE Users SET username = ?, email = ?, phoneNumber = ?, role = ? WHERE id = ?',
      [username, email, phoneNumber, role, id]
    );
    return result;
  },

  updateStatus: async (id, status) => {
    // Validate status input
    if (status !== 'active' && status !== 'inactive') {
      throw new Error('Invalid status');
    }
    const [result] = await pool.query(
      'UPDATE Users SET status = ? WHERE id = ?',
      [status, id]
    );
    return result;
  },

  delete: async (id) => {
    // Delete user and their activity logs
    await pool.query('DELETE FROM Users WHERE id = ?', [id]);
  }
};

module.exports = User;