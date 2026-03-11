const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
    usuarioId:  { type: Schema.Types.ObjectId, ref: 'usuario' },
    servicioId: { type: Schema.Types.ObjectId, ref: 'servicio' },
    sucursalId: { type: Schema.Types.ObjectId, ref: 'sucursal' },
    fechaCita:  { type: Date },
    horaCita:   { type: String },
    estado:     { type: String },
    notas:      { type: String }
}, { versionKey: false });

const Reserva = mongoose.model('reserva', reservaSchema);

module.exports = Reserva;