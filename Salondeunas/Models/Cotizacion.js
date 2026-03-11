const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cotizacionSchema = new Schema({
    disenoId:      { type: Schema.Types.ObjectId, ref: 'diseno' },
    adminId:       { type: Schema.Types.ObjectId, ref: 'usuario' },
    montoEstimado: { type: Number },
    notasAdmin:    { type: String },
    fecha:         { type: Date },
    confirmada:    { type: Boolean }
}, { versionKey: false });

const Cotizacion = mongoose.model('cotizacion', cotizacionSchema);

module.exports = Cotizacion;