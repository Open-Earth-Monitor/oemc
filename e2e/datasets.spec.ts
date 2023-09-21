import { test, expect } from '@playwright/test';

test('datasets title and description', async ({ page }) => {
  await page.goto('/map');
  const datasetsButton = page.getByTestId('datasets-button');

  await datasetsButton.click();
  await expect(page.getByTestId('datasets-title')).toBeVisible();
  await expect(page.getByTestId('datasets-description')).toBeVisible();
});

test('datasets download', async ({ page }) => {
  await page.goto('/map');
  const datasetsButton = page.getByTestId('datasets-button');
  await page.waitForTimeout(8000);
  await datasetsButton.click();
  await expect(page.getByTestId('datasets-title')).toBeVisible();
  await expect(page.getByTestId('datasets-description')).toBeVisible();
});
