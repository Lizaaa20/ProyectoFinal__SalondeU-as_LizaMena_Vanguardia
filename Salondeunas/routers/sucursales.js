
const express = require('express');
const router = express.Router();
const SucursalController = require('../Controller/SucursalController');
const { verificarToken, soloAdmin } = require('../Middlewares/authMiddleware');



router.post('/create',       verificarToken, soloAdmin, SucursalController.create);
router.put('/update/:id',    verificarToken, soloAdmin, SucursalController.update);
router.delete('/delete/:id', verificarToken, soloAdmin, SucursalController.deleted);


router.get('/', SucursalController.show);
router.get('/:id', SucursalController.showById);

module.exports = router;