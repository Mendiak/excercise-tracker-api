const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importa los modelos de Mongoose
const User = require('./models/userModel');
const Exercise = require('./models/exerciseModel');

// Importa los enrutadores de tus endpoints
const exerciseRoutes = require('./routes/exerciseRoutes');
const userRoutes = require('./routes/userRoutes');

// Configura middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a la base de datos MongoDB
const dbUrl = process.env.DB_URL;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(dbUrl.replace('<username>', dbUser).replace('<password>', dbPassword), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Rutas para los endpoints
app.use(exerciseRoutes);
app.use(userRoutes);

// Punto de entrada para la página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
