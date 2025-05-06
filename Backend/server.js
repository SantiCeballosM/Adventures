const express = require('express');
const cors = require('cors');
const app = express();

// 👇 IMPORTANTE: importar tu archivo de rutas
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());           // para permitir solicitudes de otros orígenes (como el frontend)
app.use(express.json());   // para parsear JSON

// 👇 Aquí es donde se asocia el prefijo
app.use('/api/auth', authRoutes);

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
