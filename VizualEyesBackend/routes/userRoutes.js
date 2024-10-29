const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController'); // Import the auth controller

const router = express.Router();

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

// Get user profile by ID (protected route)
router.get('/profile/:id', userController.getProfile);

// Update user profile (protected route)
router.put('/profile/:id', authMiddleware.protect, userController.updateProfile);

// Reset password (not necessarily protected, depending on your requirements)
router.post('/reset-password', userController.resetPassword);

// Example of a protected route
router.get('/protected', authMiddleware.protect, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;