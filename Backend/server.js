const express = require('express');
const cors = require('cors');
const app = express();

// CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // para servir imágenes

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const emprendimientoRoutes = require('./routes/emprendimientoRoutes'); // nueva ruta separada

app.use('/api/auth', authRoutes); // rutas de autenticación
app.use('/api/emprendimientos', emprendimientoRoutes); // rutas de emprendimientos

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
