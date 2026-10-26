const projectService = require('../services/project.service');

const getAll = async (req, res, next) => {
  try {
    const { status, categoryId } = req.query;
    const data = await projectService.getAll({ status, categoryId });
    res.json(data);
  } catch (err) { next(err); }
};

const getBySlug = async (req, res, next) => {
  try {
    const data = await projectService.getBySlug(req.params.slug);
    res.json(data);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { title, description, specifications, categoryId, status } = req.body;
    if (!title || !categoryId) {
      return res.status(400).json({ message: 'Title and categoryId are required' });
    }
    const data = await projectService.create(
      { title, description, specifications, categoryId, status },
      req.files,
      req.user.id
    );
    res.status(201).json(data);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { title, description, specifications, categoryId, status } = req.body;
    if (!title || !categoryId) {
      return res.status(400).json({ message: 'Title and categoryId are required' });
    }
    const data = await projectService.update(req.params.id, { title, description, specifications, categoryId, status });
    res.json(data);
  } catch (err) { next(err); }
};

const addImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }
    const data = await projectService.addImages(req.params.id, req.files);
    res.status(201).json(data);
  } catch (err) { next(err); }
};

const deleteImage = async (req, res, next) => {
  try {
    const data = await projectService.deleteImage(req.params.imageId);
    res.json(data);
  } catch (err) { next(err); }
};

const setCover = async (req, res, next) => {
  try {
    const data = await projectService.setCover(req.params.imageId);
    res.json(data);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const data = await projectService.remove(req.params.id);
    res.json(data);
  } catch (err) { next(err); }
};

module.exports = { getAll, getBySlug, create, update, addImages, deleteImage, setCover, remove };