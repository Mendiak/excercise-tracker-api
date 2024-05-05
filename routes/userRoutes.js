const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint para crear un nuevo usuario
router.post('/api/users', userController.createUser);

// Otros endpoints para manejar operaciones CRUD...

module.exports = router;
