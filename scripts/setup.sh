#!/bin/bash

# SWM Service Setup Script
# This script sets up the local development environment

set -e

echo "⚙️  Setting up SWM Development Environment..."

# Check for required tools
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it and try again."
        exit 1
    fi
}

check_tool docker
check_tool docker-compose
check_tool git
check_tool node
check_tool python3

echo "✅ All required tools are installed"

# Set up backend
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
cd ..

# Set up frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
npm install
cd ..

# Set up ML service
echo ""
echo "📦 Setting up ML Service..."
cd ml-service
pip install -r requirements.txt
cd ..

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Run: ./scripts/deploy-local.sh"
echo "2. Access the application at http://localhost:3001"
