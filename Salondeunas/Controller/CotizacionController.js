const Cotizacion = require('../Models/Cotizacion');

// Create - Crear cotizacion (admin)
async function create(req, res) {
    try {
        const cotizacion = new Cotizacion({
            disenoId:      req.body.disenoId,
            adminId:       req.body.adminId,
            montoEstimado: req.body.montoEstimado,
            notasAdmin:    req.body.notasAdmin,
            fecha:         new Date(),
            confirmada:    false
        });

        const data = await cotizacion.save();
        res.status(201).json({ message: 'Cotización creada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener todas las cotizaciones
async function show(req, res) {
    try {
        const data = await Cotizacion.find({})
            .populate('disenoId', 'descripcion imagenUrl estado')
            .populate('adminId',  'nombre apellido');

        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener cotizacion por ID
async function showById(req, res) {
    try {
        const data = await Cotizacion.findById(req.params.id)
            .populate('disenoId', 'descripcion imagenUrl estado')
            .populate('adminId',  'nombre apellido');

        if (!data) return res.status(404).json({ message: 'Cotización no encontrada' });
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener cotizacion por diseño
async function showByDiseno(req, res) {
    try {
        const data = await Cotizacion.findOne({ disenoId: req.params.disenoId })
            .populate('disenoId', 'descripcion imagenUrl estado')
            .populate('adminId',  'nombre apellido');

        if (!data) return res.status(404).json({ message: 'Cotización no encontrada' });
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Update - Actualizar cotizacion
async function update(req, res) {
    try {
        const data = await Cotizacion.findByIdAndUpdate(req.params.id, {
            montoEstimado: req.body.montoEstimado,
            notasAdmin:    req.body.notasAdmin,
            confirmada:    req.body.confirmada
        }, { new: true });

        if (!data) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.status(200).json({ message: 'Cotización actualizada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Delete - Eliminar cotizacion
async function deleted(req, res) {
    try {
        const data = await Cotizacion.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: 'Cotización no encontrada' });
        res.status(200).json({ message: 'Cotización eliminada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    create,
    show,
    showById,
    showByDiseno,
    update,
    deleted
}