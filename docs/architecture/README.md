# Architecture Documentation

> **Status**: 🚧 Coming Soon

This section will contain detailed architecture documentation for Ai-bilder.

## Architecture Overview

Ai-bilder is designed as a modern SaaS platform with the following key components:

### High-Level Architecture

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Client    │──────▶│   API       │──────▶│   Flow      │
│   (Web/App) │       │   Gateway   │       │   Runtime   │
└─────────────┘       └─────────────┘       └─────────────┘
                              │                     │
                              ▼                     ▼
                      ┌─────────────┐       ┌─────────────┐
                      │   Database  │       │   AI        │
                      │  (Postgres) │       │   Providers │
                      └─────────────┘       └─────────────┘
```

## Core Components

### 1. API Gateway
- Request routing
- Authentication & authorization
- Rate limiting
- Request validation

### 2. Flow Runtime Engine
- Block execution
- Variable management
- Error handling
- Async processing

### 3. Model Adapters
- Provider abstraction
- Token tracking
- Retry logic
- BYOM support

### 4. Storage Layer
- PostgreSQL for persistence
- Redis for caching and queues
- Object storage for artifacts

## Build and Run

### Local Development

Using Make (recommended):
```bash
# Install dependencies and start services
make setup

# Run development server
make dev

# Run tests
make test

# Run linter
make lint
```

Using npm directly:
```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Docker

Build and run with Docker:
```bash
# Build Docker image
make docker-build

# Run container
make docker-run

# Or use docker-compose
make docker-up
```

Using Docker commands directly:
```bash
# Build image
docker build -t ai-bilder:local .

# Run container
docker run --rm -p 3000:3000 --env-file .env ai-bilder:local
```

### CI/CD Pipeline

The project uses Azure Pipelines for continuous integration:
- Triggers on push/PR to main branch
- Runs on Node.js 20
- Executes: install → lint → test → build → docker build
- Publishes test results and coverage reports

See `azure-pipelines.yml` for full configuration.

## Design Decisions

Coming soon: Key architectural decisions and trade-offs

## Scalability

Coming soon: Scaling strategies and performance considerations

## Security

Coming soon: Security architecture and best practices
