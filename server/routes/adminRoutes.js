const express = require('express');
const { 
        createUser, 
        updateUser,
        deleteUser,
        toggleUserStatus,
        getAllUsers,
        createAdmin,
        getDashboardData
} = require('../controllers/adminController');

const { authenticateJWT, isAdmin, checkUserStatus} = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/users', authenticateJWT, isAdmin, createUser);

router.delete('/users/:id', authenticateJWT, isAdmin, checkUserStatus, deleteUser);

router.put('/users/:id', authenticateJWT, isAdmin, checkUserStatus, updateUser);

router.get('/users', authenticateJWT, isAdmin, checkUserStatus, getAllUsers);

router.patch('/users/:id/status', authenticateJWT, isAdmin, checkUserStatus, toggleUserStatus);

router.post('/create-admin', authenticateJWT, isAdmin, checkUserStatus, createAdmin);

router.get('/dashboard', authenticateJWT, isAdmin, checkUserStatus, getDashboardData);


module.exports = router;