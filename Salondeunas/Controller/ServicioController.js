const Servicio = require('../Models/Servicio');

// Create - Crear nuevo servicio
async function create(req, res) {
    try {
        const servicio = new Servicio({
            nombreServicio: req.body.nombreServicio,
            descripcion:    req.body.descripcion,
            precioBase:     req.body.precioBase,
            duracionMin:    req.body.duracionMin,
            categoria:      req.body.categoria,
            
            activo:         true
        });

        const data = await servicio.save();
        res.status(201).json({ message: 'Servicio creado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener todos los servicios activos
async function show(req, res) {
    try {
        const data = await Servicio.find({ activo: true });
        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener servicio por ID
async function showById(req, res) {
    try {
        const data = await Servicio.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Servicio no encontrado' });
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener servicios por categoría
async function showByCategoria(req, res) {
    try {
        const data = await Servicio.find({ categoria: req.params.categoria, activo: true });
        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Update - Actualizar servicio
async function update(req, res) {
    try {
        const data = await Servicio.findByIdAndUpdate(req.params.id, {
            nombreServicio: req.body.nombreServicio,
            descripcion:    req.body.descripcion,
            precioBase:     req.body.precioBase,
            duracionMin:    req.body.duracionMin,
            categoria:      req.body.categoria,
            
            activo:         req.body.activo
        }, { new: true });

        if (!data) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json({ message: 'Servicio actualizado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Delete - Eliminar servicio
async function deleted(req, res) {
    try {
        const data = await Servicio.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(200).json({ message: 'Servicio eliminado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    create,
    show,
    showById,
    showByCategoria,
    update,
    deleted
}