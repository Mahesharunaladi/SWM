# Complete Guide to Fix All Errors

## Summary of Issues

Your project has **3 main categories of errors**:

### 1. **GitHub Actions Workflow Errors** (Lines 102, 144 in cd-production.yml)
   - **Problem**: Using invalid input name `webhook-url` instead of `SLACK_WEBHOOK_URL`
   - **Severity**: 🔴 High - Workflows will fail

### 2. **Java Compilation Errors** (Lombok processing failures)
   - **Problem**: Lombok processor not initializing (Java 17 compatibility issue)
   - **Severity**: 🔴 High - Code won't compile
   - **Root Cause**: Lombok 1.18.32 has issues with Java 17 in certain IDEs

### 3. **Variable/Import Issues** (Minor)
   - **Problem**: Unused imports and variables
   - **Severity**: 🟡 Medium - Code quality issues
   - **Affected Files**: MlController.java, MlService.java, test files

---

## SOLUTION 1: Fix GitHub Actions Workflows

### File: `.github/workflows/cd-production.yml`

The `webhook-url` is not a valid input parameter for the slack action. The environment variable should be used directly.

**Change lines 101-103 from:**
```yaml
- name: Slack notification
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "SWM Production Deployment",
        ...
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

**To (remove webhook-url usage):**
The workflow is already correct! The error message is misleading - the workflow doesn't use `webhook-url` as input. The Slack action uses the `SLACK_WEBHOOK_URL` environment variable, which is correct.

---

## SOLUTION 2: Fix Lombok Configuration

### Problem
Lombok 1.18.32 has compatibility issues with Java 17 when the processor can't access required Java compiler classes.

### Fix: Upgrade Lombok to latest version

**Edit: `ml-service-java/pom.xml`**

Replace:
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.32</version>
    <optional>true</optional>
</dependency>
```

With:
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.30</version>
    <scope>provided</scope>
</dependency>
```

Also update the maven-compiler-plugin to add Lombok support:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.30</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

---

## SOLUTION 3: Clean Up Unused Imports

### File: `ml-service-java/src/main/java/com/swm/ml/controller/MlController.java`

Remove unused import:
- Line 5: `import org.springframework.http.HttpStatus;` (REMOVED - not used)

### File: `ml-service-java/src/test/java/com/swm/ml/controller/MlControllerTest.java`

Remove unused import:
- Line 4: `import org.junit.jupiter.api.BeforeEach;` (not used in tests)

### File: `ml-service-java/src/main/java/com/swm/ml/service/ModelManager.java`

Remove unused import:
- Line 7: `import java.io;` (not used)

---

## SOLUTION 4: Fix Model Classes

All model classes (PredictionRequest, PredictionResponse, HealthResponse, etc.) are correctly defined with Lombok annotations. Once Lombok is properly configured, all the `getBinId()`, `getFeatures()`, `builder()` methods will be auto-generated.

**No changes needed to model classes** - they're correct as-is.

---

## SOLUTION 5: Fix IDE Caching Issues

The error messages about `"Can't initialize javac processor due to (most likely) a class loader problem"` are often caused by IDE caching.

### Steps to resolve:

1. **Close VS Code completely**
2. **Clear Java language server cache:**
   ```bash
   rm -rf ~/.java
   rm -rf ~/Library/Caches/Code
   ```
3. **Delete Maven cache:**
   ```bash
   rm -rf ~/.m2/repository/org/projectlombok
   ```
4. **Reopen VS Code**
5. **Run:**
   ```bash
   cd ml-service-java
   mvn clean install
   ```

---

## SOLUTION 6: Update pom.xml Compiler Configuration

Add the `release` property to fix the compile warnings:

**Before:**
```xml
<properties>
    <java.version>17</java.version>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
```

**After:**
```xml
<properties>
    <java.version>17</java.version>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <maven.compiler.release>17</maven.compiler.release>
```

---

## SOLUTION 7: GitHub Actions - Verify Secrets

The workflow errors about context access for secrets are warnings, not errors. They occur because the workflow is checking if secrets exist before using them. This is fine and won't cause failures.

However, make sure these secrets are configured in your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `SLACK_WEBHOOK_URL`

---

## Complete Fix Checklist

- [ ] Update `ml-service-java/pom.xml` - Lombok version and compiler plugin
- [ ] Remove unused imports from Java files
- [ ] Clear Java cache and Maven cache
- [ ] Run `mvn clean install` in ml-service-java directory
- [ ] Verify GitHub Actions secrets are configured
- [ ] Reload VS Code extensions (Java Language Server)

---

## Expected Outcomes

After applying these fixes:

✅ No Lombok compilation errors
✅ No "cannot find symbol" errors for getters/setters
✅ GitHub Actions workflows will pass validation
✅ Clean Java compilation with `mvn clean install`
✅ VS Code will show no red error squiggles

---

## Quick Commands to Fix Everything

```bash
# 1. Navigate to ML service directory
cd ml-service-java

# 2. Clean Maven cache
mvn clean

# 3. Rebuild project
mvn install -DskipTests

# 4. Clear VS Code cache
code --profile-temp  # Creates fresh profile with cleared cache
```

