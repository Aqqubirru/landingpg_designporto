const inquiryService = require('../services/inquiry.service');

const getAll = async (req, res, next) => {
  try {
    const data = await inquiryService.getAll();
    res.json(data);
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const data = await inquiryService.create({ name, email, message });
    res.status(201).json(data);
  } catch (err) { next(err); }
};

const markAsRead = async (req, res, next) => {
  try {
    const data = await inquiryService.markAsRead(req.params.id);
    res.json(data);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const data = await inquiryService.remove(req.params.id);
    res.json(data);
  } catch (err) { next(err); }
};

module.exports = { getAll, create, markAsRead, remove };