# Guía de Desarrollo - Viki-Store

## Requisitos Previos

- Node.js 18+
- npm (incluido con Node.js)
- Docker y Docker Compose (opcional, pero recomendado para PostgreSQL)
- PostgreSQL 15+ (si no usas Docker)

## Instalación Rápida

### Opción 1: Script automático (Linux/Mac)

```bash
chmod +x setup.sh
./setup.sh
```

### Opción 2: Instalación manual

#### 1. Instalar dependencias del backend
```bash
cd server
npm install
cd ..
```

#### 2. Instalar dependencias del frontend
```bash
cd client
npm install
cd ..
```

#### 3. Levantar PostgreSQL

**Con Docker Compose:**
```bash
cd docker
docker-compose up -d
cd ..
```

**O instalar PostgreSQL localmente:**
- [PostgreSQL Downloads](https://www.postgresql.org/download/)
- Crear base de datos: `createdb viki_store`
- Usuario por defecto: `postgres` / contraseña: `postgres`

## Ejecutar el Proyecto

### Terminal 1: Backend (Puerto 3000)

```bash
cd server
npm run dev
```

Verás:
```
Server running on port 3000
Database synced
```

### Terminal 2: Frontend (Puerto 5173)

```bash
cd client
npm run dev
```

Verás:
```
VITE v4.4.4  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## URLs de Acceso

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **OpenAPI Docs:** http://localhost:3000/api (revisar openapi.yaml)

## Credenciales de Prueba

### Base de Datos
- Host: `localhost`
- Puerto: `5432`
- Usuario: `postgres`
- Contraseña: `postgres`
- Base de datos: `viki_store`

### Usuario de Prueba
Necesitas crear un usuario en la base de datos manualmente o ejecutar seeders.

Usuario por defecto:
- Username: `admin`
- Password: `admin123`

## Solución de Problemas

### Error: "Cannot find module"
```bash
cd server && npm install
cd ../client && npm install
```

### Error: "ECONNREFUSED 127.0.0.1:5432"
PostgreSQL no está corriendo:
```bash
# Con Docker:
cd docker && docker-compose up -d

# O inicia PostgreSQL localmente
```

### Puerto 3000 ya está en uso
Cambia el puerto en `server/.env`:
```
PORT=3001
```

### Puerto 5173 ya está en uso
Vite usará automáticamente el siguiente puerto disponible

## Variables de Entorno

Revisar `server/.env` para configuración:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=viki_store
DB_USER=postgres
DB_PASSWORD=postgres

# Server
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Testing

### Backend
```bash
cd server
npm test
```

### Linting
```bash
cd server
npm run lint

cd ../client
npm run lint
```

## Estructura del Proyecto

```
viki-store/
├── server/              # Backend Node.js + Express
│   ├── src/
│   │   ├── index.js     # Entry point
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Middleware (auth, audit, etc)
│   ├── .env             # Variables de entorno (NO en git)
│   └── package.json
│
├── client/              # Frontend Vue 3 + Vite
│   ├── src/
│   │   ├── main.js      # Entry point
│   │   ├── components/  # Vue components
│   │   ├── views/       # Page components
│   │   ├── router/      # Vue Router config
│   │   └── stores/      # Pinia stores
│   └── package.json
│
├── docker/              # Docker configuration
│   ├── Dockerfile       # Backend container
│   └── docker-compose.yml
│
├── shared/              # Shared assets
│   └── openapi.yaml     # API documentation
│
└── README.md
```

## Endpoints disponibles

### Autenticación
- `POST /api/auth/login` - Login usuario
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Movimientos
- `GET /api/movements` - Listar movimientos
- `POST /api/movements` - Crear movimiento

### Reportes
- `GET /api/reports/inventory/pdf` - Descargar reporte PDF
- `GET /api/reports/inventory/excel` - Descargar reporte Excel

### Agentes (API Key required)
- `POST /api/agent/check-stock` - Verificar stock
- `POST /api/agent/register-sale` - Registrar venta
- `POST /api/agent/add-lead` - Agregar lead

## Desarrollo

### Agregar una nueva ruta

1. Crear controller en `server/src/controllers/`
2. Crear servicio en `server/src/services/`
3. Crear validadores en `server/src/utils/validators.js`
4. Crear route file en `server/src/routes/`
5. Importar en `server/src/routes/index.js`

### Agregar una nueva vista

1. Crear componente en `client/src/views/`
2. Importar en `client/src/router/index.js`
3. Agregar ruta al router

## Producción

```bash
# Backend
cd server
npm run build

# Frontend
cd client
npm run build
```

## Recursos

- [Express.js Docs](https://expressjs.com/)
- [Vue 3 Docs](https://vuejs.org/)
- [Sequelize Docs](https://sequelize.org/)
- [Socket.io Docs](https://socket.io/docs/)

## Soporte

Para problemas, revisar:
- Logs: `server/logs/`
- OpenAPI spec: `shared/openapi.yaml`
- Tests: `server/tests/`
