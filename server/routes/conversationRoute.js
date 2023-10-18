const { createConversation, getConversationByUserId, getConversation } = require('../controllers/conversationController');

const router = require('express').Router();

router.post('/new', createConversation);
router.get('/:userId', getConversationByUserId);
router.get('/:firstUserId/:secondUserId', getConversation);

module.exports = router;