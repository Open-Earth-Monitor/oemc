import { test, expect } from '@playwright/test';

import type { Layer } from '@/types/layers';
import type { Monitor } from '@/types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/map', { waitUntil: 'load' });
});

test('datasets tab', async ({ page }) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as Monitor[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });

  const datasetsTabLink = page.getByTestId('tab-datasets');
  await expect(datasetsTabLink).toHaveText('datasets');
  await expect(datasetsTabLink).toHaveAttribute('href', `/map/${monitorsData[0].id}/datasets`);
  await expect(datasetsTabLink).toHaveClass(/border-t-secondary-500/); // active tab
});

test('datasets list', async ({ page }) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as Monitor[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });

  const layersResponse = await page.waitForResponse(
    `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/layers`
  );
  const layersData = (await layersResponse.json()) as Layer[];
  const datasetsList = page.getByTestId('datasets-list').locator('li');
  const datasetsListCount = await datasetsList.count();
  expect(datasetsListCount).toBe(layersData.length);
});

test('datasets item', async ({ page }) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as Monitor[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  await page.waitForURL('**/map/**/datasets', { waitUntil: 'load' });

  const layersResponse = await page.waitForResponse(
    `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/layers`
  );
  const layersData = (await layersResponse.json()) as Layer[];
  const firstDataset = page.getByTestId(`dataset-item-${layersData[0].layer_id}`);

  await expect(firstDataset).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-title')).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-title')).toHaveText(layersData[0].title);
  await expect(firstDataset.getByTestId('dataset-description')).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-description')).toHaveText(
    layersData[0].description
  );

  // toolbar buttons: info popover
  await expect(firstDataset.getByTestId('dataset-info-button')).toBeVisible();
  await firstDataset.getByTestId('dataset-info-button').click();
  await expect(page.getByTestId('dataset-info-content')).toBeVisible();

  // toolbar buttons: download
  await expect(firstDataset.getByTestId('dataset-download-button')).toBeVisible();
  await expect(firstDataset.getByTestId('dataset-download-button')).toHaveAttribute(
    'href',
    layersData[0].download_url
  );

  // Toggle layer: adding layer_id to the url
  await expect(firstDataset.getByTestId('dataset-layer-toggle-button')).toBeVisible();
  await firstDataset.getByTestId('dataset-layer-toggle-button').click(); // off
  await expect(page).toHaveURL(new RegExp(`/map/${monitorsData[0].id}/datasets`, 'g'));
  await firstDataset.getByTestId('dataset-layer-toggle-button').click(); // on
  await expect(page).toHaveURL(new RegExp(layersData[0].layer_id));
});
