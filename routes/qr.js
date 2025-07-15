const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

// Endpoint principal para generar QR solo con user_id
router.post('/generate-qr', async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({
        error: 'El campo "user_id" es obligatorio',
        message: 'Debe proporcionar un user_id en el cuerpo de la petición'
      });
    }
    const qrText = `user_id=${user_id}`;
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
      user_id,
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