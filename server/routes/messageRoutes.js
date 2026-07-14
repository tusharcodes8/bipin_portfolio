const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');

router.post('/', createMessage);
router.get('/', auth, getMessages);
router.put('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteMessage);

module.exports = router;
