import { test, expect } from '@playwright/test';

test.describe('"Alpha version" should be visible from every page ', () => {
  test('Alpha version in hub', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const alphaVersion = page.getByTestId('alpha-site');
    await expect(alphaVersion).toBeVisible();
    await expect(alphaVersion).toHaveText('Alpha version');
  });
  test('Alpha version in map', async ({ page }) => {
    await page.goto('/map', { waitUntil: 'load' });
    const alphaVersion = page.getByTestId('alpha-site');
    await expect(alphaVersion).toBeVisible();
    await expect(alphaVersion).toHaveText('Alpha version');
  });
});
