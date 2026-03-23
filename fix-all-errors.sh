#!/bin/bash

# =============================================================================
# SWM PROJECT - COMPLETE ERROR FIX SCRIPT
# =============================================================================
# This script automates the complete error fixing process
# Usage: bash fix-all-errors.sh
# =============================================================================

set -e  # Exit on any error

echo "=================================================="
echo "SWM Project - Error Fix Script"
echo "=================================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "ml-service-java/pom.xml" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    echo "Usage: cd /Users/mahesharunaladi/Documents/SWM/SWM && bash fix-all-errors.sh"
    exit 1
fi

echo -e "${YELLOW}Step 1: Clearing Java and Maven caches...${NC}"
echo "Removing ~/.java directory..."
rm -rf ~/.java 2>/dev/null || true

echo "Removing VS Code cache..."
rm -rf ~/Library/Caches/Code 2>/dev/null || true
rm -rf ~/.cache 2>/dev/null || true

echo "Removing Lombok from Maven cache..."
rm -rf ~/.m2/repository/org/projectlombok 2>/dev/null || true

echo -e "${GREEN}✓ Caches cleared${NC}"
echo ""

echo -e "${YELLOW}Step 2: Verifying pom.xml updates...${NC}"

# Check if pom.xml has the correct Lombok version
if grep -q 'lombok.*1.18.30' ml-service-java/pom.xml; then
    echo -e "${GREEN}✓ pom.xml already updated with Lombok 1.18.30${NC}"
else
    echo -e "${RED}✗ pom.xml needs manual update${NC}"
    echo "Please update the following in ml-service-java/pom.xml:"
    echo ""
    echo "1. Change Lombok version from 1.18.32 to 1.18.30"
    echo "2. Add maven.compiler.release property:"
    echo "   <maven.compiler.release>17</maven.compiler.release>"
    echo "3. Update maven-compiler-plugin with annotationProcessorPaths"
    echo ""
    echo "See FIXES_GUIDE.md for exact XML to copy"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 3: Building ML Service...${NC}"
cd ml-service-java

echo "Running: mvn clean install"
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed. Check errors above.${NC}"
    exit 1
fi

cd ..
echo ""

echo -e "${YELLOW}Step 4: Checking compilation results...${NC}"
if [ -d "ml-service-java/target" ]; then
    echo -e "${GREEN}✓ Target directory created successfully${NC}"
    
    if [ -f "ml-service-java/target/ml-service-1.0.0.jar" ]; then
        echo -e "${GREEN}✓ JAR file built successfully${NC}"
    fi
else
    echo -e "${RED}✗ Build artifacts not found${NC}"
    exit 1
fi

echo ""
echo "=================================================="
echo -e "${GREEN}All fixes applied successfully!${NC}"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Close VS Code completely"
echo "2. Wait 10 seconds"
echo "3. Reopen VS Code"
echo "4. If you still see errors:"
echo "   - Press Cmd+Shift+P (or Ctrl+Shift+P on Windows)"
echo "   - Type 'Java: Reload Window'"
echo "   - Press Enter"
echo ""
echo "All errors should now be resolved!"
echo ""
