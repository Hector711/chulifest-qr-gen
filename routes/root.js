const express = require('express');
const router = express.Router();

// Endpoint raíz
router.get('/', (req, res) => {
  res.json({
    name: 'QR Generator API',
    version: '1.0.0',
    description: 'Microservicio para generar códigos QR',
    endpoints: {
      'POST /generate-qr': 'Generar QR desde JSON',
      'GET /health': 'Estado del servicio',
      'GET /': 'Información y documentación'
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

module.exports = router; 