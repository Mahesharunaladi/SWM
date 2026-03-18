# SWM Project - Quick Start Guide

## Overview
This is a complete Smart Waste Management (SWM) system with:
- ✅ Full-stack application (Frontend + Backend + ML Service)
- ✅ Enterprise CI/CD pipeline (GitHub Actions)
- ✅ Docker containerization (multi-stage builds)
- ✅ Kubernetes ready (complete manifests)
- ✅ Database & caching (PostgreSQL, Redis)
- ✅ Comprehensive documentation
- ✅ Test coverage (Unit, Integration, E2E)
- ✅ Security best practices

## Project Structure

```
SWM/
├── backend/                 # Node.js Express API
│   ├── src/                 # Application code
│   ├── tests/               # Unit tests
│   ├── Dockerfile           # Multi-stage build
│   └── package.json         # Dependencies
│
├── frontend/                # React Dashboard
│   ├── src/                 # React components
│   ├── public/              # Static assets
│   ├── Dockerfile           # Nginx + React
│   └── package.json         # Dependencies
│
├── ml-service/              # Python Flask ML Service
│   ├── src/                 # Flask app
│   ├── models/              # Pre-trained models
│   ├── tests/               # Tests
│   ├── Dockerfile           # Multi-stage build
│   └── requirements.txt      # Python deps
│
├── .github/workflows/       # CI/CD Pipelines
│   ├── ci.yml               # Lint, Test, Build
│   ├── cd-staging.yml       # Deploy to Staging
│   └── cd-production.yml    # Deploy to Production
│
├── k8s/                     # Kubernetes manifests
│   ├── infrastructure.yaml  # Database, Cache
│   ├── backend.yaml         # Backend deployment
│   ├── frontend.yaml        # Frontend deployment
│   ├── ml-service.yaml      # ML service deployment
│   └── networking.yaml      # Ingress, DNS
│
├── scripts/                 # Utility scripts
│   ├── setup.sh             # Initial setup
│   ├── deploy-local.sh      # Local deployment
│   ├── health-check.sh      # Health checks
│   ├── backup.sh            # Database backup
│   └── init-db.sql          # Database schema
│
├── docs/                    # Documentation
│   ├── README.md            # Main documentation
│   ├── API.md               # API documentation
│   ├── CICD.md              # Pipeline documentation
│   ├── CONTRIBUTING.md      # Contributing guide
│   └── ARCHITECTURE.md      # Architecture overview
│
├── docker-compose.yml       # Local development
├── nginx.conf               # Reverse proxy config
├── .gitignore               # Git ignore rules
└── .env.example             # Environment template
```

## Quick Start

### 1. Prerequisites
```bash
# Check required tools
docker --version          # v20.10+
docker-compose --version  # v2.0+
node --version           # v16+
python3 --version        # v3.9+
git --version            # v2.30+
```

### 2. Clone & Setup
```bash
# Clone repository
git clone https://github.com/yourusername/SWM.git
cd SWM

# Create environment file
cp .env.example .env

# Make scripts executable
chmod +x scripts/*.sh
```

### 3. Local Development Setup
```bash
# Run setup script (installs dependencies)
./scripts/setup.sh

# This will:
# ✓ Install backend dependencies (npm)
# ✓ Install frontend dependencies (npm)
# ✓ Install ML service dependencies (pip)
```

### 4. Start Services
```bash
# Deploy locally with Docker Compose
./scripts/deploy-local.sh

# This will:
# ✓ Create .env files
# ✓ Build Docker images
# ✓ Start all services
# ✓ Initialize database
```

### 5. Verify Installation
```bash
# Check service health
./scripts/health-check.sh

# You should see:
# ✅ Backend API: OK
# ✅ Frontend: OK
# ✅ ML Service: OK
# ✅ PostgreSQL: OK
# ✅ Redis: OK
```

### 6. Access Applications

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3001 | Web Dashboard |
| Backend | http://localhost:3000 | REST API |
| ML Service | http://localhost:5000 | ML Predictions |
| PostgreSQL | localhost:5432 | Database |
| Redis | localhost:6379 | Cache |

## Development Workflow

### Making Changes

1. **Create Feature Branch**
```bash
git checkout -b feature/amazing-feature
```

2. **Make Changes & Test**
```bash
# Backend changes
cd backend && npm test
cd ..

# Frontend changes
cd frontend && npm test
cd ..

# ML changes
cd ml-service && pytest tests/
cd ..
```

3. **Commit Changes**
```bash
git add .
git commit -m "feat(component): add amazing feature"
git push origin feature/amazing-feature
```

4. **Create Pull Request**
- Go to GitHub and create a PR
- CI pipeline runs automatically
- Request code review

5. **Deploy**
- Merge to `develop` → Auto-deploys to staging
- Create tag `v1.0.0` → Auto-deploys to production

## Running Tests

```bash
# Run all tests
docker-compose exec backend npm test
docker-compose exec frontend npm test
docker-compose exec ml-service pytest

# With coverage
docker-compose exec backend npm run test:coverage
docker-compose exec ml-service pytest --cov

# Watch mode (development)
docker-compose exec backend npm test -- --watch
```

## Database Management

### View Logs
```bash
docker-compose logs -f [service]

# Examples:
docker-compose logs -f backend      # Backend logs
docker-compose logs -f postgres     # Database logs
docker-compose logs -f ml-service   # ML service logs
```

### Backup Database
```bash
./scripts/backup.sh
# Creates: backups/swm_backup_YYYYMMDD_HHMMSS.sql
```

### Restore Database
```bash
cat backups/swm_backup_YYYYMMDD_HHMMSS.sql | \
  docker-compose exec -T postgres psql -U swm_user -d swm_db
```

## Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove data
docker-compose down -v

# Remove all images
docker-compose down --rmi all
```

## Environment Variables

Edit `.env` file to configure:
- Database connection
- Redis settings
- JWT secrets
- ML service URL
- API keys

See `.env.example` for all available variables.

## API Examples

### Get All Bins
```bash
curl http://localhost:3000/api/v1/bins
```

### Create Bin
```bash
curl -X POST http://localhost:3000/api/v1/bins \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Main Street",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "capacity": 100
  }'
```

### ML Prediction
```bash
curl -X POST http://localhost:5000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{
    "features": [65, 22.5, 65, 0.8, 1.2]
  }'
```

## CI/CD Pipelines

### Continuous Integration
- Runs on: Pull requests, commits to `develop`
- Tests: Unit, Integration, Security scan
- Auto-builds Docker images

### Continuous Deployment - Staging
- Triggers: Merge to `develop`
- Auto-deploys: To staging environment
- Runs: Smoke tests

### Continuous Deployment - Production
- Triggers: Git tag `v*.*.*`
- Requires: Manual approval
- Deploys: To production with rollback

### View Pipeline Status
Visit `.github/workflows/` to see workflow files and status on GitHub Actions.

## Troubleshooting

### Services won't start
```bash
# Check if ports are available
lsof -i :3000    # Backend
lsof -i :3001    # Frontend
lsof -i :5000    # ML Service
lsof -i :5432    # PostgreSQL
lsof -i :6379    # Redis

# Free up ports or change port in .env
```

### Database connection failed
```bash
# Check database is running
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Recreate database
docker-compose down -v
docker-compose up postgres
```

### Tests fail locally
```bash
# Clear dependencies and reinstall
rm -rf node_modules backend/node_modules
npm ci
npm install --prefix backend

# Clear Python cache
rm -rf ml-service/__pycache__ ml-service/.pytest_cache
pip install --force-reinstall -r ml-service/requirements.txt
```

## Common Commands

```bash
# View all services
docker-compose ps

# View service logs
docker-compose logs -f [service]

# Restart service
docker-compose restart [service]

# Run command in container
docker-compose exec backend npm run lint

# Access database
docker-compose exec postgres psql -U swm_user -d swm_db

# Access Redis
docker-compose exec redis redis-cli
```

## Documentation

- **[API Documentation](./docs/API.md)** - All API endpoints
- **[CI/CD Documentation](./docs/CICD.md)** - Pipeline configuration
- **[Architecture](./docs/ARCHITECTURE.md)** - System design
- **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute
- **[Main README](./README.md)** - Project overview

## Support

- 📧 Email: support@swm.com
- 🐙 GitHub Issues: Create an issue
- 💬 Discussions: GitHub Discussions

## License

MIT License - See LICENSE file for details

---

**Happy coding! 🚀**

For detailed information, see the documentation in the `docs/` folder.
