const User = require('../models/userModel');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Otros controladores para manejar otras operaciones...
