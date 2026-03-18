# Contributing to Smart Waste Management System

Thank you for your interest in contributing to SWM! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Report issues professionally
- Respect intellectual property

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 16+
- Python 3.9+
- Git

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/SWM.git
cd SWM

# Run setup script
./scripts/setup.sh

# Start services
./scripts/deploy-local.sh
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow code style guidelines
- Add tests for new features
- Update documentation
- Commit often with clear messages

### 3. Run Tests Locally

```bash
# Run all tests
npm test --prefix backend
npm test --prefix frontend
pytest ml-service/tests

# Check code quality
npm run lint --prefix backend
npm run lint --prefix frontend
flake8 ml-service
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
# Create PR on GitHub
```

### 5. Code Review

- Address review comments
- Add commits (don't force push unless requested)
- Request re-review after changes

### 6. Merge

- Ensure all checks pass
- Squash commits if requested
- Delete feature branch

## Coding Standards

### JavaScript/TypeScript
- Use ESLint configuration
- Use Prettier for formatting
- Follow existing code style
- Use meaningful variable names

### Python
- Follow PEP 8 style guide
- Use type hints where applicable
- Write docstrings for functions
- Use Black for formatting

### General
- Write clear, concise code
- Add comments for complex logic
- Keep functions small and focused
- DRY principle (Don't Repeat Yourself)

## Testing

### Test Coverage Requirements
- **Minimum**: 80% code coverage
- **Target**: >90% code coverage
- All public APIs must have tests

### Test Types

**Unit Tests**
```bash
npm test --prefix backend
pytest ml-service/tests
```

**Integration Tests**
- Run automatically in CI
- Test service-to-service communication

**E2E Tests**
- Manual testing recommended
- Automated with Cypress/Selenium (future)

## Documentation

### Required Documentation
- README updates for new features
- API documentation in `docs/API.md`
- Code comments for complex logic
- Inline docstrings in code

### Example

```javascript
/**
 * Calculate waste collection efficiency
 * @param {number} totalWaste - Total waste collected in kg
 * @param {number} distance - Distance traveled in km
 * @returns {number} Efficiency metric
 */
function calculateEfficiency(totalWaste, distance) {
  return totalWaste / distance;
}
```

## Commit Guidelines

### Format
```
type(scope): subject

body

footer
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/modifications
- `chore`: Build, dependencies, etc.

### Examples
```
feat(bins): add waste level threshold alerts
fix(api): resolve race condition in collection updates
docs(api): update bin endpoints documentation
test(ml): add route optimization tests
```

## Pull Request Guidelines

### Title
- Clear and descriptive
- Include issue number if applicable
- Format: `[TYPE] Description`

### Description
```markdown
## Description
Brief description of changes

## Related Issues
Fixes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests passing
- [ ] Manual testing completed

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests are passing
- [ ] No breaking changes
```

## Issue Reporting

### Bug Reports
```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: macOS/Linux/Windows
- Browser: Chrome/Firefox/Safari
- Version: 1.0.0

## Logs
(paste relevant logs)
```

### Feature Requests
```markdown
## Description
Clear description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How it could be implemented

## Alternatives
Other approaches considered
```

## Performance Considerations

When contributing, consider:
- **Time Complexity**: Optimize algorithms
- **Space Complexity**: Minimize memory usage
- **Database Queries**: Avoid N+1 queries
- **API Response Time**: Keep <500ms for p95
- **Bundle Size**: Minimize frontend bundle size

## Security Guidelines

- Never commit secrets or API keys
- Use parameterized queries
- Validate all inputs
- Escape output properly
- Update dependencies regularly
- Report security issues privately

## Release Process

### Version Numbers
We follow Semantic Versioning: `MAJOR.MINOR.PATCH`

- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes

### Release Steps
1. Update version in `package.json`/`__init__.py`
2. Update CHANGELOG
3. Create git tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tag: `git push origin v1.0.0`
5. CI/CD automatically deploys to production

## Community

- **Discussions**: GitHub Discussions
- **Issues**: GitHub Issues
- **Email**: support@swm.com
- **Slack**: (coming soon)

## Recognition

Contributors are recognized in:
- CONTRIBUTORS.md
- GitHub contributors page
- Release notes

## Questions?

Don't hesitate to ask! You can:
- Open a discussion on GitHub
- Email the maintainers
- Check existing documentation

---

Happy contributing! 🎉
