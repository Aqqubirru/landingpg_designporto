const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Public
router.get('/', categoryController.getAll);
router.get('/:slug', categoryController.getBySlug);

// Admin only
router.post('/', authenticate, authorize('super_admin', 'admin'), categoryController.create);
router.put('/:id', authenticate, authorize('super_admin', 'admin'), categoryController.update);
router.delete('/:id', authenticate, authorize('super_admin', 'admin'), categoryController.remove);

module.exports = router;