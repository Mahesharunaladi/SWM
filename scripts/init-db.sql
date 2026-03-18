#!/bin/bash

# Smart Waste Management System - Database Initialization Script
# This script initializes the PostgreSQL database

set -e

echo "🗄️  Initializing SWM Database..."

# Create required extensions
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS "postgis";
  CREATE EXTENSION IF NOT EXISTS "btree_gin";

  -- Create bins table
  CREATE TABLE IF NOT EXISTS bins (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    capacity INTEGER NOT NULL,
    current_level INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    last_emptied TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
  );

  -- Create collections table
  CREATE TABLE IF NOT EXISTS collections (
    id SERIAL PRIMARY KEY,
    bin_id INTEGER REFERENCES bins(id),
    vehicle_id VARCHAR(100),
    driver_name VARCHAR(255),
    collection_date TIMESTAMP,
    waste_amount_kg DECIMAL(10, 2),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Create users table
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Create alerts table
  CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    bin_id INTEGER REFERENCES bins(id),
    alert_type VARCHAR(100),
    message TEXT,
    severity VARCHAR(50),
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
  );

  -- Create indexes
  CREATE INDEX idx_bins_status ON bins(status);
  CREATE INDEX idx_bins_location ON bins(latitude, longitude);
  CREATE INDEX idx_collections_bin_id ON collections(bin_id);
  CREATE INDEX idx_collections_date ON collections(collection_date);
  CREATE INDEX idx_alerts_bin_id ON alerts(bin_id);
  CREATE INDEX idx_alerts_created ON alerts(created_at);
  CREATE INDEX idx_users_email ON users(email);

  GRANT CONNECT ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_USER";
  GRANT USAGE ON SCHEMA public TO "$POSTGRES_USER";
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "$POSTGRES_USER";
  GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "$POSTGRES_USER";

EOSQL

echo "✅ Database initialization completed successfully!"
