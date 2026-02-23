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
	pnpm install --frozen-lockfile
	pnpx playwright install --with-deps

# Development
dev: ## Start development server with Turbopack
	pnpm run dev

build: ## Build for production
	pnpm run build

start: ## Start production server
	pnpm run start

clean: ## Clean build artifacts, test results, and cache
	pnpm run clean

# Code Quality
lint: ## Run ESLint on all files
	pnpm run lint

lint-fix: ## Fix ESLint issues automatically
	pnpm run lint:fix

format: ## Format code with Prettier
	pnpm run format

format-check: ## Check code formatting without changes
	pnpm run format:check

type-check: ## Run TypeScript type checking
	pnpm run type-check

verify: ## Run all code quality checks (lint, format, types)
	pnpm run verify

# Testing
test: ## Run unit tests once
	pnpm run test

test-watch: ## Run unit tests in watch mode
	pnpm run test:watch

test-ui: ## Run unit tests with UI dashboard
	pnpm run test:ui

test-coverage: ## Run unit tests with coverage report
	pnpm run test:coverage

e2e: ## Run E2E tests
	pnpm run e2e

e2e-headed: ## Run E2E tests with visible browser
	pnpm run e2e:headed

e2e-debug: ## Debug E2E tests step by step
	pnpm run e2e:debug

# Composite Commands
ready: verify ## Alias for 'verify' - full quality checks
	@echo "$(GREEN)✓ All checks passed!$(NC)"

ship: ## Production-ready: verify → build → test → e2e
	@echo "$(YELLOW)Running comprehensive verification...$(NC)"
	pnpm run verify
	@echo "$(YELLOW)Building for production...$(NC)"
	pnpm run build
	@echo "$(YELLOW)Running unit tests...$(NC)"
	pnpm run test
	@echo "$(YELLOW)Running E2E tests...$(NC)"
	pnpm run e2e
	@echo "$(GREEN)✓ Project is ready for production!$(NC)"

ci: ## CI environment - full verification and build
	pnpm run ci

analyze: ## Analyze project with coverage and quality metrics
	pnpm run analyze

.DEFAULT_GOAL := help
