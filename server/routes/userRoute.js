const { getAllUser, getUserbyId } = require('../controllers/userController');

const router = require('express').Router();

router.get('/', getAllUser);
router.get('/getUserById', getUserbyId);

module.exports = router;