import { test, expect } from '@playwright/test';

test.beforeEach(() => {
  test.setTimeout(0);
});

test('not found page', async ({ page }) => {
  await page.goto('/map/monitorId/geostories', { waitUntil: 'domcontentloaded' });
  test.fail();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('404-error');
});
