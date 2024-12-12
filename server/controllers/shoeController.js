const pool = require('../config/db');

// Get all shoes
exports.getShoes = async (req, res) => {
    try {
        const [shoes] = await pool.query('SELECT * FROM Shoes');
        res.status(200).json(shoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new shoe
exports.createShoe = async (req, res) => {
  console.log(req.body);
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded file name
   console.log(image);
    if (!image) {
        return res.status(400).json({ message: 'Image is required' });
    }

    try {
        const [result] = await pool.query('INSERT INTO Shoes (name, price, image) VALUES (?, ?, ?)', [name, price, image]);
        res.status(201).json({ id: result.insertId, name, price, image });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a shoe by ID
exports.getShoeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [shoe] = await pool.query('SELECT * FROM Shoes WHERE id = ?', [id]);
        if (shoe.length === 0) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json(shoe[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a shoe by ID
exports.updateShoe = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded file name

    try {
        const [result] = await pool.query('UPDATE Shoes SET name = ?, price = ?, image = ? WHERE id = ?', [name, price, image || null, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json({ message: 'Shoe updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a shoe by ID
exports.deleteShoe = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Shoes WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json({ message: 'Shoe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
