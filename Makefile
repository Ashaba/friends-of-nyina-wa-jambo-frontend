.PHONY: help clean dev build start lint format test e2e verify ci analyze

# Colors for terminal output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Friends of Nyina wa Jambo Frontend - Development Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(BLUE)Common Workflows:$(NC)"
	@echo "  make setup      - Install dependencies and run initial setup"
	@echo "  make ready      - Full verification (format, lint, type-check)"
	@echo "  make ship       - Production-ready verification + build"
	@echo ""

# Setup & Installation
setup: ## Install dependencies and initialize project
	npm ci
	npx playwright install --with-deps

# Development
dev: ## Start development server with Turbopack
	npm run dev

build: ## Build for production
	npm run build

start: ## Start production server
	npm run start

clean: ## Clean build artifacts, test results, and cache
	npm run clean

# Code Quality
lint: ## Run ESLint on all files
	npm run lint

lint-fix: ## Fix ESLint issues automatically
	npm run lint:fix

format: ## Format code with Prettier
	npm run format

format-check: ## Check code formatting without changes
	npm run format:check

type-check: ## Run TypeScript type checking
	npm run type-check

verify: ## Run all code quality checks (lint, format, types)
	npm run verify

# Testing
test: ## Run unit tests once
	npm run test

test-watch: ## Run unit tests in watch mode
	npm run test:watch

test-ui: ## Run unit tests with UI dashboard
	npm run test:ui

test-coverage: ## Run unit tests with coverage report
	npm run test:coverage

e2e: ## Run E2E tests
	npm run e2e

e2e-headed: ## Run E2E tests with visible browser
	npm run e2e:headed

e2e-debug: ## Debug E2E tests step by step
	npm run e2e:debug

# Composite Commands
ready: verify ## Alias for 'verify' - full quality checks
	@echo "$(GREEN)✓ All checks passed!$(NC)"

ship: ## Production-ready: verify → build → test → e2e
	@echo "$(YELLOW)Running comprehensive verification...$(NC)"
	npm run verify
	@echo "$(YELLOW)Building for production...$(NC)"
	npm run build
	@echo "$(YELLOW)Running unit tests...$(NC)"
	npm run test
	@echo "$(YELLOW)Running E2E tests...$(NC)"
	npm run e2e
	@echo "$(GREEN)✓ Project is ready for production!$(NC)"

ci: ## CI environment - full verification and build
	npm run ci

analyze: ## Analyze project with coverage and quality metrics
	npm run analyze

.DEFAULT_GOAL := help
