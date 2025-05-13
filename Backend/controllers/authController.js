const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Login general: busca en las tres tablas por orden
const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // 1. Buscar usuario
    const [users] = await db.query('SELECT * FROM usuarioss WHERE correo = ?', [correo]);
    
    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = users[0];

    // 2. Verificar contraseña
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // 3. Obtener roles del usuario
    const [userRoles] = await db.query(`
      SELECT r.rol 
      FROM rol_usuarios ru
      JOIN roles r ON ru.rol_id = r.id
      WHERE ru.usuario_id = ?
    `, [user.id]);

    // 4. Generar token con información del rol
    const token = jwt.sign(
      {
        id: user.id,
        roles: userRoles.map(r => r.rol),
        nombre: user.nombre_completo
      },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre_completo,
        roles: userRoles.map(r => r.rol)
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


const registerUsuario = async (req, res) => {
  const { nombre_completo, cedula, correo, contraseña, fecha_nacimiento, genero, rol_id } = req.body;

  // Validación mejorada
  if (!nombre_completo || !cedula || !correo || !contraseña || !fecha_nacimiento || !genero || !rol_id) {
    return res.status(400).json({ 
      success: false,
      message: 'Todos los campos son obligatorios' 
    });
  }

  try {
    // 1. Verificar si el usuario ya existe
    const [userExists] = await db.query(
      'SELECT id FROM usuarioss WHERE correo = ? OR cedula = ?', 
      [correo, cedula]
    );

    if (userExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El correo o cédula ya están registrados'
      });
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 12);

    // 3. Insertar usuario
    const [userResult] = await db.query(
      'INSERT INTO usuarioss (nombre_completo, cedula, correo, contraseña, fecha_nacimiento, genero) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre_completo, cedula, correo, hashedPassword, fecha_nacimiento, genero]
    );

    // 4. Insertar relación usuario-rol
    await db.query(
      'INSERT INTO rol_usuarios (usuario_id, rol_id) VALUES (?, ?)',
      [userResult.insertId, rol_id]
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      userId: userResult.insertId
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    // Respuesta detallada del error
    res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario',
      error: error.message,
      sqlError: error.sqlMessage || null
    });
  }
};

module.exports = {
  login,
  registerUsuario,
};
