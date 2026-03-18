const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre:      { type: String },
    apellido:    { type: String },
    correo:      { type: String },
    telefono:    { type: String },
    password:    { type: String },
    rol:         { type: String }   // 'cliente' | 'admin'
}, { versionKey: false });

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;

