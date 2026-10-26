const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Public
router.post('/login', authController.login);

// Protected — super_admin only bisa buat akun admin baru
router.post('/register', authenticate, authorize('super_admin'), authController.createAdmin);

// Protected — get current user
router.get('/me', authenticate, authController.getMe);

module.exports = router;