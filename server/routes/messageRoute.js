const { createMessage, getMessageByConversationId } = require('../controllers/messageController');

const router = require('express').Router();

router.post('/newMessage', createMessage);
router.get('/:conversationId', getMessageByConversationId);

module.exports = router;