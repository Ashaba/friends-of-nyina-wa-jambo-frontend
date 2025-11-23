import { defineConfig, devices } from '@playwright/test'
})
  ],
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  projects: [
  },
    headless: true,
    baseURL: 'http://localhost:3000',
  use: {
  testDir: 'e2e',
export default defineConfig({


