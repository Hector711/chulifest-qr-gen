const express = require('express');
const router = express.Router();

// Endpoint de salud
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'QR Generator API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 