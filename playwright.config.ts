import path from 'path';

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env.test') });

const PORT = process.env.PORT || 3000;

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/test-results',
  // timeout: 120000,
  // expect: {
  //   timeout: 120000,
  // },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? 'NODE_ENV=test yarn build && next start' : 'yarn dev',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  /* Run tests in files in parallel */
  fullyParallel: !process.env.CI,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
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
      name: 'Chromium',
      // Desktop Chrome defaults to 1280x720, but the landing page only mounts its desktop
      // layout (categories filter, featured geostories panel) above
      // `(min-width: 1280px) and (min-height: 820px)`. Pin a taller viewport so the desktop
      // breakpoint is met; the device viewport is spread first, so this override wins.
      use: { ...devices['Desktop Chrome'], channel: 'chromium', viewport: { width: 1440, height: 900 } },
    },
    // ...(process.env.CI
    //   ? []
    //   : [
    //       {
    //         name: 'Mozilla Firefox',
    //         use: { ...devices['Desktop Firefox'] },
    //       },
    //     ]),
  ],
});
