const { userRegister, loginUser } = require('../controllers/authController');

const router = require('express').Router();

router.post('/register', userRegister);
router.post('/login', loginUser);

module.exports = router;