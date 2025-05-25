const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

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
// Obtener datos del usuario autenticado
router.get('/perfil', authMiddleware, async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const [result] = await db.query(
      'SELECT id, nombre_completo, correo, cedula, fecha_nacimiento, genero FROM usuarioss WHERE id = ?',
      [usuarioId]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al cargar el perfil' });
  }
});
// Actualizar datos del perfil
router.put('/perfil', authMiddleware, async (req, res) => {
  const usuarioId = req.usuario.id;
  const { nombre_completo, correo, cedula, fecha_nacimiento, genero } = req.body;

  try {
    await db.query(
      `UPDATE usuarioss 
       SET nombre_completo = ?, correo = ?, cedula = ?, fecha_nacimiento = ?, genero = ? 
       WHERE id = ?`,
      [nombre_completo, correo, cedula, fecha_nacimiento, genero, usuarioId]
    );

    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
});
// Login y registro
router.post('/login', authController.login);
router.post('/register/usuario', authController.registerUsuario);


module.exports = router;
