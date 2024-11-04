// server/routes/api/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { authenticateToken } = require('../../auth');

// Public Routes (No token required)
router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/reset-password', userController.resetPassword);

// Protected Routes (Token required)
router.get('/all', authenticateToken, userController.getAllUser);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
