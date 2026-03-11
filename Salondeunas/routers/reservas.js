const express = require('express');
const router = express.Router();
const ReservaController = require('../Controller/ReservaController');

// Obtener todas las reservas - GET
router.get('/', ReservaController.show);

// Obtener reserva por ID - GET
router.get('/:id', ReservaController.showById);

// Obtener reservas por usuario - GET
router.get('/usuario/:usuarioId', ReservaController.showByUsuario);

// Obtener reservas por sucursal - GET
router.get('/sucursal/:sucursalId', ReservaController.showBySucursal);

// Crear nueva reserva - POST
router.post('/create', ReservaController.create);

// Actualizar reserva - PUT
router.put('/update/:id', ReservaController.update);

// Eliminar reserva - DELETE
router.delete('/delete/:id', ReservaController.deleted);

module.exports = router;
