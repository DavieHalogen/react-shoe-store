const db = require('../config/db');

class Activity {
    static async findRecent(limit) {
        const [results] = await db.query('SELECT * FROM activities ORDER BY createdAt DESC LIMIT ?', [limit]);
        return results;
    }
}

module.exports = Activity;