#!/bin/bash

# Viki-Store - Install Dependencies
# Este script instala todas las dependencias del proyecto

set -e

echo "📦 Viki-Store - Installing Dependencies"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Backend dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd server
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""
cd ..

# 2. Frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd client
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""
cd ..

echo -e "${GREEN}======================================"
echo "✓ All dependencies installed!${NC}"
echo ""
