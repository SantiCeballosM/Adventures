const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Login general: busca en las tres tablas por orden
const login = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }

  // Buscar en tabla usuarios
  const buscarUsuario = () => {
    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error interno del servidor' });
      if (results.length === 0) return buscarEmprendedor();
      
      const usuario = results[0];
      bcrypt.compare(contraseña, usuario.contraseña, (err, isMatch) => {
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario.id, tipo: 'usuario' }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });

        return res.json({
          message: 'Login exitoso como usuario',
          token,
          tipo: 'usuario',
          nombre: usuario.nombre_completo
        });
      });
    });
  };

  // Buscar en tabla emprendedores
  const buscarEmprendedor = () => {
    db.query('SELECT * FROM emprendedores WHERE correo = ?', [correo], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error interno del servidor' });
      if (results.length === 0) return buscarInversionista();

      const emprendedor = results[0];
      bcrypt.compare(contraseña, emprendedor.contraseña, (err, isMatch) => {
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: emprendedor.id, tipo: 'emprendedor' }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });

        return res.json({
          message: 'Login exitoso como emprendedor',
          token,
          tipo: 'emprendedor',
          nombre_proyecto: emprendedor.nombre_proyecto,
          categoria: emprendedor.categoria_proyecto
        });
      });
    });
  };

  // Buscar en tabla inversionistas
  const buscarInversionista = () => {
    db.query('SELECT * FROM inversionistas WHERE correo = ?', [correo], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error interno del servidor' });
      if (results.length === 0) return res.status(401).json({ message: 'Correo no registrado' });

      const inversionista = results[0];
      bcrypt.compare(contraseña, inversionista.contraseña, (err, isMatch) => {
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: inversionista.id, tipo: 'inversionista' }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });

        return res.json({
          message: 'Login exitoso como inversionista',
          token,
          tipo: 'inversionista',
          categoria: inversionista.categoria_interes
        });
      });
    });
  };

  buscarUsuario(); // Empieza la cadena
};

// Registro individual
const registerUsuario = (req, res) => {
  const { correo, contraseña, nombre_completo, fecha_nacimiento, genero } = req.body;

  if (!correo || !contraseña || !nombre_completo || !fecha_nacimiento || !genero) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) throw err;
    const query = 'INSERT INTO usuarios (correo, contraseña, nombre_completo, fecha_nacimiento, genero) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [correo, hashedPassword, nombre_completo, fecha_nacimiento, genero], (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
};

const registerEmprendedor = (req, res) => {
  // console.log('Datos recibidos:', req.body); 
  const { correo, contraseña,nombre_completo, fecha_nacimiento, genero, numero_cedula } = req.body;

  if (!correo || !contraseña || !nombre_completo || !fecha_nacimiento || !genero || !numero_cedula) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) throw err;
    const query = 'INSERT INTO emprendedores (correo, contraseña,nombre_completo, fecha_nacimiento, genero, numero_cedula) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [correo, hashedPassword, nombre_proyecto, estado_proyecto, categoria_proyecto], (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar el emprendedor' });
      res.status(201).json({ message: 'Emprendedor registrado exitosamente' });
    });
  });
};

const registerInversionista = (req, res) => {
  // console.log('Datos recibidos:', req.body); 
  const { correo, contraseña,nombre_completo, fecha_nacimiento, genero, numero_cedula, categoria_interes } = req.body;

  if (!correo || !contraseña || !nombre_completo || !fecha_nacimiento || !genero || !numero_cedula || !categoria_interes) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) throw err;
    const query = 'INSERT INTO inversionistas (correo, contraseña,nombre_completo, fecha_nacimiento, genero, numero_cedula, categoria_interes) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [correo, hashedPassword, nombre_completo, fecha_nacimiento, genero, numero_cedula, categoria_interes], (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar el inversionista' });
      res.status(201).json({ message: 'Inversionista registrado exitosamente' });
    });
  });
};

module.exports = {
  login,
  registerUsuario,
  registerEmprendedor,
  registerInversionista
};
