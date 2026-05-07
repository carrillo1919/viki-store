#!/bin/bash

# Viki-Store - Start Backend
# Este script inicia el servidor Node.js en modo desarrollo

set -e

echo "🔌 Viki-Store - Starting Backend Server"
echo "======================================"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "server/package.json" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

cd server

# Verificar que node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Install dependencies first: npm install"
    exit 1
fi

echo "Starting Node.js development server..."
echo "Server will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
