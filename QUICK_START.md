# Quick Reference Card 🎯

## Commands You'll Use Daily

```bash
# 🚀 Development
npm run dev              # Start dev server
npm run test:watch      # Watch tests during dev

# ✅ Before Committing
npm run verify          # Type-check + lint + format
npm run test            # Run unit tests

# 📦 Before Pushing
npm run build           # Build for production
npm run e2e             # Run E2E tests
npm run ci              # Full pipeline (all above)

# 🔧 Utilities
npm run clean           # Clean all build artifacts
npm run test:coverage   # Generate coverage report
npm run analyze         # Deep analysis + coverage
```

## Using Makefile (Even Cleaner!)

```bash
make help               # Show all available commands
make dev                # Start dev server
make ready              # All code quality checks ⭐
make ship               # Full production verification ⭐
make test:watch         # Watch tests
make test:coverage      # Coverage report
```

## What Changed?

| Before                         | After           | Why                         |
| ------------------------------ | --------------- | --------------------------- |
| 24 scripts                     | 18 scripts      | Consolidated redundancy     |
| `test`, `test:unit`, `test:ci` | Just `test`     | One command, multiple modes |
| `check`                        | `verify`        | Better naming               |
| No `clean`                     | `npm run clean` | Helpful utility             |
| Manual builds                  | `prebuild` hook | Auto-verify before build    |
| Manual testing                 | `pretest` hook  | Auto-type-check before test |

## Common Workflows

### ✨ Morning: Start Development

```bash
npm run dev              # Terminal 1
npm run test:watch      # Terminal 2
```

### 📝 Before Committing

```bash
npm run verify           # Lint + format + types
npm run test             # Unit tests
git add .
git commit -m "feat: ..."
```

### 🚀 Before Pushing to Main

```bash
make ship                # Production-ready verification
# or
npm run ci               # Full pipeline
```

## Files to Read

| File                  | Purpose                                  |
| --------------------- | ---------------------------------------- |
| `SCRIPTS.md`          | 📖 Complete script reference (40+ pages) |
| `Makefile`            | 🎯 Human-friendly commands               |
| `.npmrc`              | ⚙️ npm configuration                     |
| `BEFORE_AND_AFTER.md` | 📊 Visual comparison                     |

## Key Benefits

✅ **Clearer Intent** - Script names are self-explanatory  
✅ **Fewer Mistakes** - Lifecycle hooks auto-verify  
✅ **Better DX** - Makefile + comprehensive docs  
✅ **Consistent** - Local dev = CI behavior  
✅ **Professional** - Enterprise best practices

## Pro Tips

```bash
# Combine scripts for efficiency
npm run verify && npm run test

# Watch tests while developing
npm run test:watch

# Debug E2E tests
npm run e2e:debug

# Check code coverage
npm run test:coverage

# See all Makefile targets
make help
```

## Need Help?

- For details: See `SCRIPTS.md`
- For workflow: See `BEFORE_AND_AFTER.md`
- For rationale: See `CONSOLIDATION_REVIEW.md`
- For quick command: `make help` or `npm run`

---

**TL;DR**: Use `make ready` before committing and `make ship` before pushing! 🚀
