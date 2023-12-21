import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';
import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test('geostories and monitors display', async ({ page }) => {
  const datasetsResponse = await page.waitForResponse(
    'https://api.earthmonitor.org/monitors-and-geostories*'
  );

  const datasetsData = (await datasetsResponse.json()) as MonitorsAndGeostoriesPaginated;
  const dataLength = datasetsData['monitors and geostories'].length;

  const datasetCard = page.getByTestId('datasets-list').locator('li');

  const datasetCardCount = await datasetCard.count();
  expect(datasetCardCount).toBe(dataLength);

  const resultNumber = page.getByTestId('result-number');
  const result = dataLength.toString();
  await expect(resultNumber).toHaveText(result);
});

test.describe('monitors and geostories display', () => {
  test('monitors display', async ({ page }) => {
    const monitorsCheckbox = page.getByTestId('monitors-button-checkbox');
    await monitorsCheckbox.click();

    const monitorsResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?type=monitors*'
    );

    const monitorsData = (await monitorsResponse.json()) as MonitorsAndGeostoriesPaginated;
    const monitorsIds = monitorsData['monitors and geostories'].map((data) => data.id);
    const firstMonitor = monitorsData['monitors and geostories'][0] as Monitor;

    await expect(page.getByTestId(`card-${monitorsIds[0]}`)).toBeVisible();

    const cardType = page.getByTestId(`card-type-${monitorsIds[0]}`);
    await expect(cardType).toBeVisible();
    await expect(cardType).toHaveText('monitor');

    const cardTitle = page.getByTestId(`card-title-${monitorsIds[0]}`);
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText(firstMonitor.title);

    // const cardDescription = page.getByTestId(`card-description-${monitorsIds[0]}`);
    // await expect(cardDescription).toBeVisible();
    // await expect(cardDescription).toHaveText(firstMonitor.description);

    const cardButton = page.getByTestId(`card-button-${monitorsIds[0]}`);
    await expect(cardButton).toBeVisible();
    await cardButton.click();

    const monitorCard = page.getByTestId(`monitor-card-${monitorsIds[0]}`);
    await expect(monitorCard).toBeVisible();

    const monitorTitle = page.getByTestId('monitor-title');
    await expect(monitorTitle).toBeVisible();
    await expect(monitorTitle).toHaveText(firstMonitor.title);

    // const monitorDescription = page.getByTestId('monitor-description');
    // await expect(monitorDescription).toBeVisible();
    // await expect(monitorDescription).toHaveText(firstMonitor.description);

    const monitorButton = page.getByTestId('monitor-button');
    await expect(monitorButton).toBeVisible();
    await monitorButton.click();

    await page.waitForURL(`**/map/${monitorsIds[0]}/datasets*`, { waitUntil: 'load' });
  });

  test('geostories display', async ({ page }) => {
    const geostoriesCheckbox = page.getByTestId('geostories-button-checkbox');
    await geostoriesCheckbox.click();

    const geostoriesResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?type=geostories*'
    );

    const geostoriesData = (await geostoriesResponse.json()) as MonitorsAndGeostoriesPaginated;
    const geostoriesIds = geostoriesData['monitors and geostories'].map((data) => data.id);
    const firstGeostory = geostoriesData['monitors and geostories'][0] as Geostory;

    await expect(page.getByTestId(`card-${geostoriesIds[0]}`)).toBeVisible();

    const cardType = page.getByTestId(`card-type-${geostoriesIds[0]}`);
    await expect(cardType).toBeVisible();
    await expect(cardType).toHaveText('geostory');

    const cardTitle = page.getByTestId(`card-title-${geostoriesIds[0]}`);
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText(firstGeostory.title);

    // const cardDescription = page.getByTestId(`card-description-${geostoriesIds[0]}`);
    // await expect(cardDescription).toBeVisible();
    // await expect(cardDescription).toHaveText(firstGeostory.description);

    const cardLink = page.getByTestId(`card-link-${geostoriesIds[0]}`);
    await expect(cardLink).toHaveAttribute('href', `/map/geostories/${geostoriesIds[0]}`);
    await cardLink.click();

    await page.waitForURL(`**/map/geostories/${geostoriesIds[0]}`, { waitUntil: 'load' });
  });
});
