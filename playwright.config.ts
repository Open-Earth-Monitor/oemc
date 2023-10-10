import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const PORT = process.env.PORT || 3000;

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/test-results',
  timeout: 60000,
  expect: {
    timeout: 60000,
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? 'yarn build && yarn start' : 'yarn dev',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300000,
  },
  /* Run tests in files in parallel */
  fullyParallel: !process.env.CI,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${PORT}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Configure the timeout for each test */
    navigationTimeout: 60000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    ...(process.env.CI
      ? []
      : [
          {
            name: 'Mozilla Firefox',
            use: { ...devices['Desktop Firefox'] },
          },
        ]),
  ],
});
