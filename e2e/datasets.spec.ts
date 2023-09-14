import { Page, test, expect } from '@playwright/test';

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

export const useLayers = (page: Page) => ({
  clickLegend: async () => await page.getByTestId('remove-layer').click({ delay: 300 }),
  clickSidebar: async () => await page.getByTestId('l1').click({ delay: 300 }),
  clickLayerOpacity: async () => await page.getByTestId('toggle-visibility').click({ delay: 300 }),
});

test.describe('Toggling layers', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map/datasets');
    await useLayers(page).clickSidebar();
  });

  test('layer added to url', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(/\/layers={{id:l1,opacity:1}}\?.*/));
  });

  test('toggle layer visibility through opacity', async ({ page }) => {
    await useLayers(page).clickLayerOpacity();
    await expect(page).toHaveURL(new RegExp(/\/layers={{id:l1,opacity:0}}\?.*/));
    await useLayers(page).clickLayerOpacity();
    await expect(page).toHaveURL(new RegExp(/\/layers={{id:l1,opacity:1}}\?.*/));
  });

  test('remove layer from legend', async ({ page }) => {
    await useLayers(page).clickLegend();
    await expect(page).toHaveURL(new RegExp(/\/map$/));
  });
});
