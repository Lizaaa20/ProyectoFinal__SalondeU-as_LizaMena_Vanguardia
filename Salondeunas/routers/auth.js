const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/AuthController');

// Register - POST
router.post('/register', AuthController.register);

// Login - POST
router.post('/login', AuthController.login);

// Register Admin - POST
router.post('/register-admin', AuthController.registerAdmin);

// Login Admin - POST
router.post('/login-admin', AuthController.loginAdmin);

module.exports = router;