const express = require('express');
const router = express.Router();
const ServicioController = require('../Controller/ServicioController');

// Obtener todos los servicios activos - GET
router.get('/', ServicioController.show);

// Obtener servicio por ID - GET
router.get('/:id', ServicioController.showById);

// Obtener servicios por categoría - GET
router.get('/categoria/:categoria', ServicioController.showByCategoria);

// Crear nuevo servicio - POST
router.post('/create', ServicioController.create);

// Actualizar servicio - PUT
router.put('/update/:id', ServicioController.update);

// Eliminar servicio - DELETE
router.delete('/delete/:id', ServicioController.deleted);

module.exports = router;
