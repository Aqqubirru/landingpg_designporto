const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Public — siapapun bisa kirim pesan
router.post('/', inquiryController.create);

// Admin only
router.get('/', authenticate, authorize('super_admin', 'admin'), inquiryController.getAll);
router.patch('/:id/read', authenticate, authorize('super_admin', 'admin'), inquiryController.markAsRead);
router.delete('/:id', authenticate, authorize('super_admin', 'admin'), inquiryController.remove);

module.exports = router;