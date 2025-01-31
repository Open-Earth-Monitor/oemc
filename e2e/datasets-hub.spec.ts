import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';
import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test('geostories and monitors display', async ({ page }) => {
  const datasetsResponse = await page.waitForResponse(
    `${process.env.NEXT_PUBLIC_API_URL}monitors-and-geostories*`
  );

  const datasetsData = (await datasetsResponse.json()) as MonitorsAndGeostoriesPaginated;

  const pageLength = datasetsData['monitors and geostories'].length;

  const datasetCard = page.getByTestId('datasets-list').locator('li');
  const maxResultShown = pageLength;
  const datasetCardCount = await datasetCard.count();

  expect(datasetCardCount).toBe(maxResultShown);

  const dataLength = datasetsData.total_items;
  const resultNumber = page.getByTestId('result-number');
  const result = dataLength.toString();
  await expect(resultNumber).toHaveText(result);
});

test.describe('monitors and geostories display', () => {
  test('monitors display', async ({ page }) => {
    const monitorsCheckbox = page.getByTestId('monitors-button-checkbox');
    await monitorsCheckbox.click();

    const monitorsResponse = await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors-and-geostories?type=monitors*`
    );

    const monitorsData = (await monitorsResponse.json()) as MonitorsAndGeostoriesPaginated;
    const firstMonitorWithData = monitorsData['monitors and geostories'].find(
      (monitor) => monitor.ready && monitor.description !== null
    ) as Monitor;

    await expect(page.getByTestId(`card-${firstMonitorWithData.id}`)).toBeVisible();

    const cardType = page
      .getByTestId(`card-type-${firstMonitorWithData.id}`)
      .locator('span')
      .first();
    await expect(cardType).toBeVisible();
    await expect(cardType).toHaveText('monitor');

    const cardTitle = page.getByTestId(`card-title-${firstMonitorWithData.id}`);
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText(firstMonitorWithData.title);

    const cardDescription = page.getByTestId(`card-description-${firstMonitorWithData.id}`);
    await expect(cardDescription).toBeVisible();
    await expect(cardDescription).toHaveText(firstMonitorWithData.description);

    const cardButton = page.getByTestId(`card-button-${firstMonitorWithData.id}`);
    await expect(cardButton).toBeVisible();
    await cardButton.click();

    const monitorCard = page.getByTestId(`monitor-card-${firstMonitorWithData.id}`);
    await expect(monitorCard).toBeVisible();

    const monitorTitle = page.getByTestId('monitor-title');
    await expect(monitorTitle).toBeVisible();
    await expect(monitorTitle).toHaveText(firstMonitorWithData.title);

    const monitorDescription = page.getByTestId('monitor-description');
    await expect(monitorDescription).toBeVisible();
    await expect(monitorDescription).toHaveText(firstMonitorWithData.description);

    const monitorButton = page.getByTestId('monitor-button');
    await expect(monitorButton).toBeVisible();
    await monitorButton.click();

    await page.waitForURL(`**/map/${firstMonitorWithData.id}/datasets*`, { waitUntil: 'load' });
  });

  test('geostories display', async ({ page }) => {
    const geostoriesCheckbox = page.getByTestId('geostories-button-checkbox');
    await geostoriesCheckbox.click();

    const geostoriesResponse = await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}monitors-and-geostories?type=geostories*`
    );

    const geostoriesData = (await geostoriesResponse.json()) as MonitorsAndGeostoriesPaginated;
    const firstGeostoryWithData = geostoriesData['monitors and geostories'].find(
      (geostory) => geostory.ready && geostory.description !== null
    ) as Geostory;

    await expect(page.getByTestId(`card-${firstGeostoryWithData.id}`)).toBeVisible();

    const cardType = page
      .getByTestId(`card-type-${firstGeostoryWithData.id}`)
      .locator('span')
      .first();
    await expect(cardType).toBeVisible();
    await expect(cardType).toHaveText('geostory');

    const cardTitle = page.getByTestId(`card-title-${firstGeostoryWithData.id}`);
    await expect(cardTitle).toBeVisible();
    await expect(cardTitle).toHaveText(firstGeostoryWithData.title);

    const cardLink = page.getByTestId(`card-link-${firstGeostoryWithData.id}`);
    await expect(cardLink).toHaveAttribute('href', `/map/geostories/${firstGeostoryWithData.id}`);
    await cardLink.click();

    await page.waitForURL(`**/map/geostories/${firstGeostoryWithData.id}`, { waitUntil: 'load' });
  });
});
