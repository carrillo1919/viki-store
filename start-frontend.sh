#!/bin/bash

# Viki-Store - Start Frontend
# Este script inicia el servidor de desarrollo de Vue 3 con Vite

set -e

echo "🎨 Viki-Store - Starting Frontend Server"
echo "======================================"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "client/package.json" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

cd client

# Verificar que node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Install dependencies first: npm install"
    exit 1
fi

echo "Starting Vue 3 development server..."
echo "Frontend will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
