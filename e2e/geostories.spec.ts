import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/map', { waitUntil: 'load' });
});

test.describe('geostories tab', () => {
  test('from /map/{monitor_id}/datasets', async ({ page }) => {
    const monitorsResponse = await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors/`
    );
    const monitorsData = (await monitorsResponse.json()) as Monitor[];
    const firstMonitorWithGeostories = monitorsData.find(
      (monitor) => monitor.geostories.length > 0
    );

    // click on the first monitor
    await page.getByTestId(`monitor-item-${firstMonitorWithGeostories.id}`).click();

    await page.waitForURL('**/map/**/datasets*', { waitUntil: 'load' });

    const datasetLists = page.getByTestId('datasets-list');
    await expect(datasetLists).toBeVisible();

    // move to geostories tab
    const geostoriesTabLink = page.getByTestId('tab-geostories');

    await geostoriesTabLink.click();

    // check geostory tab is active and url updated
    await page.waitForURL(`**/map/${firstMonitorWithGeostories.id}/geostories`, {
      waitUntil: 'load',
    });
    await expect(geostoriesTabLink).toHaveAttribute(
      'href',
      `/map/${firstMonitorWithGeostories.id}/geostories`
    );
    await expect(geostoriesTabLink).toHaveClass(/border-t-secondary-500/); // active tab

    // check geostories list is visible
    const geostoriesResponse = await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors/${firstMonitorWithGeostories.id}/geostories/`
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
    const monitorsFetchResponse = page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors/`
    );
    const response = await monitorsFetchResponse;
    const monitorsData = (await response.json()) as Monitor[];
    const firstMonitorWithGeostories = monitorsData.find(
      (monitor) => monitor.geostories.length > 0
    );

    // go to geostories tab
    await page.getByTestId(`monitor-item-${firstMonitorWithGeostories.id}`).click();

    await page.waitForURL('**/map/**/datasets*', { waitUntil: 'load' });

    const datasetLists = page.getByTestId('datasets-list');
    await expect(datasetLists).toBeVisible();

    const geostoriesTabLink = page.getByTestId('tab-geostories');

    await expect(geostoriesTabLink).toHaveAttribute(
      'href',
      `/map/${firstMonitorWithGeostories.id}/geostories`
    );
    await geostoriesTabLink.click();

    await page.waitForURL(`**/map/${firstMonitorWithGeostories.id}/geostories`, {
      waitUntil: 'load',
    });
    await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors/${firstMonitorWithGeostories.id}/geostories`
    );

    // check monitor info is visible
    const monitorCard = page.getByTestId('monitor-card');
    await expect(monitorCard).toBeVisible();
    await expect(monitorCard.getByTestId('monitor-tag')).toBeVisible();
    await expect(monitorCard.getByTestId('monitor-tag')).toHaveText('monitor');
    await expect(monitorCard.getByTestId('monitor-title')).toBeVisible();
    await expect(monitorCard.getByTestId('monitor-title')).toHaveText(
      firstMonitorWithGeostories.title
    );
    // await expect(monitorCard.getByTestId('monitor-description')).toBeVisible();
  });

  test('display datasets from a geostory', async ({ page }) => {
    const monitorsResponse = await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors/`
    );
    const monitorsData = (await monitorsResponse.json()) as Monitor[];
    const firstMonitorWithGeostories = monitorsData.find(
      (monitor) => monitor.geostories.length > 0
    );

    await page.goto(`/map/${firstMonitorWithGeostories.id}/geostories`, { waitUntil: 'load' });

    const geostoriesFetchResponse = page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors/${firstMonitorWithGeostories.id}/geostories/`
    );
    const geostoriesResponse = await geostoriesFetchResponse;
    await expect(page.getByTestId('geostories-list')).toBeVisible();

    const geostoriesData = (await geostoriesResponse.json()) as Geostory[];
    const firstGeostoryId = geostoriesData[0].id;
    const firstDataset = page.getByTestId(`geostory-item-${firstGeostoryId}`);
    await expect(firstDataset).toBeVisible();
    await expect(firstDataset.getByTestId('geostory-tag')).toBeVisible();
    await expect(firstDataset.getByTestId('geostory-tag')).toHaveText('geostory');
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
    await page.waitForURL(`**/map/geostories/${firstGeostoryId}`, {
      waitUntil: 'load',
    });

    // Wait for the dataset list to be rendered and visible
    await page.waitForSelector('[data-testid="datasets-list"] li', { state: 'visible' });

    // TO - DO : check if the datasets are the same as the ones in the geostory
    // const layersResponse = await page.waitForResponse(
    //     `${process.env.NEXT_PUBLIC_API_URL}`geostories/${geostoriesData[0].id}`
    // );

    // const layersData = (await layersResponse.json()) as Layer[];
    // const datasetsList = page.getByTestId('datasets-list').locator('li');
    // const datasetsListCount = await datasetsList.count();

    // expect(datasetsListCount).toBe(layersData.length);
  });
});

test('From a selected geostory, user should be able to go back to the monitor it belongs', async ({
  page,
}) => {
  const monitorsResponse = await page.waitForResponse(
    `${process.env.NEXT_PUBLIC_API_URL}monitors/`
  );
  const monitorsData = (await monitorsResponse.json()) as Monitor[];
  const firstMonitorWithGeostories = monitorsData.find((monitor) => monitor.geostories.length > 0);

  // click on the first monitor
  await page.getByTestId(`monitor-item-${firstMonitorWithGeostories.id}`).click();

  await page.waitForURL('**/map/**/datasets*', { waitUntil: 'load' });

  const datasetLists = page.getByTestId('datasets-list');
  await expect(datasetLists).toBeVisible();

  // move to geostories tab
  const geostoriesTabLink = page.getByTestId('tab-geostories');
  await geostoriesTabLink.click();

  // check geostory tab is active and url updated
  await page.waitForURL(`**/map/${firstMonitorWithGeostories.id}/geostories`, {
    waitUntil: 'load',
  });

  // check geostories list is visible
  const geostoriesResponse = await page.waitForResponse(
    `${process.env.NEXT_PUBLIC_API_URL}monitors/${firstMonitorWithGeostories.id}/geostories/`
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
  const text = `Back to ${firstMonitorWithGeostories.title}.`;
  await expect(page.getByTestId('back-to-monitor')).toHaveText(text);
  await page.getByTestId('monitor-title-back-btn').click();
  await page.waitForURL(`**/map/${firstMonitorWithGeostories.id}/geostories`, {
    waitUntil: 'load',
  });
});
