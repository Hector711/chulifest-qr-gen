# Ejemplos de Uso - QR Generator API

## 🚀 Iniciar el servidor

```bash
pnpm start
# o
node index.js
```

## 📱 Ejemplos con cURL

### 1. Generar QR con POST (recomendado para n8n)

```bash
curl -X POST http://localhost:3000/generate-qr \
  -H "Content-Type: application/json" \
  -d '{"uid": "abc123"}'
```

**Respuesta:**
```json
{
  "uid": "abc123",
  "qr_base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 2. Generar QR con GET

```bash
curl "http://localhost:3000/generate-qr?uid=test456"
```

### 3. Health Check

```bash
curl http://localhost:3000/health
```

### 4. Documentación

```bash
curl http://localhost:3000/
```

## 🔧 Uso en n8n

### Configuración del nodo HTTP Request:

1. **Método:** POST
2. **URL:** `http://localhost:3000/generate-qr`
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body (JSON):**
   ```json
   {
     "uid": "{{ $json.uid }}"
   }
   ```

### Capturar la respuesta:

La respuesta incluye:
- `uid`: El identificador original
- `qr_base64`: Imagen QR en formato base64

### Usar en WhatsApp/Email:

El campo `qr_base64` se puede usar directamente como imagen en:
- WhatsApp Business API
- Nodos de email
- Mensajes de Telegram
- etc.

## 🐳 Variables de Entorno

```bash
PORT=3000  # Puerto del servidor (opcional, por defecto 3000)
```

## 🚀 Despliegue

### Railway
1. Conectar repositorio
2. La API se desplegará automáticamente
3. Usar la URL proporcionada por Railway

### Render
1. Crear nuevo Web Service
2. Conectar repositorio
3. Build Command: `pnpm install`
4. Start Command: `node index.js`

### Heroku
1. Conectar repositorio
2. Deploy automático con Procfile

## ✅ Validaciones

- ✅ Campo `uid` obligatorio
- ✅ Manejo de errores HTTP 400/500
- ✅ CORS habilitado
- ✅ Respuesta en formato JSON
- ✅ QR en base64 listo para usar 