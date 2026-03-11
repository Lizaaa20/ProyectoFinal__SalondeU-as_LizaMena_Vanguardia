
const express = require('express');
const router = express.Router();
const SucursalController = require('../Controller/SucursalController');
const { verificarToken, soloAdmin } = require('../Middlewares/authMiddleware');

// Rutas públicas — cualquiera puede ver las sucursales
router.get('/', SucursalController.show);
router.get('/:id', SucursalController.showById);

// Rutas protegidas — solo admin
router.post('/create',       verificarToken, soloAdmin, SucursalController.create);
router.put('/update/:id',    verificarToken, soloAdmin, SucursalController.update);
router.delete('/delete/:id', verificarToken, soloAdmin, SucursalController.deleted);

module.exports = router;












/*const express = require('express');
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

module.exports = router;*/
