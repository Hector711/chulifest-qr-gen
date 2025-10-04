const express = require('express');
const router = express.Router();

// Endpoint raíz
router.get('/', (req, res) => {
  res.json({
    name: 'QR Generator API',
    version: '1.1.0',
    description: 'Microservicio para generar códigos QR',
    endpoints: {
      'POST /generate-qr': 'Generar QR desde JSON (client_recID o uid)',
      'GET /generate-qr': 'Generar QR con query string (client_recID o uid)',
      'GET /health': 'Estado del servicio',
      'GET /': 'Información y documentación'
    },
    examples: [
      {
        method: 'POST',
        url: '/generate-qr',
        body: { uid: 'abc123' }
      },
      {
        method: 'POST',
        url: '/generate-qr',
        body: { client_recID: 'rec_12345' }
      },
      {
        method: 'GET',
        url: '/generate-qr?uid=abc123'
      },
      {
        method: 'GET',
        url: '/generate-qr?client_recID=rec_12345'
      }
    ]
  });
});

module.exports = router; 