# Development Setup

> **Status**: 🚧 Coming Soon

This guide covers setting up your development environment for contributing to Ai-bilder.

## Development Environment

### Required Tools

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Git
- VS Code (recommended) or your preferred IDE

### Optional Tools

- Docker & Docker Compose (for containerized development)
- Postman or Insomnia (for API testing)
- pgAdmin or DBeaver (for database management)

## Setup Steps

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/Ai-bilder.git
cd Ai-bilder
git remote add upstream https://github.com/wonderingtribe/Ai-bilder.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Development Environment

```bash
cp .env.example .env
# Configure with development values
```

### 4. Set Up Database

Coming soon: Development database setup

### 5. Run Tests

```bash
npm test
```

## Development Workflow

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Commit with clear messages
5. Push and create a pull request

## Coding Standards

- Follow ESLint rules
- Use Prettier for formatting
- Write tests for new features
- Update documentation as needed

## Running Services Locally

Coming soon: Instructions for running all services locally

## Debugging

Coming soon: Debugging tips and tools

## Common Issues

Coming soon: Solutions to common development issues
