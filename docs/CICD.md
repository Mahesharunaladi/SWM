# CI/CD Configuration Reference

This document provides guidelines for CI/CD pipeline configuration and deployment strategies.

## Pipeline Overview

### Continuous Integration (CI)
- **Trigger**: Pull requests to `main` and `develop` branches
- **Duration**: ~15-20 minutes
- **Steps**:
  1. Code linting
  2. Unit tests
  3. Integration tests
  4. Code coverage analysis
  5. Security scanning
  6. Docker image building

### Continuous Deployment (CD) - Staging
- **Trigger**: Merge to `develop` branch
- **Duration**: ~5 minutes
- **Strategy**: Direct deployment
- **Rollback**: Manual via git revert + re-merge

### Continuous Deployment (CD) - Production
- **Trigger**: Git tag (v*.*.*)
- **Approval**: Manual approval in GitHub
- **Duration**: ~10 minutes
- **Strategy**: Blue-green deployment
- **Rollback**: Automatic if health checks fail

## GitHub Actions Workflows

### CI Workflow (.github/workflows/ci.yml)

Runs on every pull request and push to develop:

```
┌─ Lint Code
├─ Backend Tests
├─ Frontend Tests
├─ ML Service Tests
├─ Security Scan
└─ Build Docker Images (if merged)
    └─ Integration Tests
        └─ Quality Report
```

**Key Features**:
- Parallel job execution for faster feedback
- Coverage reports uploaded to Codecov
- Security scanning with Trivy
- Docker layer caching for faster builds

### Staging Deployment (.github/workflows/cd-staging.yml)

Runs on every merge to develop:

```
Deploy to Staging
├─ AWS ECS Update
├─ Smoke Tests
├─ Slack Notification
└─ PR Comment with Status
```

### Production Deployment (.github/workflows/cd-production.yml)

Runs on git tags (v*.*.* format):

```
Manual Approval
    ↓
Deploy to Production
├─ Database Backup
├─ AWS ECS Update
├─ Health Checks
├─ Create Release
├─ Slack Notification
└─ Rollback (if health checks fail)
```

## Environment Secrets

Configure these secrets in your GitHub repository:

### AWS Credentials
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key

### Notifications
- `SLACK_WEBHOOK_URL`: Slack webhook for notifications

### Container Registry
- Uses `GITHUB_TOKEN` for GitHub Container Registry (GHCR)

## Local Development

### Initial Setup
```bash
./scripts/setup.sh
./scripts/deploy-local.sh
```

### Health Checks
```bash
./scripts/health-check.sh
```

### Backup Database
```bash
./scripts/backup.sh
```

## Docker Images

### Image Tagging Strategy

Images are tagged with:
- Branch name: `ghcr.io/username/swm/backend:develop`
- Git SHA: `ghcr.io/username/swm/backend:develop-abc123`
- Semantic versioning: `ghcr.io/username/swm/backend:v1.0.0`

### Multi-stage Builds

All services use multi-stage builds to minimize image sizes:
- **Backend**: ~200MB
- **Frontend**: ~50MB
- **ML Service**: ~500MB

## Kubernetes Deployment

### Namespace
- All resources deployed in `swm` namespace

### High Availability
- Backend: 3 replicas (min), scales to 10
- Frontend: 3 replicas (min), scales to 10
- ML Service: 2 replicas (min), scales to 8

### Storage
- PostgreSQL: 10Gi PVC
- Redis: 5Gi PVC

### Networking
- Ingress with Let's Encrypt SSL
- Pod Disruption Budgets for stability
- Health checks every 10 seconds

## Monitoring & Alerts

### Health Checks
- Backend: `/health` endpoint
- ML Service: `/health` endpoint
- Database: `pg_isready` check
- Redis: `redis-cli ping` check

### Logging
- All services log to stdout
- Aggregated in CloudWatch (AWS) or ELK stack

### Metrics
- CPU and Memory usage tracked
- HPA triggers at 70% CPU / 80% Memory

## Best Practices

### Code Quality
- Minimum 80% test coverage required
- ESLint and Flake8 for code style
- SonarQube for code quality analysis

### Security
- Trivy for vulnerability scanning
- No secrets in code (use GitHub Secrets)
- RBAC for Kubernetes
- Network policies for pod-to-pod communication

### Performance
- Docker layer caching in CI
- Multi-stage builds to minimize image size
- Gzip compression enabled in Nginx
- Redis for caching

### Reliability
- Health checks on every deployment
- Automated rollback on failure
- Database backups before production deployment
- Pod disruption budgets in Kubernetes

## Troubleshooting

### CI Pipeline Failures

**Tests fail locally but pass in CI**:
- Clear node_modules: `rm -rf node_modules && npm ci`
- Check environment variables in .env files

**Docker build fails**:
- Check Docker context and .dockerignore files
- Verify all dependencies in package.json/requirements.txt

### CD Pipeline Failures

**Deployment to ECS fails**:
- Check AWS credentials and permissions
- Verify ECS cluster and service names
- Check CloudWatch logs

**Health checks fail**:
- Verify service startup time (may need to increase delay)
- Check environment variables in ECS task definition
- Verify database migrations have run

### Local Environment Issues

**Services won't start**:
- Ensure Docker daemon is running
- Check available disk space
- Verify port availability (3000, 3001, 5000, 5432, 6379)

**Health check script fails**:
- Ensure services are running: `docker-compose ps`
- Check service logs: `docker-compose logs [service]`

## Contributing

When adding new features:
1. Create feature branch from `develop`
2. Add tests with >80% coverage
3. Update API documentation if needed
4. Push to trigger CI pipeline
5. Request code review
6. Merge to develop (automatically deploys to staging)
7. Create release tag to deploy to production
