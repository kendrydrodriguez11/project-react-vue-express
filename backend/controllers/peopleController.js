const db = require('../db');

// Obtener todas las personas
exports.obtenerPersonas = (req, res) => {
  db.all('SELECT * FROM registro_personas', [], (err, filas) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(filas);
  });
};

// Obtener persona por ID
exports.obtenerPersona = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM registro_personas WHERE id = ?', [id], (err, fila) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!fila) return res.status(404).json({ error: 'Persona no encontrada' });
    res.json(fila);
  });
};

// Crear nueva persona
exports.crearPersona = (req, res) => {
  const { dni, nombres, apellidos, fecha_nacimiento, genero, ciudad } = req.body;

  if (!dni || !nombres || !apellidos || !fecha_nacimiento || !genero || !ciudad) {
    return res.status(400).json({ error: 'Complete todos los campos requeridos' });
  }

  const sql = `INSERT INTO registro_personas (dni, nombres, apellidos, fecha_nacimiento, genero, ciudad)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(sql, [dni, nombres, apellidos, fecha_nacimiento, genero, ciudad], function (err) {
    if (err) return res.status(400).json({ error: 'El DNI ya existe o error en la BD' });
    res.status(201).json({ id: this.lastID, mensaje: 'Persona creada' });
  });
};

// Actualizar persona
exports.actualizarPersona = (req, res) => {
  const { id } = req.params;
  const { dni, nombres, apellidos, fecha_nacimiento, genero, ciudad } = req.body;

  const sql = `UPDATE registro_personas
               SET dni = ?, nombres = ?, apellidos = ?, fecha_nacimiento = ?, genero = ?, ciudad = ?
               WHERE id = ?`;

  db.run(sql, [dni, nombres, apellidos, fecha_nacimiento, genero, ciudad, id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Persona no encontrada' });
    res.json({ mensaje: 'Persona actualizada correctamente' });
  });
};

// Eliminar persona
exports.eliminarPersona = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM registro_personas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Persona no encontrada' });
    res.json({ mensaje: 'Persona eliminada correctamente' });
  });
};
