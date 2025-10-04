const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

// Utilidad común para generar QR desde un valor
async function generateQrFromId(res, idKey, idValue) {
  try {
    const qrText = `${idKey}=${idValue}`;
    const qrBase64 = await QRCode.toDataURL(qrText, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: { dark: '#000000', light: '#FFFFFF' }
    });
    return res.json({
      [idKey]: idValue,
      qr_base64: qrBase64
    });
  } catch (error) {
    console.error('Error generando QR:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo generar el código QR'
    });
  }
}

// POST /generate-qr — acepta client_recID o uid en el body
router.post('/generate-qr', async (req, res) => {
  const { client_recID, uid } = req.body || {};
  const idValue = client_recID || uid;
  const idKey = client_recID ? 'client_recID' : (uid ? 'uid' : null);
  if (!idKey || !idValue) {
    return res.status(400).json({
      error: 'Parámetro faltante',
      message: 'Debe proporcionar "client_recID" o "uid" en el body'
    });
  }
  return generateQrFromId(res, idKey, idValue);
});

// GET /generate-qr — acepta client_recID o uid por query string
router.get('/generate-qr', async (req, res) => {
  const { client_recID, uid } = req.query || {};
  const idValue = client_recID || uid;
  const idKey = client_recID ? 'client_recID' : (uid ? 'uid' : null);
  if (!idKey || !idValue) {
    return res.status(400).json({
      error: 'Parámetro faltante',
      message: 'Debe proporcionar "client_recID" o "uid" como query string'
    });
  }
  return generateQrFromId(res, idKey, idValue);
});

module.exports = router; 