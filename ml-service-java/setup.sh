#!/bin/bash

# Quick Build and Run Guide for ML Service Java
# This script helps set up and run the Java Spring Boot ML Service

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}ML Service - Java Spring Boot${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or later."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d '"' -f 2 | cut -d '.' -f 1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java 17+ is required. You have Java $JAVA_VERSION"
    exit 1
fi
echo -e "${GREEN}✓ Java $JAVA_VERSION installed${NC}"

if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.8.7 or later."
    exit 1
fi

MVN_VERSION=$(mvn -version 2>&1 | grep "Apache Maven" | cut -d ' ' -f 3)
echo -e "${GREEN}✓ Maven $MVN_VERSION installed${NC}"

echo ""
echo -e "${YELLOW}Available options:${NC}"
echo "  1. Clean build (mvn clean install)"
echo "  2. Build & run locally (mvn spring-boot:run)"
echo "  3. Build Docker image"
echo "  4. Run tests only"
echo "  5. Show configuration"
echo ""

read -p "Select option (1-5): " option

case $option in
    1)
        echo ""
        echo -e "${BLUE}Running clean build...${NC}"
        mvn clean install
        echo -e "${GREEN}✓ Build successful!${NC}"
        echo ""
        echo "JAR file created at: target/ml-service-1.0.0.jar"
        echo "Run with: java -jar target/ml-service-1.0.0.jar"
        ;;
    2)
        echo ""
        echo -e "${BLUE}Building and running locally...${NC}"
        echo "Service will start on http://localhost:5000"
        echo "Press Ctrl+C to stop"
        echo ""
        mvn spring-boot:run
        ;;
    3)
        echo ""
        echo -e "${BLUE}Building Docker image...${NC}"
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker is not installed."
            exit 1
        fi
        docker build -t swm-ml-service:latest .
        echo -e "${GREEN}✓ Docker image built!${NC}"
        echo ""
        echo "Run with:"
        echo "  docker run -p 5000:5000 swm-ml-service:latest"
        ;;
    4)
        echo ""
        echo -e "${BLUE}Running tests...${NC}"
        mvn test
        echo -e "${GREEN}✓ Tests completed!${NC}"
        ;;
    5)
        echo ""
        echo -e "${YELLOW}Configuration (application.yml):${NC}"
        echo ""
        cat src/main/resources/application.yml
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
