// Importar el módulo express para crear el router
const express = require('express');

// Crear una instancia del router de express
const router = express.Router();

// Importar el controlador de diseños
const DiseñoController = require('../Controller/DisenoController');

// Importar los middlewares de autenticación y autorización
const { verificarToken, soloAdmin } = require('../Middlewares/authMiddleware');

// ─── RUTAS PROTEGIDAS ─────────────────────────────────────────────────────────
// Todas las rutas de diseños requieren token válido

// Obtener todos los diseños enviados — solo admin
router.get('/', verificarToken, soloAdmin, DisenoController.show);

// Obtener un diseño específico por su ID
router.get('/:id', verificarToken, DisenoController.showById);

// Obtener todos los diseños enviados por un usuario específico
router.get('/usuario/:usuarioId', verificarToken, DisenoController.showByUsuario);

// Enviar un nuevo diseño personalizado — cliente autenticado
router.post('/create', verificarToken, DisenoController.create);

// Actualizar el estado y cotización de un diseño — solo admin
router.put('/update/:id', verificarToken, soloAdmin, DisenoController.update);

// Eliminar un diseño por su ID — solo admin
router.delete('/delete/:id', verificarToken, soloAdmin, DisenoController.deleted);

// Exportar el router para usarlo en app.js
module.exports = router;

















/*const express = require('express');
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

module.exports = router;*/