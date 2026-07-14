const Message = require('../models/Message');

exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const doc = await Message.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', data: doc });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { readStatus: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Message not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
