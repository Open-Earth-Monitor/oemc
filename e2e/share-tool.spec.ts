import { test, expect } from '@playwright/test';

import type { Monitor } from 'types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/map', { waitUntil: 'load' });
  const monitorsResponse = await page.waitForResponse(
    `${process.env.NEXT_PUBLIC_API_URL}/monitors/`
  );
  const monitorsData = (await monitorsResponse.json()) as Monitor[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });
});

test.describe('user should be able to copy and share current url', () => {
  test('copy link to clipboard', async ({ page }) => {
    // Proceed with the test if sidebar is closed or explicitly set to false
    await expect(page.getByTestId('share-tool-trigger')).toBeVisible();
    await page.getByTestId('share-tool-trigger').click();

    await expect(page.getByTestId('copy-url-link')).toBeVisible();
    await expect(page.getByTestId('copy-message')).toBeVisible();
    await page.getByTestId('copy-url-link').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('copy-link-success')).toBeVisible();
    await page.waitForTimeout(3000);

    await expect(page.getByTestId('copy-link-success')).toBeHidden();
  });
  test('share in Twitter', async ({ page }) => {
    await expect(page.getByTestId('share-tool-trigger')).toBeVisible();
    await page.getByTestId('share-tool-trigger').click();
    const shareTwitterButton = page.getByTestId('share-twitter-button');
    await expect(shareTwitterButton).toBeVisible();
    await shareTwitterButton.click();
  });

  test('share in Linkedin', async ({ page }) => {
    await expect(page.getByTestId('share-tool-trigger')).toBeVisible();
    await page.getByTestId('share-tool-trigger').click();
    const shareLinkedinButton = page.getByTestId('share-linkedin-button');
    await expect(shareLinkedinButton).toBeVisible();
    await shareLinkedinButton.click();
  });
});
