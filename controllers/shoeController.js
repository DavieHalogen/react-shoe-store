const { pool } = require('../config/db');

// Get all shoes
exports.getShoes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Shoes"');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new shoe
exports.createShoe = async (req, res) => {
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!image) return res.status(400).json({ message: 'Image is required' });

    try {
        const result = await pool.query(
            'INSERT INTO "Shoes" (name, price, image) VALUES ($1, $2, $3) RETURNING id',
            [name, price, image]
        );
        res.status(201).json({ id: result.rows[0].id, name, price, image });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a shoe by ID
exports.getShoeById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM "Shoes" WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Shoe not found' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a shoe by ID
exports.updateShoe = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        let query = 'UPDATE "Shoes" SET name = $1, price = $2';
        const params = [name, price];

        if (image) {
            query += ', image = $3';
            params.push(image);
        }

        query += ' WHERE id = $4';
        params.push(id);

        const result = await pool.query(query, params);

        if (result.rowCount === 0) return res.status(404).json({ message: 'Shoe not found' });
        res.status(200).json({ message: 'Shoe updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a shoe by ID
exports.deleteShoe = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM "Shoes" WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({ message: 'Shoe not found' });
        res.status(200).json({ message: 'Shoe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
