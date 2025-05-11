const express = require('express');
const cors = require('cors');
const app = express();

// Configuración CORS actualizada
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Agrega ambos orígenes
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Resto de tu configuración...
app.use(express.json());

// Importar y usar rutas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});