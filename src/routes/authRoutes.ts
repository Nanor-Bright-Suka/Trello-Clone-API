const express = require('express');
const { register,login} = require('../controllers/authControllers');
const { validateLoginUser, validateRegisterUser } = require('../middleware/validateUser');

const router = express.Router();

router.post('/register', validateRegisterUser, register);
router.post('/login',validateLoginUser, login);

module.exports = router;