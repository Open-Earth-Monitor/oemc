import { test, expect } from '@playwright/test';

test('geostories visibility', async ({ page }) => {
  await page.goto('/map');
  const geostoriesButton = page.getByTestId('geostories-button');

  await geostoriesButton.click();

  await expect(page.getByTestId('geostories-container')).toBeVisible();
});
