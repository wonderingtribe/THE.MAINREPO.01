.PHONY: help setup install dev test lint format build clean docker-build docker-run docker-up docker-down migrate

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Install dependencies (uses npm ci if package-lock.json exists)
	@if [ -f package-lock.json ]; then \
		echo "Installing with npm ci..."; \
		npm ci; \
	else \
		echo "Installing with npm install..."; \
		npm install; \
	fi

install: ## Install dependencies (alias for setup)
	npm install

dev: ## Run development server
	npm run dev

test: ## Run tests
	npm test

test-watch: ## Run tests in watch mode
	npm run test:watch

test-coverage: ## Run tests with coverage
	npm run test:coverage

lint: ## Run linter
	npm run lint

lint-fix: ## Run linter and fix issues
	npm run lint:fix

format: ## Format code
	npm run format

build: ## Build the project
	@if grep -q '"build":' package.json; then \
		npm run build; \
	else \
		echo "No build script found, skipping..."; \
	fi

clean: ## Clean build artifacts and dependencies
	rm -rf node_modules dist build coverage .nyc_output
	rm -f package-lock.json

docker-up: ## Start Docker containers
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-logs: ## Show Docker logs
	docker-compose logs -f

docker-build: ## Build Docker image
	docker build -t ai-bilder:local .

docker-run: ## Run Docker container
	docker run --rm -p 3000:3000 --env-file .env ai-bilder:local

migrate: ## Run database migrations
	npm run migrate

.DEFAULT_GOAL := help
