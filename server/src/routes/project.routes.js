const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Public
router.get('/', projectController.getAll);
router.get('/:slug', projectController.getBySlug);

// Admin only
router.post('/', authenticate, authorize('super_admin', 'admin'), upload.array('images', 10), projectController.create);
router.put('/:id', authenticate, authorize('super_admin', 'admin'), projectController.update);
router.post('/:id/images', authenticate, authorize('super_admin', 'admin'), upload.array('images', 10), projectController.addImages);
router.delete('/:id/images/:imageId', authenticate, authorize('super_admin', 'admin'), projectController.deleteImage);
router.patch('/:id/images/:imageId/cover', authenticate, authorize('super_admin', 'admin'), projectController.setCover);
router.delete('/:id', authenticate, authorize('super_admin', 'admin'), projectController.remove);

module.exports = router;