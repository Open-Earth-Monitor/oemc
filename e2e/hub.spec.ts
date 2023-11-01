import { test, expect } from '@playwright/test';

test('checks title of the page ', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Hub - Open Earth Monitor Cyberinfrastructure');
});

test('gets level 1 Heading', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Discover and empower with monitoring solutions.'
  );
});

test.describe('Interface and external links in landing', () => {
  test('about link', async ({ page }) => {
    await expect(page.getByRole('link')).toHaveAttribute('href', 'https://earthmonitor.org/');
  });
});
