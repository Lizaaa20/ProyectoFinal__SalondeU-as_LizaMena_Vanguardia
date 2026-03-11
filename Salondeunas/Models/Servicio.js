const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    nombreServicio: { type: String },
    descripcion:    { type: String },
    precioBase:     { type: Number },
    duracionMin:    { type: Number },
    categoria:      { type: String },
    imagenUrl:      { type: String },
    activo:         { type: Boolean }
}, { versionKey: false });

const Servicio = mongoose.model('servicio', servicioSchema);

module.exports = Servicio;