const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authController = require('../controllers/authController');

/* ---------------------- RUTAS DE AUTENTICACIÓN ---------------------- */

// Obtener roles
router.get('/roles', async (req, res) => {
  try {
    const [roles] = await db.query('SELECT id, rol FROM roles');
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ message: 'Error al cargar los roles' });
  }
});

// Login y registro
router.post('/login', authController.login);
router.post('/register/usuario', authController.registerUsuario);
// router.post('/register/emprendedor', authController.registerEmprendedor);
// router.post('/register/inversionista', authController.registerInversionista);

module.exports = router;
