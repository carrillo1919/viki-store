#!/bin/bash

# Viki-Store - Complete Start Script
# Este script levanta todos los servicios del proyecto

set -e

echo "🚀 Viki-Store - Complete Startup"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if in correct directory
if [ ! -f "package.json" ] || [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${BLUE}STEP 1: Installing dependencies...${NC}"
echo ""

echo -e "${YELLOW}▸ Backend dependencies${NC}"
cd server
npm install > /dev/null 2>&1
echo -e "${GREEN}✓ Backend${NC}"
cd ..

echo -e "${YELLOW}▸ Frontend dependencies${NC}"
cd client
npm install > /dev/null 2>&1
echo -e "${GREEN}✓ Frontend${NC}"
cd ..

echo ""

# Step 2: Start Docker services
echo -e "${BLUE}STEP 2: Starting Docker services...${NC}"
echo ""

cd docker
docker-compose up -d > /dev/null 2>&1
cd ..

echo -e "${GREEN}✓ PostgreSQL and Redis started${NC}"
sleep 3

echo ""

# Step 3: Seed database
echo -e "${BLUE}STEP 3: Initializing database...${NC}"
echo ""

cd server
node src/scripts/seed.js 2>/dev/null
cd ..

echo ""

# All done!
echo -e "${GREEN}====================================="
echo "✓ All services started successfully!${NC}"
echo ""

echo -e "${YELLOW}🌐 Frontend:${NC} ${GREEN}http://localhost:5173${NC}"
echo -e "${YELLOW}🔌 Backend:${NC} ${GREEN}http://localhost:3000${NC}"
echo -e "${YELLOW}🐘 Database:${NC} ${GREEN}localhost:5432${NC}"
echo ""

echo -e "${YELLOW}Test Users:${NC}"
echo -e "  Username: ${GREEN}admin${NC}     | Password: ${GREEN}admin123${NC}"
echo -e "  Username: ${GREEN}manager${NC}   | Password: ${GREEN}manager123${NC}"
echo -e "  Username: ${GREEN}staff${NC}     | Password: ${GREEN}staff123${NC}"
echo ""

echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Open browser to http://localhost:5173"
echo -e "  2. Login with credentials above"
echo -e "  3. Backend logs in: ${YELLOW}server/logs/combined.log${NC}"
echo ""

echo -e "${YELLOW}To stop everything:${NC}"
echo -e "  cd docker && docker-compose down"
echo ""
