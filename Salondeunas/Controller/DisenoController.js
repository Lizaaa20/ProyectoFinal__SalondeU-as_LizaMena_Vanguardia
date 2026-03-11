const Diseno = require('../Models/Diseno');

// Create - Enviar diseño personalizado
async function create(req, res) {
    try {
        const diseno = new Diseno({
            usuarioId:   req.body.usuarioId,
            imagenUrl:   req.body.imagenUrl,
            descripcion: req.body.descripcion,
            cotizacion:  0,
            estado:      'pendiente',
            fechaEnvio:  new Date()
        });

        const data = await diseno.save();
        res.status(201).json({ message: 'Diseño enviado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener todos los diseños
async function show(req, res) {
    try {
        const data = await Diseno.find({})
            .populate('usuarioId', 'nombre apellido correo');

        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener diseño por ID
async function showById(req, res) {
    try {
        const data = await Diseno.findById(req.params.id)
            .populate('usuarioId', 'nombre apellido correo');

        if (!data) return res.status(404).json({ message: 'Diseño no encontrado' });
        return res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Read - Obtener diseños por usuario
async function showByUsuario(req, res) {
    try {
        const data = await Diseno.find({ usuarioId: req.params.usuarioId });

        if (data.length) return res.status(200).json(data);
        return res.status(204).json({ message: 'NO CONTENT' });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Update - Actualizar diseño (admin actualiza cotizacion y estado)
async function update(req, res) {
    try {
        const data = await Diseno.findByIdAndUpdate(req.params.id, {
            imagenUrl:   req.body.imagenUrl,
            descripcion: req.body.descripcion,
            cotizacion:  req.body.cotizacion,
            estado:      req.body.estado
        }, { new: true });

        if (!data) return res.status(404).json({ message: 'Diseño no encontrado' });
        res.status(200).json({ message: 'Diseño actualizado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Delete - Eliminar diseño
async function deleted(req, res) {
    try {
        const data = await Diseno.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: 'Diseño no encontrado' });
        res.status(200).json({ message: 'Diseño eliminado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    create,
    show,
    showById,
    showByUsuario,
    update,
    deleted
}