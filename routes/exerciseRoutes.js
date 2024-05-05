const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Endpoint para agregar un nuevo ejercicio
router.post('/api/users/:userId/exercises', exerciseController.addExercise);

// Otros endpoints para manejar operaciones CRUD...

module.exports = router;
