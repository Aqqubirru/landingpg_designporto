const categoryService = require('../services/category.service');

const getAll = async (req, res, next) => {
  try {
    const data = await categoryService.getAll();
    res.json(data);
  } catch (err) { next(err); }
};

const getBySlug = async (req, res, next) => {
  try {
    const data = await categoryService.getBySlug(req.params.slug);
    res.json(data);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const data = await categoryService.create({ name, description });
    res.status(201).json(data);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const data = await categoryService.update(req.params.id, { name, description });
    res.json(data);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await categoryService.remove(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getBySlug, create, update, remove };