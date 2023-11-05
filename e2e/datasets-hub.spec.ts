import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test.describe('monitors and geostories display', () => {
  test('monitors display', async ({ page }) => {
    const monitorsCheckbox = page.getByTestId('monitors-button-checkbox');
    await monitorsCheckbox.click();

    const monitorsResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?type=monitors&sort_by=title'
    );

    const monitorsData = (await monitorsResponse.json()) as Monitor[];
    const monitorsIds = monitorsData.map((data) => data.id);

    await expect(page.getByTestId(`card-${monitorsIds[0]}`)).toBeVisible();

    const cardType = page.getByTestId(`card-type-${monitorsIds[0]}`);
    await expect(cardType).toBeVisible();
    await expect(cardType).toHaveText('monitor');

    const cardTitle = page.getByTestId(`card-title-${monitorsIds[0]}`);
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText(monitorsData[0].title);

    // const cardDescription = page.getByTestId(`card-description-${monitorsIds[0]}`);
    // await expect(cardDescription).toBeVisible();
    // await expect(cardDescription).toHaveText(monitorsData[0].description);

    const cardButton = page.getByTestId(`card-button-${monitorsIds[0]}`);
    await expect(cardButton).toBeVisible();
    await cardButton.click();

    const monitorCard = page.getByTestId(`monitor-card-${monitorsIds[0]}`);
    await expect(monitorCard).toBeVisible();

    const monitorTitle = page.getByTestId('monitor-title');
    await expect(monitorTitle).toBeVisible();
    await expect(monitorTitle).toHaveText(monitorsData[0].title);

    // const monitorDescription = page.getByTestId('monitor-description');
    // await expect(monitorDescription).toBeVisible();
    // await expect(monitorDescription).toHaveText(monitorsData[0].description);

    const monitorButton = page.getByTestId('monitor-button');
    await expect(monitorButton).toBeVisible();
    await monitorButton.click();

    await page.waitForURL(`**/map/${monitorsIds[0]}/datasets`, { waitUntil: 'load' });
  });

  test('geostories display', async ({ page }) => {
    const geostoriesCheckbox = page.getByTestId('geostories-button-checkbox');
    await geostoriesCheckbox.click();

    const geostoriesResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?type=geostories&sort_by=title'
    );

    const geostoriesData = (await geostoriesResponse.json()) as Geostory[];
    const geostoriesIds = geostoriesData.map((data) => data.id);

    await expect(page.getByTestId(`card-${geostoriesIds[0]}`)).toBeVisible();

    const cardType = page.getByTestId(`card-type-${geostoriesIds[0]}`);
    await expect(cardType).toBeVisible();
    await expect(cardType).toHaveText('geostory');

    const cardTitle = page.getByTestId(`card-title-${geostoriesIds[0]}`);
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText(geostoriesData[0].title);

    // const cardDescription = page.getByTestId(`card-description-${geostoriesIds[0]}`);
    // await expect(cardDescription).toBeVisible();
    // await expect(cardDescription).toHaveText(monitorsData[0].description);

    const cardLink = page.getByTestId(`card-link-${geostoriesIds[0]}`);
    await expect(cardLink).toHaveAttribute('href', `/map/geostories/${geostoriesIds[0]}`);
    await cardLink.click();

    await page.waitForURL(`**/map/geostories/${geostoriesIds[0]}`, { waitUntil: 'load' });
  });

  test('geostories and monitors display', async ({ page }) => {
    const datasetsResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?sort_by=title'
    );

    const datasetsData = (await datasetsResponse.json()) as (Monitor | Geostory)[];

    const datasetCard = page.getByTestId('datasets-list').locator('li');

    const datasetCardCount = await datasetCard.count();
    expect(datasetCardCount).toBe(datasetsData.length);
  });

  test('geostories and monitors number of results display', async ({ page }) => {
    const geostoriesCheckbox = page.getByTestId('geostories-button-checkbox');
    await geostoriesCheckbox.click();

    const datasetsResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?type=geostories&sort_by=title'
    );

    const datasetsData = (await datasetsResponse.json()) as Geostory[];

    const resultNumber = page.getByTestId('result-number');
    const result = datasetsData.length.toString();
    await expect(resultNumber).toHaveText(result);
  });
});
