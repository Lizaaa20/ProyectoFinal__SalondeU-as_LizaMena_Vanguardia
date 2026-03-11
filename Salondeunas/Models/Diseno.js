const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disenoSchema = new Schema({
    usuarioId:   { type: Schema.Types.ObjectId, ref: 'usuario' },
    imagenUrl:   { type: String },
    descripcion: { type: String },
    cotizacion:  { type: Number },
    estado:      { type: String },
    fechaEnvio:  { type: Date }
}, { versionKey: false });

const Diseno = mongoose.model('diseno', disenoSchema);

module.exports = Diseno;