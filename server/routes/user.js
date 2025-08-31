const express = require('express');
const router = express.Router(); 
const { auth } = require('../middlewares/auth');

// Import the controllers
const { signUp, login, sendOTP, changePassword} = require('../controllers/Auth');


router.post('/signup', signUp);
router.post('/login', login);
router.post('/otp', sendOTP);
router.put('/change-password',auth, changePassword);


module.exports = router;