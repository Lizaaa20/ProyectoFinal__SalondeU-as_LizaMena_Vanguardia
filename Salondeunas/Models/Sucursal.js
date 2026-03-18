const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sucursalSchema = new Schema({
    nombre:          { type: String },
    direccion:       { type: String },
    telefono:        { type: String },
    horarioApertura: { type: String },
    horarioCierre:   { type: String },
    activa:          { type: Boolean },
    
}, { versionKey: false });

const Sucursal = mongoose.model('sucursal', sucursalSchema);

module.exports = Sucursal;