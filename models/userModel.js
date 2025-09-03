const { pool } = require('../config/db'); // Postgres pool

const User = {
  create: async (userData) => {
    const { username, email, password, phoneNumber, role, status } = userData;
    const registrationDate = new Date();
    const result = await pool.query(
      `INSERT INTO "Users" 
      (username, email, password, "phoneNumber", role, "registrationDate", status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [username, email, password, phoneNumber, role, registrationDate, status]
    );
    return result.rows[0].id;
  },

  findAll: async (sortBy = 'id', order = 'ASC') => {
    const validSortFields = ['id', 'username', 'email', 'role', 'registrationDate'];
    const validOrder = ['ASC', 'DESC'];

    const sortField = validSortFields.includes(sortBy) ? `"${sortBy}"` : 'id';
    const sortOrder = validOrder.includes(order) ? order : 'ASC';

    const query = `SELECT * FROM "Users" ORDER BY ${sortField} ${sortOrder}`;
    const result = await pool.query(query);
    return result.rows;
  },

  findByUsername: async (username) => {
    const result = await pool.query('SELECT * FROM "Users" WHERE username = $1', [username]);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM "Users" WHERE email = $1', [email]);
    return result.rows[0];
  },

  findByEmailOrUsername: async (identifier) => {
    const result = await pool.query(
      'SELECT * FROM "Users" WHERE email = $1 OR username = $2',
      [identifier, identifier]
    );
    return result.rows[0];
  },

  findByPhoneNumber: async (phoneNumber) => {
    const result = await pool.query('SELECT * FROM "Users" WHERE "phoneNumber" = $1', [phoneNumber]);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query('SELECT * FROM "Users" WHERE id = $1', [id]);
    return result.rows[0];
  },

  update: async (id, userData) => {
    const { username, email, phoneNumber, role } = userData;
    const result = await pool.query(
      `UPDATE "Users" SET username = $1, email = $2, "phoneNumber" = $3, role = $4 WHERE id = $5`,
      [username, email, phoneNumber, role, id]
    );
    return result.rowCount;
  },

  updateStatus: async (id, status) => {
    if (status !== 'active' && status !== 'inactive') throw new Error('Invalid status');
    const result = await pool.query(
      `UPDATE "Users" SET status = $1 WHERE id = $2`,
      [status, id]
    );
    return result.rowCount;
  },

  delete: async (id) => {
    await pool.query('DELETE FROM "Users" WHERE id = $1', [id]);
  }
};

module.exports = User;
