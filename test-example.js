// Ejemplo de uso de la QR Generator API
const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function testQRAPI() {
  console.log('🧪 Probando QR Generator API...\n');

  try {
    // 1. Probar endpoint de salud
    console.log('1️⃣ Probando health check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // 2. Probar POST /generate-qr
    console.log('2️⃣ Probando POST /generate-qr...');
    const postResponse = await axios.post(`${API_BASE_URL}/generate-qr`, {
      uid: 'abc123'
    });
    console.log('✅ POST QR generado para uid:', postResponse.data.uid);
    console.log('📱 QR base64 (primeros 100 chars):', postResponse.data.qr_base64.substring(0, 100) + '...');
    console.log('');

    // 3. Probar GET /generate-qr
    console.log('3️⃣ Probando GET /generate-qr...');
    const getResponse = await axios.get(`${API_BASE_URL}/generate-qr?uid=test456`);
    console.log('✅ GET QR generado para uid:', getResponse.data.uid);
    console.log('📱 QR base64 (primeros 100 chars):', getResponse.data.qr_base64.substring(0, 100) + '...');
    console.log('');

    // 4. Probar error - uid faltante
    console.log('4️⃣ Probando manejo de errores (uid faltante)...');
    try {
      await axios.post(`${API_BASE_URL}/generate-qr`, {
        nombre: 'test'
      });
    } catch (error) {
      console.log('✅ Error manejado correctamente:', error.response.data);
    }
    console.log('');

    // 5. Probar documentación
    console.log('5️⃣ Probando endpoint de documentación...');
    const docsResponse = await axios.get(`${API_BASE_URL}/`);
    console.log('✅ Documentación:', docsResponse.data.name, 'v' + docsResponse.data.version);
    console.log('');

    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('🚀 La API está lista para usar con n8n, WhatsApp, etc.');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
  }
}

// Ejecutar las pruebas si el archivo se ejecuta directamente
if (require.main === module) {
  testQRAPI();
}

module.exports = { testQRAPI }; 