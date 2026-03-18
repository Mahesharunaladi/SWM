#!/bin/bash

# Health check script for SWM services
# Usage: ./scripts/health-check.sh

echo "🏥 Running SWM Health Checks..."
echo ""

# Check backend
echo "Checking Backend API..."
if curl -s http://localhost:3000/health | jq . > /dev/null 2>&1; then
    echo "✅ Backend API: OK"
else
    echo "❌ Backend API: Failed"
fi

# Check frontend
echo "Checking Frontend..."
if curl -s http://localhost:3001/ > /dev/null 2>&1; then
    echo "✅ Frontend: OK"
else
    echo "❌ Frontend: Failed"
fi

# Check ML Service
echo "Checking ML Service..."
if curl -s http://localhost:5000/health | jq . > /dev/null 2>&1; then
    echo "✅ ML Service: OK"
else
    echo "❌ ML Service: Failed"
fi

# Check PostgreSQL
echo "Checking PostgreSQL..."
if docker-compose exec -T postgres pg_isready -U swm_user > /dev/null 2>&1; then
    echo "✅ PostgreSQL: OK"
else
    echo "❌ PostgreSQL: Failed"
fi

# Check Redis
echo "Checking Redis..."
if docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis: OK"
else
    echo "❌ Redis: Failed"
fi

echo ""
echo "🏥 Health check complete!"
