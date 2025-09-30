const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./datos_personas.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a SQLite');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS registro_personas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dni TEXT NOT NULL UNIQUE,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero TEXT NOT NULL,
    ciudad TEXT NOT NULL
  )
`);

module.exports = db;
