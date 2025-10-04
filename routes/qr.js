const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

// Endpoint principal para generar QR solo con client_recID
router.post('/generate-qr', async (req, res) => {
  try {
    const { client_recID } = req.body;
    if (!client_recID) {
      return res.status(400).json({
        error: 'El campo "client_recID" es obligatorio',
        message: 'Debe proporcionar un client_recID en el cuerpo de la petición'
      });
    } 
    const qrText = `client_recID=${client_recID}`;
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
    res.json({
      client_recID,
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

module.exports = router; 