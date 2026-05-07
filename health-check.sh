#!/bin/bash

# Viki-Store Health Check Script
# Verifica que todos los dependencias y configuración estén correctas

echo "🔍 Viki-Store - Health Check"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

ISSUES=0

# 1. Verificar Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    ISSUES=$((ISSUES+1))
fi

# 2. Verificar npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} version $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    ISSUES=$((ISSUES+1))
fi

# 3. Verificar Docker
echo -n "Checking Docker... "
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | tr -d ',')
    echo -e "${GREEN}✓${NC} version $DOCKER_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Docker not found (needed for PostgreSQL)"
fi

# 4. Verificar Docker Compose
echo -n "Checking Docker Compose... "
if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f3)
    echo -e "${GREEN}✓${NC} version $COMPOSE_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Docker Compose not found"
fi

# 5. Verificar archivo .env del servidor
echo -n "Checking server/.env... "
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✓${NC} Exists"
else
    echo -e "${RED}✗${NC} Missing (will be created)"
fi

# 6. Verificar servidor node_modules
echo -n "Checking server/node_modules... "
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Dependencies not installed (run: cd server && npm install)"
    ISSUES=$((ISSUES+1))
fi

# 7. Verificar cliente node_modules
echo -n "Checking client/node_modules... "
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Dependencies not installed (run: cd client && npm install)"
    ISSUES=$((ISSUES+1))
fi

# 8. Verificar directorio de logs
echo -n "Checking logs directory... "
if [ -d "server/logs" ]; then
    echo -e "${GREEN}✓${NC} Exists"
else
    echo -e "${YELLOW}⚠${NC} Creating..."
    mkdir -p server/logs
    echo -e "${GREEN}✓${NC} Created"
fi

echo ""
echo "=============================="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "You're ready to start! Run:"
    echo ""
    echo "  ${YELLOW}Terminal 1:${NC} cd docker && docker-compose up -d"
    echo "  ${YELLOW}Terminal 2:${NC} cd server && npm run dev"
    echo "  ${YELLOW}Terminal 3:${NC} cd client && npm run dev"
    echo ""
    echo "Then visit: ${GREEN}http://localhost:5173${NC}"
else
    echo -e "${RED}✗ $ISSUES issue(s) found${NC}"
    echo ""
    echo "Please fix the issues above and run this script again."
fi

echo ""
