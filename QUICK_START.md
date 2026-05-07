# 🚀 Quick Start - Viki-Store

## Paso 1: Abrir 3 terminales

Necesitarás 3 terminales abiertas al mismo tiempo.

---

## 📦 Terminal 1: Instalar Dependencias

```bash
# Backend
cd server
npm install

# Frontend (en otra terminal después)
cd ../client
npm install
```

---

## 🐘 Terminal 2: Iniciar PostgreSQL

### Opción A: Con Docker Compose (Recomendado)

```bash
cd docker
docker-compose up -d
```

Espera a que diga:
```
✓ Network docker_default created
✓ Volume postgres_data created
```

Luego verifica que esté corriendo:
```bash
docker ps
```

Deberías ver dos containers: `postgres:15-alpine` y `redis:7-alpine`

### Opción B: PostgreSQL Local

Si ya tienes PostgreSQL instalado:

```bash
# En tu sistema, asegúrate que PostgreSQL esté corriendo
# y que exista la base de datos 'viki_store'
createdb viki_store
```

---

## 🔌 Terminal 3: Backend (Node.js)

```bash
cd server
npm run dev
```

Deberías ver:
```
Server running on port 3000
Database synced
```

### 🌱 Inicializar datos de prueba (en Terminal 3, después de que el servidor esté corriendo):

```bash
# En una nueva terminal o cuando el servidor esté estable:
cd server
npm run seed:init
```

Verás:
```
✅ Database seeded successfully!

Test users created:
  - Username: admin     | Password: admin123
  - Username: manager   | Password: manager123
  - Username: staff     | Password: staff123

Test products:
  - PROD-001: Laptop Dell XPS 13 (Stock: 50)
  - ... más productos
```

---

## 🎨 Terminal 4: Frontend (Vue 3)

Abre OTRA terminal y ejecuta:

```bash
cd client
npm run dev
```

Deberías ver:
```
VITE v4.4.4  ready in XXX ms
➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## ✅ Verificar que todo está funcionando

1. Abre tu navegador en: **http://localhost:5173**
2. Deberías ver la pantalla de login de Viki-Store
3. Usa las credenciales:
   - Username: `admin`
   - Password: `admin123`

---

## 📊 URLs importantes

| Componente | URL | Propósito |
|-----------|-----|-----------|
| Frontend | `http://localhost:5173` | Interfaz web |
| Backend API | `http://localhost:3000` | API REST |
| PostgreSQL | `localhost:5432` | Base de datos |
| Redis | `localhost:6379` | Cache/Rate limiting |

---

## 🐛 Solución de problemas rápida

### Error: "Port 3000 already in use"
```bash
# Cambia el puerto en server/.env
PORT=3001
```

### Error: "Cannot connect to database"
```bash
# Verifica que PostgreSQL esté corriendo
docker-compose ps  # si usas Docker

# O si está local:
psql -U postgres -d viki_store
```

### Error: "nodemon: command not found"
```bash
cd server
npm install
```

### Error: "Cannot find module 'express'"
```bash
cd server
npm install
npm run dev
```

---

## 📝 Endpoints para probar

Una vez que todo esté corriendo, prueba estos endpoints:

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Recibirás un token JWT que necesitarás para otros requests.

### 2. Listar Productos (reemplaza TOKEN con tu JWT)
```bash
curl http://localhost:3000/api/products \
  -H "Authorization: Bearer TOKEN"
```

### 3. Check Stock (requiere API Key)
```bash
curl -X POST http://localhost:3000/api/agent/check-stock \
  -H "Content-Type: application/json" \
  -H "x-api-key: agent_api_key_for_development" \
  -d '{"sku":"PROD-001"}'
```

---

## 🎯 Próximos pasos

- [ ] Verificar que el login funciona
- [ ] Ver el dashboard
- [ ] Crear nuevos productos
- [ ] Hacer movimientos de stock
- [ ] Generar reportes
- [ ] Probar endpoints de agentes

---

## 📚 Documentación completa

Ver `DESARROLLO.md` para:
- Estructura del proyecto
- Cómo agregar nuevas rutas
- Variables de entorno
- Build para producción
- Tests

---

## ⚡ Quick Debug

Si algo no funciona:

1. **Backend no inicia:**
   - Verifica PostgreSQL: `docker-compose ps`
   - Lee los logs: `tail -f server/logs/combined.log`

2. **Frontend no abre:**
   - Verifica puerto: `lsof -i :5173`
   - Reinstala: `cd client && rm -rf node_modules && npm install`

3. **Database error:**
   - Recrear: `docker-compose down && docker-compose up -d`

---

Enjoy! 🚀
