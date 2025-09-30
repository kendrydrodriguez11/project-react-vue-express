const express = require('express');
const router = express.Router();
const personaCtrl = require('../controllers/peopleController');

// CRUD completo
router.get('/', personaCtrl.obtenerPersonas);       // GET todas
router.get('/:id', personaCtrl.obtenerPersona);     // GET por id
router.post('/', personaCtrl.crearPersona);         // POST crear
router.put('/:id', personaCtrl.actualizarPersona);  // PUT actualizar
router.delete('/:id', personaCtrl.eliminarPersona); // DELETE eliminar

module.exports = router;
