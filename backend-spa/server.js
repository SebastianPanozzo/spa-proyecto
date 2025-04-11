// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // Ajusta esto si tu frontend está en otro dominio
app.use(express.json());

// Rutas
const clientesRoutes = require('./routes/clientes');
const reservasRoutes = require('./routes/reservas');
const comentariosRoutes = require('./routes/comentarios');

app.use('/api/clientes', clientesRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/comentarios', comentariosRoutes);

// Conexión a MongoDB
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

if (!mongoUri) {
  console.error('❌ MONGO_URI no está definida en el archivo .env');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de conexión a MongoDB:', err);
    process.exit(1);
  });
