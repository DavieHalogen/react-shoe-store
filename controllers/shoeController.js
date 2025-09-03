const pool = require('../config/db');
const cloudinary = require('../config/cloudinary');

exports.getShoes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Shoes"');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createShoe = async (req, res) => {
    const { name, price } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    try {
        const upload = await cloudinary.uploader.upload(req.file.path, { folder: 'images/shoes' });
        const imageUrl = upload.secure_url;

        const result = await pool.query(
            'INSERT INTO "Shoes" (name, price, image) VALUES ($1, $2, $3) RETURNING id',
            [name, price, imageUrl]
        );

        res.status(201).json({ id: result.rows[0].id, name, price, image: imageUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

exports.updateShoe = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    try {
        let query = 'UPDATE "Shoes" SET name = $1, price = $2';
        const params = [name, price];

        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path, { folder: 'images/shoes' });
            query += ', image = $3 WHERE id = $4';
            params.push(upload.secure_url, id);
        } else {
            query += ' WHERE id = $3';
            params.push(id);
        }

        const result = await pool.query(query, params);

        if (result.rowCount === 0) return res.status(404).json({ message: 'Shoe not found' });
        res.status(200).json({ message: 'Shoe updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
