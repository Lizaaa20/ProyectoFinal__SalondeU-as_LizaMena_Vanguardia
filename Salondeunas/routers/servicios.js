
const express = require('express');
const router = express.Router();
const ServicioController = require('../Controller/ServicioController');
const { verificarToken, soloAdmin } = require('../Middlewares/authMiddleware');

// Rutas públicas — cualquiera puede ver el catálogo
router.get('/',                    ServicioController.show);
router.get('/:id',                 ServicioController.showById);
router.get('/categoria/:categoria', ServicioController.showByCategoria);

// Rutas protegidas — solo admin
router.post('/create',      verificarToken, soloAdmin, ServicioController.create);
router.put('/update/:id',   verificarToken, soloAdmin, ServicioController.update);
router.delete('/delete/:id',verificarToken, soloAdmin, ServicioController.deleted);

module.exports = router;




/*const express = require('express');
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

module.exports = router;*/
