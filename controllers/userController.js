const User = require('../models/userModel');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Creando nuevo usuario con username:', username); // Agregar registro de depuración

    const newUser = new User({ username });
    await newUser.save();

    console.log('Nuevo usuario creado:', newUser); // Agregar registro de depuración

    res.json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error); // Agregar registro de error
    res.status(400).json({ message: error.message });
  }
};

// Función para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Usuarios encontrados:', users); // Agregar registro de depuración
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error); // Agregar registro de error
    res.status(500).json({ message: error.message });
  }
};
