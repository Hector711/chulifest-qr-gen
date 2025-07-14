const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint principal para generar QR
app.post('/generate-qr', async (req, res) => {
  try {
    // Validar que haya al menos un campo en el body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: 'El body no puede estar vacío',
        message: 'Debe proporcionar al menos un campo en el cuerpo de la petición'
      });
    }

    // Codificar todos los campos recibidos en el QR como query string
    const params = new URLSearchParams(req.body).toString();
    const qrText = params;

    // Generar el QR como base64
    const qrBase64 = await QRCode.toDataURL(qrText, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Devolver la respuesta en el formato especificado
    res.json({
      ...req.body, // Devuelve también los datos recibidos
      qr_base64: qrBase64
    });

  } catch (error) {
    console.error('Error generando QR:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo generar el código QR'
    });
  }
});

// Endpoint adicional GET para generar QR (opcional)
app.get('/generate-qr', async (req, res) => {
  try {
    const { uid } = req.query;

    // Validar que el parámetro uid esté presente
    if (!uid) {
      return res.status(400).json({
        error: 'El parámetro "uid" es obligatorio',
        message: 'Debe proporcionar un uid como parámetro de consulta'
      });
    }

    // Crear el texto del QR
    const qrText = `uid=${uid}`;

    // Generar el QR como base64
    const qrBase64 = await QRCode.toDataURL(qrText, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Devolver la respuesta
    res.json({
      uid: uid,
      qr_base64: qrBase64
    });

  } catch (error) {
    console.error('Error generando QR:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo generar el código QR'
    });
  }
});

// Endpoint de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'QR Generator API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({
    name: 'QR Generator API',
    version: '1.0.0',
    description: 'Microservicio para generar códigos QR',
    endpoints: {
      'POST /generate-qr': 'Generar QR desde JSON',
      'GET /generate-qr?uid=abc123': 'Generar QR desde parámetros',
      'GET /health': 'Estado del servicio'
    },
    example: {
      method: 'POST',
      url: '/generate-qr',
      body: {
        uid: 'abc123'
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: 'La ruta solicitada no existe',
    availableEndpoints: [
      'POST /generate-qr',
      'GET /generate-qr?uid=abc123',
      'GET /health',
      'GET /'
    ]
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 QR Generator API iniciado en puerto ${PORT}`);
  console.log(`📱 Endpoint principal: http://localhost:${PORT}/generate-qr`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 Documentación: http://localhost:${PORT}/`);
});

module.exports = app; 