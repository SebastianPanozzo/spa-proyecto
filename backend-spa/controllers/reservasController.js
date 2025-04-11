// controllers/reservasController.js
const mongoose = require('mongoose');
const Reserva = require('../models/Reserva');

// ✅ GET: Obtener reservas (con filtro opcional por fecha y estado)
exports.obtenerReservas = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;

    if (req.query.fecha) {
      const fecha = new Date(req.query.fecha);
      const siguiente = new Date(fecha);
      siguiente.setDate(fecha.getDate() + 1);
      filtro.fecha = { $gte: fecha, $lt: siguiente };
    }

    const reservas = await Reserva.find(filtro).populate('cliente');
    res.json(reservas);
  } catch (err) {
    console.error("❌ Error al obtener reservas:", err);
    res.status(500).json({ mensaje: 'Error al obtener reservas' });
  }
};

// ✅ POST: Crear una reserva
exports.crearReserva = async (req, res) => {
  const { cliente, servicio, fecha, hora } = req.body;

  if (!cliente || !servicio || !fecha || !hora) {
    console.warn("⚠️ Faltan campos:", req.body);
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  // Validar que el ID de cliente sea válido
  if (!mongoose.Types.ObjectId.isValid(cliente)) {
    return res.status(400).json({ mensaje: 'ID de cliente inválido' });
  }

  try {
    const fechaObj = new Date(fecha);

    // Verificar que no haya una reserva para ese servicio, fecha y hora
    const yaExiste = await Reserva.findOne({ servicio, fecha: fechaObj, hora });
    if (yaExiste) {
      console.warn("⚠️ Ya existe reserva:", yaExiste);
      return res.status(400).json({ mensaje: 'Ese horario ya está reservado' });
    }

    const nuevaReserva = new Reserva({ cliente, servicio, fecha: fechaObj, hora });
    await nuevaReserva.save();

    console.log("✅ Reserva creada:", nuevaReserva);
    res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
  } catch (err) {
    console.error("❌ Error al crear la reserva:", err);
    res.status(500).json({ mensaje: 'Error al crear la reserva' });
  }
};

// ✅ PUT: Actualizar una reserva
exports.actualizarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (err) {
    console.error("❌ Error al actualizar la reserva:", err);
    res.status(500).json({ mensaje: 'Error al actualizar la reserva' });
  }
};

// ✅ DELETE: Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    res.json({ mensaje: 'Reserva eliminada con éxito' });
  } catch (err) {
    console.error("❌ Error al eliminar la reserva:", err);
    res.status(500).json({ mensaje: 'Error al eliminar la reserva' });
  }
};
