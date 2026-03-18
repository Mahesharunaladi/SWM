#!/bin/bash

# Deploy script for local development
# Usage: ./scripts/deploy-local.sh

set -e

echo "🚀 Starting SWM Local Deployment..."

# Check if Docker is running
if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env <<EOF
NODE_ENV=development
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_NAME=swm_db
DB_USER=swm_user
DB_PASSWORD=swm_password
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redis_password
JWT_SECRET=dev_secret_key_12345
ML_SERVICE_URL=http://ml-service:5000
FLASK_ENV=development
EOF
    echo "✅ .env file created"
fi

# Create .env files in service directories
for dir in backend frontend ml-service; do
    if [ ! -f "$dir/.env" ]; then
        echo "📝 Creating $dir/.env file..."
        cp "$dir/.env.example" "$dir/.env" 2>/dev/null || echo "⚠️  No .env.example found for $dir"
    fi
done

# Build and start services
echo "🐳 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check service health
echo "🏥 Checking service health..."

services=("backend" "ml-service" "frontend")
for service in "${services[@]}"; do
    echo "Checking $service..."
    docker-compose logs "$service" || true
done

echo ""
echo "✅ SWM Local Deployment Complete!"
echo ""
echo "📍 Access the services at:"
echo "  - Backend API:    http://localhost:3000"
echo "  - Frontend:       http://localhost:3001"
echo "  - ML Service:     http://localhost:5000"
echo "  - PostgreSQL:     localhost:5432"
echo "  - Redis:          localhost:6379"
echo ""
echo "📚 View logs with: docker-compose logs -f [service]"
echo "🛑 Stop services with: docker-compose down"
