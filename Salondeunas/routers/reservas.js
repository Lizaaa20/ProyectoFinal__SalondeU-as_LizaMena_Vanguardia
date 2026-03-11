const express = require('express');
const router = express.Router();
const ReservaController = require('../Controller/ReservaController');
const { verificarToken, soloAdmin } = require('../Middlewares/authMiddleware');

// Rutas protegidas — requieren token
router.get('/',                        verificarToken, soloAdmin, ReservaController.show);
router.get('/:id',                     verificarToken, ReservaController.showById);
router.get('/usuario/:usuarioId',      verificarToken, ReservaController.showByUsuario);
router.get('/sucursal/:sucursalId',    verificarToken, soloAdmin, ReservaController.showBySucursal);
router.post('/create',                 verificarToken, ReservaController.create);
router.put('/update/:id',              verificarToken, soloAdmin, ReservaController.update);
router.delete('/delete/:id',           verificarToken, soloAdmin, ReservaController.deleted);

module.exports = router;
























/*const express = require('express');
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

module.exports = router;*/
