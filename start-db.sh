#!/bin/bash

# Viki-Store - Start Docker & Database
# Este script levanta PostgreSQL y Redis con Docker Compose

set -e

echo "🐳 Viki-Store - Starting Docker Services"
echo "========================================"
echo ""

cd docker

# Verificar si Docker está corriendo
echo "Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker."
    exit 1
fi

echo "📦 Starting PostgreSQL and Redis..."
docker-compose up -d

echo ""
echo "Waiting for services to be ready..."
sleep 5

# Verificar que los servicios estén corriendo
echo ""
echo "Checking container status..."
docker-compose ps

echo ""
echo "✅ Database services started!"
echo ""
echo "PostgreSQL: localhost:5432"
echo "Redis: localhost:6379"
echo "Database: viki_store"
echo "User: postgres"
echo "Password: postgres"
echo ""
