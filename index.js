const express = require('express');
const cors = require('cors');
require('dotenv').config();

const qrRoutes = require('./routes/qr');
const healthRoutes = require('./routes/health');
const rootRoutes = require('./routes/root');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Detrás de proxy (Render/Heroku) para manejar headers x-forwarded-*
app.set('trust proxy', 1);

// Rutas
app.use(qrRoutes);
app.use(healthRoutes);
app.use(rootRoutes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: 'La ruta solicitada no existe',
    availableEndpoints: [
      'POST /generate-qr',
      'GET /health',
      'GET /'
    ]
  });
});

// Iniciar el servidor y ajustar timeouts para evitar 503 por conexiones keep-alive
const server = app.listen(PORT, () => {
  console.log(`🚀 QR Generator API iniciado en puerto ${PORT}`);
  console.log(`📱 Endpoint principal: http://localhost:${PORT}/generate-qr`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 Documentación: http://localhost:${PORT}/`);
});

// Ajustes recomendados en plataformas con proxy (Render)
// Evita que Node cierre conexiones keep-alive antes que el proxy
server.keepAliveTimeout = 65000; // 65s
server.headersTimeout = 66000;   // 66s

module.exports = app; 