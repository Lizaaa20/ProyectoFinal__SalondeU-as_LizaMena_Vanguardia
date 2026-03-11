const Reserva = require('../Models/Reserva');

// Create - Crear nueva reserva
async function create(req, res) {
    try {
        const reserva = new Reserva({
            usuarioId:  req.body.usuarioId,
            servicioId: req.body.servicioId,
            sucursalId: req.body.sucursalId,
            fechaCita:  req.body.fechaCita,
            horaCita:   req.body.horaCita,
            estado:     'pendiente',
            notas:      req.body.notas
        });

        const data = await reserva.save();
        res.status(201).json({ message: 'Reserva creada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener todas las reservas
async function show(req, res) {
    try {
        const data = await Reserva.find({})
            .populate('usuarioId',  'nombre apellido correo')
            .populate('servicioId', 'nombreServicio precioBase duracionMin')
            .populate('sucursalId', 'nombre direccion');

        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener reserva por ID
async function showById(req, res) {
    try {
        const data = await Reserva.findById(req.params.id)
            .populate('usuarioId',  'nombre apellido correo')
            .populate('servicioId', 'nombreServicio precioBase duracionMin')
            .populate('sucursalId', 'nombre direccion');

        if (!data) return res.status(404).json({ message: 'Reserva no encontrada' });
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener reservas por usuario
async function showByUsuario(req, res) {
    try {
        const data = await Reserva.find({ usuarioId: req.params.usuarioId })
            .populate('servicioId', 'nombreServicio precioBase')
            .populate('sucursalId', 'nombre direccion');

        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener reservas por sucursal
async function showBySucursal(req, res) {
    try {
        const data = await Reserva.find({ sucursalId: req.params.sucursalId })
            .populate('usuarioId',  'nombre apellido correo')
            .populate('servicioId', 'nombreServicio precioBase');

        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Update - Actualizar estado de reserva
async function update(req, res) {
    try {
        const data = await Reserva.findByIdAndUpdate(req.params.id, {
            usuarioId:  req.body.usuarioId,
            servicioId: req.body.servicioId,
            sucursalId: req.body.sucursalId,
            fechaCita:  req.body.fechaCita,
            horaCita:   req.body.horaCita,
            estado:     req.body.estado,
            notas:      req.body.notas
        }, { new: true });

        if (!data) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.status(200).json({ message: 'Reserva actualizada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Delete - Eliminar reserva
async function deleted(req, res) {
    try {
        const data = await Reserva.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: 'Reserva no encontrada' });
        res.status(200).json({ message: 'Reserva eliminada correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    create,
    show,
    showById,
    showByUsuario,
    showBySucursal,
    update,
    deleted
}