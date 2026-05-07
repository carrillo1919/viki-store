#!/bin/bash

# Viki-Store - Seed Database
# Este script inicializa la base de datos con datos de prueba

set -e

echo "🌱 Viki-Store - Seeding Database"
echo "===================================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "server/package.json" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

# Esperar a que PostgreSQL esté listo
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 3

# Cambiar a directorio del servidor
cd server

# Ejecutar el seed script
echo "📥 Seeding database with test data..."
node src/scripts/seed.js

echo ""
echo "✅ Database seeded successfully!"
echo ""
