const express = require('express');
const router = express.Router();
const CotizacionController = require('../Controller/CotizacionController');
const { verificarToken, soloAdmin } = require('../Middlewares/authMiddleware');

// Rutas protegidas — requieren token
router.get('/',                    verificarToken, soloAdmin, CotizacionController.show);
router.get('/:id',                 verificarToken, CotizacionController.showById);
router.get('/diseno/:disenoId',    verificarToken, CotizacionController.showByDiseno);
router.post('/create',             verificarToken, soloAdmin, CotizacionController.create);
router.put('/update/:id',          verificarToken, soloAdmin, CotizacionController.update);
router.delete('/delete/:id',       verificarToken, soloAdmin, CotizacionController.deleted);

module.exports = router;
















/*const express = require('express');
const router = express.Router();
const CotizacionController = require('../Controller/CotizacionController');

// Obtener todas las cotizaciones - GET
router.get('/', CotizacionController.show);

// Obtener cotizacion por ID - GET
router.get('/:id', CotizacionController.showById); 

// Obtener cotizacion por diseño - GET
router.get('/diseno/:disenoId', CotizacionController.showByDiseno);

// Crear cotizacion - POST
router.post('/create', CotizacionController.create);

// Actualizar cotizacion - PUT
router.put('/update/:id', CotizacionController.update);

// Eliminar cotizacion - DELETE
router.delete('/delete/:id', CotizacionController.deleted);

module.exports = router;*/