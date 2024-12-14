const db = require('../config/db'); // Make sure to adjust the path as necessary

// Function to get dashboard metrics
exports.getDashboardMetrics = async () => {
    try {
        // Fetch total users
        const [totalUsers] = await db.query('SELECT COUNT(*) AS count FROM Users');

        // Fetch active users
        const [activeUsers] = await db.query("SELECT COUNT(*) AS count FROM Users WHERE status = 'active'");

        // Fetch total admin users
        const [totalAdmins] = await db.query("SELECT COUNT(*) AS count FROM Users WHERE role = 'admin'");

        // Return metrics
        return {
            totalUsers: totalUsers[0].count,
            activeUsers: activeUsers[0].count,
            totalAdmins: totalAdmins[0].count
        };
    } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
        throw new Error('Unable to fetch dashboard metrics');
    }
};

// Function to get recent activity
exports.getRecentActivity = async () => {
    try {
        // Fetch recent activity (e.g., last 10 activities)
        const [recentActivity] = await db.query('SELECT * FROM ActivityLog ORDER BY createdAt DESC LIMIT 10');
        return recentActivity; // Adjust the return structure as needed
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        throw new Error('Unable to fetch recent activity');
    }
};

// Function to log user activities
exports.logActivity = async (action) => {
    try {
        const query = 'INSERT INTO ActivityLog (action) VALUES (?)';
        await db.query(query, [action]);
        console.log('Activity logged successfully.');
    } catch (error) {
        console.error('Error logging activity:', error.message);
    }
};

// Function to delete logs by user ID
exports.deleteLogsByUserId = async (userId) => {
    try {
        const query = 'DELETE FROM ActivityLog WHERE userId = ?';
        const [result] = await db.query(query, [userId]);
        console.log(`Deleted ${result.affectedRows} log(s) for user ID ${userId}.`);
        return result.affectedRows; // Return the number of deleted logs
    } catch (error) {
        console.error('Error deleting logs by user ID:', error.message);
        throw new Error('Unable to delete logs');
    }
};