import { test, expect } from '@playwright/test';

test('not found page', async ({ page }) => {
  await page.goto('/map/monitorId/geostories', { waitUntil: 'load' });
  await expect(page.getByTestId('404-error')).toHaveText('404');
});
