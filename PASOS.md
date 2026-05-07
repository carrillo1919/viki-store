# 🚀 Instrucciones Paso a Paso - Levantar Viki-Store

## Opción 1: Automática (TODO DE UNA VEZ) ⚡

Si quieres hacer todo en un solo comando:

```bash
chmod +x start-all.sh
./start-all.sh
```

Este script:
- ✅ Instala todas las dependencias
- ✅ Levanta PostgreSQL y Redis con Docker
- ✅ Inicializa la base de datos con datos de prueba
- ✅ Te muestra las credenciales de login

Luego abre: **http://localhost:5173**

---

## Opción 2: Paso a Paso (RECOMENDADO) 📋

Si prefieres hacer cada paso manualmente y ver lo que pasa:

### Paso 1️⃣: Instalar Dependencias

```bash
chmod +x install-deps.sh
./install-deps.sh
```

O manualmente:
```bash
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Paso 2️⃣: Levantar Base de Datos

En una **PRIMERA TERMINAL**:

```bash
chmod +x start-db.sh
./start-db.sh
```

Deberías ver:
```
✅ Database services started!
PostgreSQL: localhost:5432
Redis: localhost:6379
```

### Paso 3️⃣: Inicializar Datos de Prueba

En una **SEGUNDA TERMINAL** (después de que PostgreSQL esté corriendo):

```bash
chmod +x seed-db.sh
./seed-db.sh
```

Deberías ver:
```
✅ Database seeded successfully!

Test users created:
  - Username: admin     | Password: admin123
  - Username: manager   | Password: manager123
  - Username: staff     | Password: staff123

Test products:
  - PROD-001: Laptop Dell XPS 13 (Stock: 50)
  - PROD-002: USB-C Cable (Stock: 200)
  - ...
```

### Paso 4️⃣: Levantar Backend

En una **TERCERA TERMINAL**:

```bash
chmod +x start-backend.sh
./start-backend.sh
```

Deberías ver:
```
🔌 Viki-Store - Starting Backend Server
Starting Node.js development server...
Server will be available at: http://localhost:3000

Server running on port 3000
Database synced
```

### Paso 5️⃣: Levantar Frontend

En una **CUARTA TERMINAL**:

```bash
chmod +x start-frontend.sh
./start-frontend.sh
```

Deberías ver:
```
🎨 Viki-Store - Starting Frontend Server
Starting Vue 3 development server...
Frontend will be available at: http://localhost:5173

VITE v4.4.4  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Paso 6️⃣: Abrir en Navegador

Abre tu navegador en:

```
http://localhost:5173
```

Deberías ver la pantalla de login.

### Paso 7️⃣: Login

Usa estas credenciales:

```
Username: admin
Password: admin123
```

¡Listo! Ya estás dentro del Dashboard 🎉

---

## 📊 Verificar que todo está corriendo

Puedes verificar los estados así:

### Ver Docker
```bash
docker-compose ps
```

Deberías ver:
```
NAME       COMMAND                  SERVICE   STATUS
postgres   "docker-entrypoint.s…"   db        Up 3 minutes
redis      "redis-server"           redis     Up 3 minutes
```

### Ver logs del backend
```bash
tail -f server/logs/combined.log
```

### Ver logs completos
```bash
cat server/logs/combined.log
```

---

## 🧪 Probar Endpoints

Una vez todo está corriendo:

### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "roleId": 1
  }
}
```

### 2. Listar Productos (reemplaza TOKEN)
```bash
TOKEN="tu_token_aqui"
curl http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Check Stock (requiere API Key)
```bash
curl -X POST http://localhost:3000/api/agent/check-stock \
  -H "Content-Type: application/json" \
  -H "x-api-key: agent_api_key_for_development" \
  -d '{"sku":"PROD-001"}'
```

---

## 🛑 Detener todo

Para detener todos los servicios:

```bash
# Detener Docker
cd docker
docker-compose down

# Ctrl+C en las otras terminales del backend y frontend
```

---

## ⚠️ Solución de Problemas

### Error: "Port 3000 already in use"
```bash
# Cambiar puerto en server/.env
PORT=3001
```

### Error: "Cannot connect to database"
```bash
# Verificar Docker está corriendo
docker ps

# O reiniciar:
cd docker && docker-compose down && docker-compose up -d
```

### Error: "nodemon: command not found"
```bash
cd server
npm install
npm run dev
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Base de datos sin datos
```bash
./seed-db.sh
```

---

## 📚 URLs importantes

| Componente | URL |
|-----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |

---

## ✅ Checklist Final

- [ ] Instaladas todas las dependencias
- [ ] PostgreSQL y Redis corriendo (`docker ps`)
- [ ] Base de datos inicializada con datos (`seed-db.sh`)
- [ ] Backend ejecutando (`npm run dev` en `server/`)
- [ ] Frontend ejecutando (`npm run dev` en `client/`)
- [ ] Navegador abierto en `http://localhost:5173`
- [ ] Login exitoso con `admin` / `admin123`
- [ ] Dashboard visible

¡Si todo ✅, estás listo! 🚀
