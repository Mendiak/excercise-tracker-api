// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint para crear un nuevo usuario
router.post('/api/users', userController.createUser);

// Endpoint para obtener todos los usuarios
router.get('/api/users', (req, res) => {
  // Manejar la solicitud GET para obtener todos los usuarios
  userController.getAllUsers(req, res);
});

// Otros endpoints para manejar operaciones CRUD...

module.exports = router;
