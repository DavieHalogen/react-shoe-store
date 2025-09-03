const pool = require('../config/db');

exports.backgroundImages = async (req, res) => {
  try {
    const result = await pool.query('SELECT image FROM "BackgroundImages"');
    const imageUrls = result.rows.map(row => row.image);
    res.json(imageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch background images' });
  }
};
