import { test, expect } from '@playwright/test';

test('checks title of the page ', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Open-Earth-Monitor Cyberinfrastructure');
});

test('gets level 1 Heading', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Discover and Empower with Monitoring Solutions.'
  );
});
