const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Rota para registro
router.post('/register', registerUser);

// Rota para login
router.post('/login', loginUser);

module.exports = router;
