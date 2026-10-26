const chatbotService = require('../services/chatbot.service');

const chat = async (req, res, next) => {
  try {
    const { sessionId, message } = req.body;
    if (!sessionId || !message) {
      return res.status(400).json({ message: 'sessionId and message are required' });
    }
    const data = await chatbotService.chat({ sessionId, message });
    res.json(data);
  } catch (err) { next(err); }
};

module.exports = { chat };