const express = require('express');
const router = express.Router(); 

// Import the controller
const { signUp } = require('../controllers/Auth');
const { login } = require("../controllers/Auth");
const {sendOTP} = require("../controllers/Auth");

// Define API routes
router.post('/signup', signUp);
router.post('/login', login);
router.post('/otp', sendOTP);


module.exports = router;