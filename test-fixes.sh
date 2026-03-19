#!/bin/bash

# SWM Project - Testing and Validation Commands
# Run these commands to verify all fixes are working

echo "=== SWM Project Error Resolution - Test Suite ==="
echo ""

# Test 1: Verify Python packages
echo "Test 1: Verifying Python packages in venv..."
echo "Expected: flask, joblib, pandas, numpy, python-dotenv all installed"
echo ""

PYTHON_PATH="/Users/mahesharunaladi/Documents/SWM/SWM/ml-service/venv/bin/python"

if [ -f "$PYTHON_PATH" ]; then
    echo "✅ Python found at: $PYTHON_PATH"
    echo ""
    echo "Installed packages:"
    $PYTHON_PATH -m pip list | grep -E "flask|joblib|pandas|numpy|python-dotenv"
    echo ""
else
    echo "❌ Python not found at $PYTHON_PATH"
fi

# Test 2: Check if individual DTO files exist
echo "Test 2: Verifying DTO files structure..."
echo "Expected: All DTO classes in individual files"
echo ""

DTO_DIR="/Users/mahesharunaladi/Documents/SWM/SWM/ml-service-java/src/main/java/com/swm/ml/model"

if [ -d "$DTO_DIR" ]; then
    echo "DTO files found:"
    ls -1 "$DTO_DIR" | grep -v "^ApiDtos.java"
    echo ""
    
    # Check if ApiDtos.java is cleaned up
    if grep -q "class.*implements Serializable" "$DTO_DIR/ApiDtos.java" 2>/dev/null; then
        echo "❌ ApiDtos.java still contains class definitions"
    else
        echo "✅ ApiDtos.java properly cleaned (contains only deprecation notice)"
    fi
else
    echo "❌ DTO directory not found at $DTO_DIR"
fi

echo ""

# Test 3: Check exception structure
echo "Test 3: Verifying Exception files structure..."
echo "Expected: InvalidInputException in separate file"
echo ""

EXCEPTION_DIR="/Users/mahesharunaladi/Documents/SWM/SWM/ml-service-java/src/main/java/com/swm/ml/exception"

if [ -d "$EXCEPTION_DIR" ]; then
    echo "Exception files found:"
    ls -1 "$EXCEPTION_DIR" | grep -E "\.java$"
    echo ""
    
    # Check if InvalidInputException exists separately
    if [ -f "$EXCEPTION_DIR/InvalidInputException.java" ]; then
        echo "✅ InvalidInputException.java exists"
        if grep -q "^public class InvalidInputException" "$EXCEPTION_DIR/InvalidInputException.java"; then
            echo "✅ InvalidInputException is public"
        else
            echo "⚠️  InvalidInputException not marked as public"
        fi
    else
        echo "❌ InvalidInputException.java not found"
    fi
    
    # Check if CustomExceptions is cleaned up
    if grep -q "public class InvalidInputException" "$EXCEPTION_DIR/CustomExceptions.java" 2>/dev/null; then
        echo "❌ CustomExceptions.java still contains InvalidInputException"
    else
        echo "✅ CustomExceptions.java properly cleaned"
    fi
else
    echo "❌ Exception directory not found at $EXCEPTION_DIR"
fi

echo ""

# Test 4: Check VS Code settings
echo "Test 4: Verifying VS Code settings..."
echo "Expected: Python interpreter path and analysis paths configured"
echo ""

SETTINGS_FILE="/Users/mahesharunaladi/Documents/SWM/SWM/.vscode/settings.json"

if [ -f "$SETTINGS_FILE" ]; then
    if grep -q "python.defaultInterpreterPath" "$SETTINGS_FILE"; then
        echo "✅ Python interpreter path configured"
    else
        echo "❌ Python interpreter path NOT configured"
    fi
    
    if grep -q "python.analysis.extraPaths" "$SETTINGS_FILE"; then
        echo "✅ Python analysis paths configured"
    else
        echo "❌ Python analysis paths NOT configured"
    fi
else
    echo "❌ Settings file not found at $SETTINGS_FILE"
fi

echo ""

# Test 5: Verify Maven files
echo "Test 5: Checking pom.xml configuration..."
echo "Expected: commons-csv dependency declared correctly"
echo ""

POM_FILE="/Users/mahesharunaladi/Documents/SWM/SWM/ml-service-java/pom.xml"

if [ -f "$POM_FILE" ]; then
    if grep -q "commons-csv" "$POM_FILE"; then
        echo "✅ commons-csv dependency found in pom.xml"
        # Extract version
        VERSION=$(grep -A 2 "commons-csv" "$POM_FILE" | grep "<version>" | sed 's/.*<version>\(.*\)<\/version>.*/\1/' | head -1)
        if [ -n "$VERSION" ]; then
            echo "   Version: $VERSION"
        fi
    else
        echo "❌ commons-csv dependency NOT found in pom.xml"
    fi
else
    echo "❌ pom.xml not found at $POM_FILE"
fi

echo ""

# Test 6: Summary
echo "=== Test Summary ==="
echo ""
echo "After these tests pass, run:"
echo ""
echo "  1. Restart VS Code or run:"
echo "     Cmd+Shift+P → Python: Restart Language Server"
echo ""
echo "  2. Test Docker build:"
echo "     cd /Users/mahesharunaladi/Documents/SWM/SWM"
echo "     docker-compose build"
echo ""
echo "  3. Run tests:"
echo "     docker-compose run ml-service-java mvn test"
echo ""
echo "=== End of Test Suite ==="
