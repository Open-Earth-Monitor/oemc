import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Layer } from '@/types/layers';
import type { Monitor } from '@/types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/map', { waitUntil: 'load' });
});

test.describe('geostories tab', () => {
  test('from /map/{monitor_id}/datasets', async ({ page }) => {
    const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
    const monitorsData = (await monitorsResponse.json()) as Monitor[];
    await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
    const monitorsIds = monitorsData.map((data) => data.id);

    // click on the first monitor
    await page.getByTestId(`monitor-item-${monitorsIds[0]}`).click();

    // move to geostories tab
    const geostoriesTabLink = page.getByTestId('tab-geostories');
    await geostoriesTabLink.click();

    // check geostory tab is active and url updated
    await page.waitForURL(`**/map/${monitorsIds[0]}/geostories`, { waitUntil: 'load' });
    await expect(geostoriesTabLink).toHaveAttribute('href', `/map/${monitorsIds[0]}/geostories`);
    await expect(geostoriesTabLink).toHaveClass(/border-t-secondary-500/); // active tab

    // check geostories list is visible
    const geostoriesResponse = await page.waitForResponse(
      `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/geostories`
    );
    const geostoriesData = (await geostoriesResponse.json()) as Geostory[];
    await expect(page.getByTestId('geostories-list')).toBeVisible();

    // check first geostory is visible has title, and a link to the geostory page (geostory datasets)
    const firstGeostoryId = geostoriesData[0].id;

    const firstDataset = page.getByTestId(`geostory-item-${firstGeostoryId}`);
    await expect(firstDataset).toBeVisible();
    await expect(firstDataset.getByTestId(`geostory-title-${firstGeostoryId}`)).toBeVisible();
    await expect(firstDataset.getByTestId(`geostory-title-${firstGeostoryId}`)).toBeVisible();
    await expect(firstDataset.getByTestId(`geostory-title-${firstGeostoryId}`)).toHaveText(
      geostoriesData[0].title
    );

    const firstGeostoryLink = page.getByTestId(`geostory-link-${firstGeostoryId}`);
    await expect(firstGeostoryLink).toBeVisible();
    await expect(firstGeostoryLink).toHaveAttribute('href', `/map/geostories/${firstGeostoryId}`);
  });

  test('display monitor info in geostories tab', async ({ page }) => {
    const monitorsFetchResponse = page.waitForResponse('https://api.earthmonitor.org/monitors');
    const response = await monitorsFetchResponse;
    const json = (await response.json()) as Monitor[];
    const monitorsIds = json.map((data) => data.id);

    // go to geostories tab
    await page.getByTestId(`monitor-item-${monitorsIds[0]}`).click();

    const geostoriesTabLink = page.getByTestId('tab-geostories');
    await geostoriesTabLink.click();

    await page.waitForURL(`**/map/${monitorsIds[0]}/geostories`, { waitUntil: 'load' });
    await page.waitForResponse(
      `https://api.earthmonitor.org/monitors/${monitorsIds[0]}/geostories`
    );

    // check monitor info is visible
    const monitorCard = page.getByTestId('monitor-card');
    await expect(monitorCard).toBeVisible();
    await expect(monitorCard.getByTestId('monitor-tag')).toBeVisible();
    await expect(monitorCard.getByTestId('monitor-tag')).toHaveText('MONITOR');
    await expect(monitorCard.getByTestId('monitor-title')).toBeVisible();
    await expect(monitorCard.getByTestId('monitor-title')).toHaveText(json[0].title);
    // await expect(monitorCard.getByTestId('monitor-description')).toBeVisible();
  });

  test('display datasets from a geostory', async ({ page }) => {
    const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
    const monitorsData = (await monitorsResponse.json()) as Monitor[];
    const monitorsIds = monitorsData.map((data) => data.id);

    await page.goto(`/map/${monitorsIds[0]}/geostories`, { waitUntil: 'load' });

    const geostoriesFetchResponse = page.waitForResponse(
      `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/geostories`
    );
    const geostoriesResponse = await geostoriesFetchResponse;
    await expect(page.getByTestId('geostories-list')).toBeVisible();

    const geostoriesData = (await geostoriesResponse.json()) as Geostory[];
    const firstGeostoryId = geostoriesData[0].id;
    const firstDataset = page.getByTestId(`geostory-item-${firstGeostoryId}`);
    await expect(firstDataset).toBeVisible();
    await expect(firstDataset.getByTestId('geostory-tag')).toBeVisible();
    await expect(firstDataset.getByTestId('geostory-tag')).toHaveText('GEOSTORY');
    await expect(firstDataset.getByTestId(`geostory-title-${firstGeostoryId}`)).toBeVisible();
    await expect(firstDataset.getByTestId(`geostory-title-${firstGeostoryId}`)).toHaveText(
      geostoriesData[0].title
    );
    const firstGeostoryLink = page.getByTestId(`geostory-link-${firstGeostoryId}`);
    await expect(firstGeostoryLink).toBeVisible();
    await expect(firstGeostoryLink).toHaveAttribute('href', `/map/geostories/${firstGeostoryId}`);

    // click on a geostory
    await firstGeostoryLink.click();

    // check if datasets list of that geostory are visible
    await page.waitForURL(`**/map/geostories/${firstGeostoryId}`, { waitUntil: 'load' });

    const layersResponse = await page.waitForResponse(
      `https://api.earthmonitor.org/geostories/${geostoriesData[0].id}/layers`
    );
    const layersData = (await layersResponse.json()) as Layer[];
    const datasetsList = page.getByTestId('datasets-list').locator('li');
    const datasetsListCount = await datasetsList.count();
    expect(datasetsListCount).toBe(layersData.length);
  });
});

test('From a selected geostory, user should be able to go back to the monitor it belongs', async ({
  page,
}) => {
  const monitorsResponse = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const monitorsData = (await monitorsResponse.json()) as Monitor[];
  await page.getByTestId(`monitor-item-${monitorsData[0].id}`).click();
  const monitorsIds = monitorsData.map((data) => data.id);

  // click on the first monitor
  await page.getByTestId(`monitor-item-${monitorsIds[0]}`).click();

  // move to geostories tab
  const geostoriesTabLink = page.getByTestId('tab-geostories');
  await geostoriesTabLink.click();

  // check geostory tab is active and url updated
  await page.waitForURL(`**/map/${monitorsIds[0]}/geostories`, { waitUntil: 'load' });

  // check geostories list is visible
  const geostoriesResponse = await page.waitForResponse(
    `https://api.earthmonitor.org/monitors/${monitorsData[0].id}/geostories`
  );
  const geostoriesData = (await geostoriesResponse.json()) as Geostory[];
  await expect(page.getByTestId('geostories-list')).toBeVisible();

  // check first geostory is visible has title, and a link to the geostory page (geostory datasets)
  const firstGeostoryId = geostoriesData[0].id;

  const firstDataset = page.getByTestId(`geostory-item-${firstGeostoryId}`);
  await expect(firstDataset).toBeVisible();

  const firstGeostoryLink = page.getByTestId(`geostory-link-${firstGeostoryId}`);
  await expect(firstGeostoryLink).toBeVisible();
  await firstGeostoryLink.click();

  await page.waitForURL(`**/map/geostories/${firstGeostoryId}`, { waitUntil: 'load' });
  await expect(page.getByTestId('monitor-title-back-btn')).toBeVisible();
  await expect(page.getByTestId('back-to-monitor')).toBeVisible();
  const text = `Back to ${monitorsData[0].title}.`;
  await expect(page.getByTestId('back-to-monitor')).toHaveText(text);
  await page.getByTestId('monitor-title-back-btn').click();
  await page.waitForURL(`**/map/${monitorsIds[0]}/geostories`, { waitUntil: 'load' });
});
