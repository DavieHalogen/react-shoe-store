const { pool } = require('../config/db');

class Activity {
    static async findRecent(limit) {
        const result = await pool.query(
            'SELECT * FROM "ActivityLog" ORDER BY "createdAt" DESC LIMIT $1',
            [limit]
        );
        return result.rows;
    }
}

module.exports = Activity;
