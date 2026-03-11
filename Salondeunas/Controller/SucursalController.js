const Sucursal = require('../Models/Sucursal');

// Create - Crear nueva sucursal
async function create(req, res) {
    try {
        const sucursal = new Sucursal({
            nombre:          req.body.nombre,
            direccion:       req.body.direccion,
            telefono:        req.body.telefono,
            horarioApertura: req.body.horarioApertura,
            horarioCierre:   req.body.horarioCierre,
            activa:          true
        });

        const data = await sucursal.save();
        res.status(201).json({ message: 'Sucursal creada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener todas las sucursales activas
async function show(req, res) {
    try {
        const data = await Sucursal.find({ activa: true });
        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener sucursal por ID
async function showById(req, res) {
    try {
        const data = await Sucursal.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Sucursal no encontrada' });
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Update - Actualizar sucursal
async function update(req, res) {
    try {
        const data = await Sucursal.findByIdAndUpdate(req.params.id, {
            nombre:          req.body.nombre,
            direccion:       req.body.direccion,
            telefono:        req.body.telefono,
            horarioApertura: req.body.horarioApertura,
            horarioCierre:   req.body.horarioCierre,
            activa:          req.body.activa
        }, { new: true });

        if (!data) return res.status(404).json({ message: 'Sucursal no encontrada' });
        res.status(200).json({ message: 'Sucursal actualizada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Delete - Eliminar sucursal
async function deleted(req, res) {
    try {
        const data = await Sucursal.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: 'Sucursal no encontrada' });
        res.status(200).json({ message: 'Sucursal eliminada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    create,
    show,
    showById,
    update,
    deleted
}