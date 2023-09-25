import { test, expect } from '@playwright/test';

import type { LayerTypes, MonitorTypes } from 'types/datasets';

test.beforeEach(async ({ page }) => {
  await page.goto('/map', { waitUntil: 'load' });
});

test('datasets tab', async ({ page }) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as MonitorTypes[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });

  const datasetsTabLink = page.getByTestId('tab-datasets');
  await expect(datasetsTabLink).toHaveText('datasets');
  await expect(datasetsTabLink).toHaveAttribute('href', `/map/${monitorsData[0].id}/datasets`);
  await expect(datasetsTabLink).toHaveClass(/border-t-2/); // active tab
});

test('datasets list', async ({ page }) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as MonitorTypes[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });

  const layersResponse = await page.waitForResponse(
    `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/layers`,
    { timeout: 10000 }
  );
  const layersData = (await layersResponse.json()) as LayerTypes[];
  const datasetsList = page.getByTestId('datasets-list').locator('li');
  const datasetsListCount = await datasetsList.count();
  expect(datasetsListCount).toBe(layersData.length);
});

test('datasets item', async ({ page }) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as MonitorTypes[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });

  const layersResponse = await page.waitForResponse(
    `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/layers`,
    { timeout: 10000 }
  );
  const layersData = (await layersResponse.json()) as LayerTypes[];
  const firstDataset = page.getByTestId(`dataset-item-${layersData[0].layer_id}`);

  await expect(firstDataset).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-title')).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-title')).toHaveText(layersData[0].title);
  await expect(firstDataset.getByTestId('dataset-description')).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-description')).toHaveText(
    layersData[0].description
  );
});

// export const useLayers = (page: Page) => ({
//   clickLegend: async () => await page.getByTestId('remove-layer').click({ delay: 300 }),
//   clickSidebar: async () => await page.getByTestId('l1').click({ delay: 300 }),
//   clickLayerOpacity: async () => await page.getByTestId('toggle-visibility').click({ delay: 300 }),
// });

// test.describe('Toggling layers', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/map/m1/datasets');
//     await useLayers(page).clickSidebar();
//   });

//   test('layer added to url', async ({ page }) => {
//     await expect(page).toHaveURL(new RegExp(/\/layers={{id:l1,opacity:1}}\?.*/));
//   });

//   test('toggle layer visibility through opacity', async ({ page }) => {
//     await useLayers(page).clickLayerOpacity();
//     await expect(page).toHaveURL(new RegExp(/\/layers={{id:l1,opacity:0}}\?.*/));
//     await useLayers(page).clickLayerOpacity();
//     await expect(page).toHaveURL(new RegExp(/\/layers={{id:l1,opacity:1}}\?.*/));
//   });

//   test('remove layer from legend', async ({ page }) => {
//     await useLayers(page).clickLegend();
//     await expect(page).toHaveURL(new RegExp(/\/map$/));
//   });
// });
