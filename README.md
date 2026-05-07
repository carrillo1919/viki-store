# Viki-Store: Sistema de Gestión de Inventarios

Viki-Store es un Sistema de Gestión de Inventarios (IMS) profesional, modular y seguro diseñado para operaciones tanto humanas (vía web) como autónomas (vía agentes como OpenClaw/Telegram/WhatsApp).

## Quick Start 🚀

Para levantar el proyecto rápidamente, ver [QUICK_START.md](QUICK_START.md)

O ejecuta el script de verificación:
```bash
chmod +x health-check.sh
./health-check.sh
```

## Arquitectura

Este proyecto utiliza una estructura de monorepositorio con las siguientes carpetas:

- `/server`: Backend en Node.js + Express (JavaScript)
- `/client`: Frontend en Vue 3 + Tailwind CSS + Pinia
- `/shared`: Especificaciones OpenAPI y tipos comunes
- `/docker`: Configuraciones de Docker

## Stack Tecnológico

- **Backend**: Node.js, Express, JavaScript (ES6+), PostgreSQL, Sequelize, JWT, Socket.io
- **Frontend**: Vue 3 (Composition API), Tailwind CSS, Pinia
- **Base de Datos**: PostgreSQL con Row Level Security (RLS)
- **Seguridad**: JWT, API Keys, Helmet.js, CORS, Rate Limiting
- **Comunicación**: REST API + WebSockets
- **Logs**: Winston/Morgan con rotación de archivos
- **Tests**: Jest

## Instalación Rápida

### Opción 1: Script automático (Recomendado)
```bash
chmod +x setup.sh
./setup.sh
```

### Opción 2: Manual

#### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose  
- PostgreSQL (o usar Docker)

### Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/carrillo1919/viki-store.git
   cd viki-store
   ```

2. Configura las variables de entorno:
   ```bash
   cp server/.env.example server/.env
   # Edita server/.env con tus valores
   ```

### Configuración de Base de Datos

Después de ejecutar las migraciones, configura Row Level Security (RLS) en PostgreSQL:

```sql
-- Habilitar RLS en las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE movements ENABLE ROW LEVEL SECURITY;

-- Políticas de ejemplo (ajusta según tus necesidades)
CREATE POLICY user_own_data ON users FOR ALL USING (id = current_setting('app.user_id')::int);
CREATE POLICY admin_all ON users FOR ALL USING (current_setting('app.role') = 'ADMIN');
```

### Migraciones

```bash
cd server
npx sequelize-cli db:migrate
```

### Desarrollo Local

#### Backend
```bash
cd server
npm install
npm run dev
```

#### Frontend
```bash
cd client
npm install
npm run dev
```

#### Eliminar archivos TypeScript antiguos
Si todavía quedan archivos `.ts` en el repositorio, ejecuta:

```bash
chmod +x cleanup-ts.sh
./cleanup-ts.sh
```

## Uso con Agentes OpenClaw

El sistema está diseñado para ser operado por agentes autónomos como OpenClaw. El agente debe:

1. Leer la especificación OpenAPI en `/shared/openapi.yaml`
2. Usar los endpoints documentados para interactuar con el sistema
3. Autenticarse usando API Keys para operaciones de agente
4. Mapear comandos naturales a funciones específicas (check stock, register sale, etc.)

### Endpoints para Agentes

- `POST /api/agent/check-stock`: Verificar stock de productos
- `POST /api/agent/register-sale`: Registrar una venta
- `POST /api/agent/add-lead`: Agregar un lead

### Integración WhatsApp/Telegram

- **WhatsApp**: Endpoints para consultas públicas y encolado de pedidos
- **Telegram**: Autenticación vía bot para gestión administrativa

## Documentación API

La documentación completa de la API está disponible en `/shared/openapi.yaml`. Usa herramientas como Swagger UI para visualizarla.

### Guía para Agentes OpenClaw

Para que un agente OpenClaw pueda operar el sistema:

1. **Lectura de la Especificación**: El agente debe parsear el archivo `openapi.yaml` para entender los endpoints disponibles, parámetros requeridos y respuestas esperadas.

2. **Autenticación**: Para operaciones de agente, usar el header `x-api-key` con la clave definida en `AGENT_API_KEY`.

3. **Mapeo de Funciones**:
   - "Check stock for SKU ABC123" → Llamar a `/api/agent/check-stock` con `{"sku": "ABC123"}`
   - "Register sale of 5 units of SKU XYZ789" → Llamar a `/api/agent/register-sale` con `{"sku": "XYZ789", "quantity": 5}`
   - "Add lead John Doe, email john@example.com" → Llamar a `/api/agent/add-lead` con los datos del lead

4. **Manejo de Errores**: El agente debe manejar respuestas de error (400, 404, etc.) y proporcionar feedback apropiado.

5. **WebSockets**: Para alertas en tiempo real, el agente puede conectarse vía Socket.io para recibir notificaciones de stock bajo.

### Ejemplo de Interacción

```javascript
// Verificar stock
const response = await fetch('/api/agent/check-stock', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your_agent_api_key'
  },
  body: JSON.stringify({ sku: 'ABC123' })
});

const data = await response.json();
// data: { sku: 'ABC123', name: 'Product Name', stock: 50, available: true }
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.