const express = require('express');
const router = express.Router();
const SucursalController = require('../Controller/SucursalController');

// Obtener todas las sucursales activas - GET
router.get('/', SucursalController.show);

// Obtener sucursal por ID - GET
router.get('/:id', SucursalController.showById);

// Crear nueva sucursal - POST
router.post('/create', SucursalController.create);

// Actualizar sucursal - PUT
router.put('/update/:id', SucursalController.update);

// Eliminar sucursal - DELETE
router.delete('/delete/:id', SucursalController.deleted);

module.exports = router;
