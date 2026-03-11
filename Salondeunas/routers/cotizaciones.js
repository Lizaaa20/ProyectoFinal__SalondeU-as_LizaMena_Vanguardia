const express = require('express');
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

module.exports = router;