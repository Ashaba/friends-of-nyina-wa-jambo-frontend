This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code Quality

This project uses TypeScript, ESLint, and Prettier to maintain code quality and consistency.

### Linting and Formatting

Run these commands to check and fix code:

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting without making changes
npm run format:check

# Run TypeScript type checking
npm run type-check

# Run all checks (type-check + lint + format)
npm run check

# Run all checks and build (for CI)
npm run ci
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

This project includes a minimal test setup (Vitest for unit/DOM tests and Playwright for end-to-end tests). The repository contains example tests under `src` and `e2e/`.

1) Install test dependencies

```bash
# Core unit test libs
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event wait-on

# Playwright for E2E
npm install -D @playwright/test
# Install Playwright browsers (required once on each machine / CI)
npx playwright install --with-deps
```

2) Unit tests (Vitest)

```bash
# Run tests once (CI-style)
npm run test:ci

# Run Vitest in interactive/watch mode
npm run test:unit
npm run test:watch
npm run test:ui
```

- Unit tests live under `src/**/*.test.{ts,tsx}` (example: `src/app/page.test.tsx`). The Vitest config is in `vitest.config.ts`.

3) E2E tests (Playwright)

```bash
# Start the app (dev server or production-like)
npm run dev
# In another terminal run:
npm run e2e

# Or run playwright tests directly (after building & starting server):
# Build + start (production-like):
npm run build
npm run start
# then
npm run e2e
```

- E2E tests live under `e2e/` (example: `e2e/home.spec.ts`). Playwright config is in `playwright.config.ts` and it uses `http://localhost:3000` as the base URL.

4) CI behavior

The project's GitHub Actions workflows have been updated to:
- install dependencies,
- run type-check, lint, and format checks,
- build the app,
- start the server in the background and wait for port 3000,
- install Playwright browsers,
- run unit tests (Vitest) and E2E tests (Playwright).

If you prefer running only unit tests on PRs and E2E on main pushes, I can update the workflows accordingly.

5) Troubleshooting

- If Playwright cannot connect to the app, ensure the server is running on port 3000 (the workflows and Playwright config expect that port).
- If tests fail due to missing types, point your editor to `tsconfig.test.json` (included) so test globals like `vi` and `expect` are recognized.

If you'd like, I can run the `npm install` and execute the tests in this environment to confirm everything passes — tell me to proceed.
