const express = require('express');
const router = express.Router();
const DisenoController = require('../Controller/DisenoController');

// Obtener todos los diseños - GET
router.get('/', DisenoController.show);

// Obtener diseño por ID - GET
router.get('/:id', DisenoController.showById);

// Obtener diseños por usuario - GET
router.get('/usuario/:usuarioId', DisenoController.showByUsuario);

// Enviar nuevo diseño - POST
router.post('/create', DisenoController.create);

// Actualizar diseño - PUT
router.put('/update/:id', DisenoController.update);

// Eliminar diseño - DELETE
router.delete('/delete/:id', DisenoController.deleted);

module.exports = router;