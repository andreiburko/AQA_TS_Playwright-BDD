import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/features/*.feature',
  steps: ['pages/fixtures.ts', 'tests/stepDefinitions/*.ts'],
});

export default defineConfig({
  testDir,
  reporter: 'html',
  fullyParallel: true,
  workers: undefined,
  forbidOnly: !!process.env.CI,
  retries: 3,
  outputDir: 'test-results',
  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'login',
      testMatch: /login.feature/,
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['login'],
      testIgnore: /login.feature/,
    }
  ],
});