const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Crear emprendimiento
router.post("/", authMiddleware, upload.single("logo"), async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
  
    const { nombre, estado, categoria, descripcion } = req.body;
    const logoPath = req.file ? `/uploads/${req.file.filename}` : null;
  
    // Asegurarse de que req.usuario esté definido
    const usuario_id = req.usuario?.id;
    if (!usuario_id) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }
  
    try {
      // Obtener el rol_usuario_id relacionado al usuario
      const [rolUsuario] = await db.query(
        "SELECT rol_id FROM rol_usuarios WHERE usuario_id = ? LIMIT 1",
        [usuario_id]
      );
  
      if (!rolUsuario || rolUsuario.length === 0) {
        return res.status(400).json({
          message: "No se encontró relación rol-usuario",
        });
      }
  
      const rol_usuario_id = rolUsuario[0].rol_id;
  
      // Insertar nuevo emprendimiento
      await db.query(
        `INSERT INTO emprendimiento 
          (nombre_Emprendimiento, estado_emprendimiento, categoria, descripcion, url_logo, rol_usuario_id, usuario_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nombre, estado, categoria, descripcion, logoPath, rol_usuario_id, usuario_id]
      );
  
      res.status(201).json({ message: "Emprendimiento creado correctamente" });
    } catch (error) {
      console.error("Error en creación de emprendimiento:", error);
      res.status(500).json({
        error: "Error al crear el emprendimiento",
        detail: error.message,
      });
    }
  });

// Obtener emprendimientos del usuario
router.get('/misEmprendimientos', authMiddleware, async (req, res) => {
    try {
      const usuario_id = req.usuario.id;
  
      const [emprendimientos] = await db.query(
        'SELECT * FROM emprendimiento WHERE usuario_id = ?',
        [usuario_id]
      );
  
      res.json(emprendimientos);
    } catch (error) {
      console.error('Error al obtener emprendimientos del usuario:', error);
      res.status(500).json({ error: 'Error al obtener emprendimientos del usuario' });
    }
  });
  
  // Obtener todos los emprendimientos por categoría
router.get("/categoria/:nombreCategoria", async (req, res) => {
  try {
    // Decodificar la categoría (por ejemplo: "Tecnolog%C3%ADa%20e%20Innovaci%C3%B3n" → "Tecnología e Innovación")
    const nombreCategoria = decodeURIComponent(req.params.nombreCategoria).toLowerCase();

    const [emprendimientos] = await db.query(
      "SELECT * FROM emprendimiento WHERE LOWER(categoria) = ?",
      [nombreCategoria]
    );

    res.json(emprendimientos);
  } catch (error) {
    console.error("Error al obtener emprendimientos por categoría:", error);
    res.status(500).json({ error: "Error al obtener emprendimientos" });
  }
  console.log("Categoría recibida:", nombreCategoria);
});


module.exports = router;
