#!/bin/bash

# Viki-Store Setup Script
# Este script instala dependencias y prepara el proyecto para desarrollo

set -e

echo "=========================================="
echo "  Viki-Store - Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Instalar dependencias del backend
echo -e "${YELLOW}1. Installing backend dependencies...${NC}"
cd server
npm install
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

# 2. Instalar dependencias del frontend
echo -e "${YELLOW}2. Installing frontend dependencies...${NC}"
cd client
npm install
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

# 3. Verificar Docker Compose
echo -e "${YELLOW}3. Checking Docker availability...${NC}"
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✓ Docker Compose is available${NC}"
    echo ""
    echo -e "${YELLOW}4. Starting PostgreSQL with Docker Compose...${NC}"
    cd docker
    docker-compose up -d
    cd ..
    echo -e "${GREEN}✓ PostgreSQL running on localhost:5432${NC}"
    sleep 3
else
    echo -e "${YELLOW}⚠ Docker Compose not available${NC}"
    echo "  Please ensure PostgreSQL is running on localhost:5432"
fi
echo ""

echo -e "${GREEN}=========================================="
echo "  Setup Complete!"
echo "==========================================${NC}"
echo ""
echo -e "Next steps:"
echo -e "  ${YELLOW}Terminal 1 (Backend):${NC}"
echo -e "    cd server && npm run dev"
echo -e ""
echo -e "  ${YELLOW}Terminal 2 (Frontend):${NC}"
echo -e "    cd client && npm run dev"
echo ""
echo -e "URLs:"
echo -e "  Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "  Backend API: ${GREEN}http://localhost:3000${NC}"
echo ""
