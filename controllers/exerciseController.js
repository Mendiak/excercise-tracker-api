const Exercise = require('../models/exerciseModel');

// Controlador para agregar un nuevo ejercicio
exports.addExercise = async (req, res) => {
  try {
    const { userId } = req.params;
    const { description, duration, date } = req.body;
    const newExercise = new Exercise({ userId, description, duration, date });
    await newExercise.save();
    res.json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Otros controladores para manejar otras operaciones...
