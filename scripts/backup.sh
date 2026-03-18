#!/bin/bash

# Backup script for SWM
# Usage: ./scripts/backup.sh

set -e

BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/swm_backup_$TIMESTAMP.sql"

echo "📦 Starting SWM Database Backup..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup PostgreSQL database
echo "Backing up PostgreSQL database..."
docker-compose exec -T postgres pg_dump \
    -U swm_user \
    -d swm_db \
    > "$BACKUP_FILE"

echo "✅ Database backup created: $BACKUP_FILE"

# List recent backups
echo ""
echo "📋 Recent backups:"
ls -lh "$BACKUP_DIR" | tail -10

echo ""
echo "✅ Backup complete!"
