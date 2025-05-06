const express = require('express');
const { login, registerUsuario, registerEmprendedor, registerInversionista } = require('../controllers/authController');

const router = express.Router();

// Rutas para login y registro
router.post('/login', login);
router.post('/register/usuario', registerUsuario);
router.post('/register/emprendedor', registerEmprendedor);
router.post('/register/inversionista', registerInversionista);

module.exports = router;
