const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente'
  }
}, { timestamps: true });

// 🔒 Prevenir duplicados por servicio, fecha y hora
// ⚠️ Asegurate de que la colección esté vacía o sin duplicados antes de crear este índice único
reservaSchema.index({ servicio: 1, fecha: 1, hora: 1 }, { unique: true });

module.exports = mongoose.model('Reserva', reservaSchema);
