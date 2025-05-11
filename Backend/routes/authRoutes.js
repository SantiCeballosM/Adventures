const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authController = require('../controllers/authController');

// Endpoint para obtener roles (aquí es donde debe estar)
router.get('/roles', async (req, res) => {
    try {
      // Usar await directamente con mysql2/promise
      const [roles] = await db.query('SELECT id, rol FROM roles');
      res.json(roles);
    } catch (error) {
      console.error('Error al obtener roles:', error);
      res.status(500).json({ message: 'Error al cargar los roles' });
    }
  });

// Tus otras rutas existentes
router.post('/login', authController.login);
router.post('/register/usuario', authController.registerUsuario);
// router.post('/register/emprendedor', authController.registerEmprendedor);
// router.post('/register/inversionista', authController.registerInversionista);

module.exports = router;