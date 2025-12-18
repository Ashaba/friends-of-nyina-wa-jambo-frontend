# Scripts & Development Guide

This document consolidates all development, testing, and CI/CD scripts with best practices for a professional project.

## Quick Start

```bash
# First-time setup
make setup

# Daily development
make dev

# Before committing
make ready

# Prepare for production
make ship
```

## Script Organization

### Core Development Scripts

| Script  | Command                 | Purpose                                       |
| ------- | ----------------------- | --------------------------------------------- |
| `dev`   | `next dev --turbopack`  | Start development server with Turbopack       |
| `build` | `next build`            | Build for production                          |
| `start` | `next start`            | Run production server (respects PORT env var) |
| `clean` | Removes build artifacts | Reset build state                             |

### Code Quality Scripts

| Script         | Command              | Purpose                                      |
| -------------- | -------------------- | -------------------------------------------- |
| `lint`         | `eslint .`           | Check code for quality issues                |
| `lint:fix`     | `eslint . --fix`     | Fix auto-fixable ESLint issues               |
| `format`       | `prettier --write .` | Format code with Prettier                    |
| `format:check` | `prettier --check .` | Check formatting without changes             |
| `type-check`   | `tsc --noEmit`       | Check TypeScript types                       |
| `verify`       | All above combined   | **Recommended**: Run all code quality checks |

### Testing Scripts

#### Unit & Component Tests

| Script          | Command                 | Purpose                                     |
| --------------- | ----------------------- | ------------------------------------------- |
| `test`          | `vitest run`            | Run all unit tests once                     |
| `test:watch`    | `vitest --watch`        | Run tests in watch mode (re-run on changes) |
| `test:ui`       | `vitest --ui`           | Interactive test dashboard                  |
| `test:coverage` | `vitest run --coverage` | Generate coverage report                    |

#### End-to-End Tests

| Script       | Command                    | Purpose                        |
| ------------ | -------------------------- | ------------------------------ |
| `e2e`        | `playwright test`          | Run E2E tests in headless mode |
| `e2e:headed` | `playwright test --headed` | Run with visible browser       |
| `e2e:debug`  | `playwright test --debug`  | Step-through debugging         |

### Composite Commands

| Script    | Purpose                                | When to Use             |
| --------- | -------------------------------------- | ----------------------- |
| `verify`  | Runs: lint + format-check + type-check | Before creating commits |
| `ci`      | Runs: verify + build + test + e2e      | Production-ready check  |
| `analyze` | Runs: verify + test:coverage           | Code quality analysis   |

## Workflow Examples

### Daily Development

```bash
# Morning setup
make setup
make dev

# During development - terminal 1 (dev server)
npm run dev

# During development - terminal 2 (tests)
npm run test:watch

# Or use interactive UI
npm run test:ui
```

### Before Committing

```bash
# One-liner for all checks
make ready

# Or manually
npm run verify
npm run test
npm run e2e
```

### Pre-Production

```bash
# Complete verification
make ship

# Or step-by-step
npm run verify    # Code quality
npm run build     # Build for production
npm run test      # Unit tests
npm run e2e       # E2E tests
```

## Makefile Targets

The `Makefile` provides convenient shortcuts for common tasks:

```bash
make help              # Show all available commands
make setup             # Install deps + Playwright
make dev               # Start dev server
make build             # Build for production
make clean             # Clean build artifacts
make verify            # All code quality checks
make ready             # Alias for verify
make test              # Run unit tests
make test:watch        # Watch mode
make test:coverage     # Generate coverage
make e2e               # Run E2E tests
make e2e:headed        # E2E with browser visible
make ship              # Full production check
```

## npm Scripts Rationale

### Removed Redundant Scripts

- **Removed**: `test:unit`, `test:ci`, `e2e:ci`, `check`
- **Reason**: These were duplicates or environment-specific variations
- **Solution**: Use `--reporter` flags or environment detection instead

### Standardized Approach

- **Unified**: Single `test` command that runs once (not watch)
- **Unified**: Single `e2e` command with optional `--reporter` flag
- **Added**: `pretest` hook ensures type-checking before tests
- **Added**: `prebuild` hook ensures verification before building

### Lifecycle Hooks (Implicit Automation)

- `npm run prebuild` → Automatically runs `npm run verify` before `npm run build`
- `npm run pretest` → Automatically runs `npm run type-check` before tests
- These prevent incomplete builds and catch type errors early

## Environment-Specific Configuration

### Local Development

```bash
npm run dev               # With Turbopack
npm run test:watch       # Continuous testing
npm run e2e:headed       # See browser
```

### GitHub Actions (CI)

- **PR Checks** (`pr-checks.yml`): Full verification + build + tests
- **Push to Main** (`test-and-build.yml`): Same pipeline (idempotent)
- Both use `npm run ci` for consistent behavior

## Configuration Files

### `.npmrc`

Ensures consistent npm behavior across all environments:

- Fails on peer dependency conflicts (`legacy-peer-deps=false`)
- Checks for security vulnerabilities (`audit-level=moderate`)
- Shows progress bar for visibility

### `vitest.config.ts`

Unit test configuration with:

- Happy DOM environment (lightweight browser simulation)
- Global test utilities (`describe`, `test`, `expect`)
- Coverage reporting (Istanbul provider)
- Source map support for debugging

### `playwright.config.ts`

E2E test configuration with:

- Chromium browser (production-standard)
- Base URL pointing to local dev server
- Headed mode for local debugging

## Best Practices

### ✅ Do

- Run `npm run verify` before committing
- Use `npm run test:watch` during development
- Run `make ship` before pushing to main
- Check `npm run test:coverage` regularly
- Use `make help` to discover available commands

### ❌ Don't

- Run raw `vitest` or `playwright` commands (use npm scripts)
- Skip verification before building
- Ignore ESLint warnings
- Commit with formatting issues
- Deploy without running tests

## Performance Tips

1. **Faster local testing**: Use `npm run test:watch` instead of running full suite
2. **Debug failing tests**: Use `npm run test:ui` for interactive exploration
3. **Visual debugging**: Use `npm run e2e:headed` to see browser automation
4. **Coverage insights**: Run `npm run test:coverage` to find gaps

## Troubleshooting

### Tests fail in CI but pass locally

- Update browsers: `npx playwright install --with-deps`
- Check Node version: `node --version` (should be 20.x)
- Clear cache: `npm run clean && npm ci`

### Build fails after changes

- Verify types: `npm run type-check`
- Check formatting: `npm run format:check`
- Lint: `npm run lint`

### E2E tests time out

- Server not starting: Set PORT environment variable or use default 3000
- Slow network: Increase timeout in `playwright.config.ts`
- Browser issues: `npx playwright install --with-deps`

## Continuous Integration

Both GitHub Actions workflows now use the same npm scripts:

1. `npm run verify` - Type checking, linting, formatting
2. `npm run build` - Production build
3. `npm run test` - Unit tests
4. `npm run e2e` - E2E tests (with GitHub reporter in CI)

This ensures **local and CI environments behave identically**.

## Contributing

When adding new scripts:

1. Prefix with category: `test:`, `lint:`, `e2e:`, etc.
2. Add to Makefile for discoverability
3. Document in this guide
4. Use npm lifecycle hooks for automation
5. Keep CI workflows in sync
