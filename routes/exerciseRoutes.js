const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Exercise = require('../models/exerciseModel');

// Endpoint para agregar un nuevo ejercicio
router.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const userId = req.params._id;
    const { description, duration, date } = req.body;

    console.log('Datos recibidos:', { userId, description, duration, date });

    // Encuentra al usuario por su ID
    const user = await User.findById(userId);

    // Verifica si el usuario existe
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Crea un nuevo ejercicio que cumpla con el esquema exerciseSchema
    const newExercise = {
      description,
      duration: Number(duration), // Convertir duration a número
      date: date ? new Date(date) : new Date(),
    };

    console.log('Nuevo ejercicio creado:', newExercise);

    // Agrega el nuevo ejercicio al array exercises del usuario
    user.exercises.push(newExercise);

    console.log('Ejercicio agregado al usuario:', user);

    // Guarda el usuario actualizado en la base de datos
    await user.save();

    console.log('Usuario actualizado con el nuevo ejercicio:', user);

    // Devuelve el objeto de ejercicio recién creado en la respuesta con el formato requerido
    res.json({
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration, // Enviar duration como número
      date: newExercise.date.toDateString().slice(0, 15), // Enviar date como cadena de texto en el formato requerido
      _id: user._id
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


// GET /api/users/:_id/logs
router.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const userId = req.params._id;
    const { from, to, limit } = req.query;

    // Encuentra al usuario por su ID y popula los ejercicios asociados
    const user = await User.findById(userId).populate('exercises');

    // Verifica si el usuario existe
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Filtrar los ejercicios según los parámetros from, to y limit
    let filteredExercises = user.exercises;

    if (from) {
      filteredExercises = filteredExercises.filter(exercise => exercise.date >= new Date(from));
    }

    if (to) {
      filteredExercises = filteredExercises.filter(exercise => exercise.date <= new Date(to));
    }

    if (limit) {
      filteredExercises = filteredExercises.slice(0, limit);
    }

    // Crear el array log con el formato requerido
    const log = filteredExercises.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    }));

    // Devuelve el objeto de usuario con los ejercicios en el array log con el formato requerido
    res.json({
      _id: user._id,
      username: user.username,
      count: log.length,
      log
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
