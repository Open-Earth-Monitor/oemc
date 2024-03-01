import { test, expect } from '@playwright/test';

import type {
  MonitorsAndGeostories,
  MonitorsAndGeostoriesPaginated,
} from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('filter monitors and geostories by different theme', () => {
  test('Filter by theme Soil', async ({ page, request }) => {
    const response = await request.get('https://api.earthmonitor.org/monitors-and-geostories');
    const datasetsData = (await response.json()) as MonitorsAndGeostories;

    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Soil-checkbox').setChecked(true);

    const filteredResponse = await page.waitForResponse(
      `https://api.earthmonitor.org/monitors-and-geostories?*theme=Soil*`
    );
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;
    const manuallyFilteredResponse = datasetsData.filter((dataset) => dataset.theme === 'Soil');

    if (manuallyFilteredResponse.length > 6) {
      expect(filteredJson['monitors and geostories'].length).toBe(6);
    } else
      expect(filteredJson['monitors and geostories'].length).toBe(manuallyFilteredResponse.length);

    // check that the badge is displayed accurately
    await expect(page.getByTestId('Soil-button')).toBeVisible();
  });
});

test(`Filter by themes Agriculture and Climate & Health`, async ({ page, request }) => {
  const response = await request.get('https://api.earthmonitor.org/monitors-and-geostories');
  const datasetsData = (await response.json()) as MonitorsAndGeostories;

  await page.getByTestId('themes-filter').click();
  await page.getByTestId('Agriculture-checkbox').setChecked(true);
  await page.getByTestId('Climate & Health-checkbox').setChecked(true);

  const responsePromise = page.waitForResponse(
    `https://api.earthmonitor.org/monitors-and-geostories?*theme=Climate%20%26%20Health&theme=Agriculture*`
  );
  const filteredResponse = await responsePromise;
  const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

  // compare filtered response with manually filtered response
  const manuallyFilteredResponse = datasetsData.filter(
    (dataset) => dataset.theme === 'Agriculture' || dataset.theme === 'Climate & Health'
  );

  if (manuallyFilteredResponse.length >= 6) {
    expect(filteredJson['monitors and geostories'].length).toBe(6);
  } else
    expect(filteredJson['monitors and geostories'].length).toBe(manuallyFilteredResponse.length);

  // check that the badge is displayed accurately
  await expect(page.getByTestId('Agriculture-button')).toBeVisible();
  await expect(page.getByTestId('Climate & Health-button')).toBeVisible();
});

test(`Filter by themes Soil and Water`, async ({ page, request }) => {
  const response = await request.get('https://api.earthmonitor.org/monitors-and-geostories');
  const datasetsData = (await response.json()) as MonitorsAndGeostories;

  await page.getByTestId('themes-filter').click();
  await page.getByTestId('Soil-checkbox').setChecked(true);
  await page.getByTestId('Water-checkbox').setChecked(true);

  const responsePromise = page.waitForResponse(
    `https://api.earthmonitor.org/monitors-and-geostories?*theme=Water&theme=Soil*`
  );
  const filteredResponse = await responsePromise;
  const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

  // compare filtered response with manually filtered response
  const manuallyFilteredResponse = datasetsData.filter(
    (dataset) => dataset.theme === 'Soil' || dataset.theme === 'Water'
  );
  expect(filteredJson['monitors and geostories']).toEqual(manuallyFilteredResponse);

  // check that the badge is displayed accurately
  await expect(page.getByTestId('Soil-button')).toBeVisible();
  await expect(page.getByTestId('Water-button')).toBeVisible();
});

test.describe('Cards and badges displayed according selected themes', () => {
  test('According to themes Water and Soil', async ({ page }) => {
    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Soil-checkbox').setChecked(true);
    await page.getByTestId('Water-checkbox').setChecked(true);

    const responsePromise = page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?*theme=Water&theme=Soil*'
    );
    const filteredResponse = await responsePromise;
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    // check that the cards are displayed accurately
    const datasetsLists = page.getByTestId('datasets-list');
    const datasetsListsItems = await datasetsLists.locator('> li').count();

    expect(datasetsListsItems).toBe(filteredJson['monitors and geostories'].length);

    // check that the badges are displayed accurately
    await expect(page.getByTestId('Soil-button')).toBeVisible();
    await expect(page.getByTestId('Water-button')).toBeVisible();
  });
  test('According to themes Forest, Agriculture, and Biodiversity', async ({ page }) => {
    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Biodiversity-checkbox').setChecked(true);
    await page.getByTestId('Forest-checkbox').setChecked(true);
    await page.getByTestId('Agriculture-checkbox').setChecked(true);

    const responsePromise = page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?*theme=Agriculture&theme=Forest&theme=Biodiversity*'
    );
    const filteredResponse = await responsePromise;
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    // check that the cards are displayed accurately
    const datasetsLists = page.getByTestId('datasets-list');
    const datasetsListsItems = await datasetsLists.locator('> li').count();

    expect(datasetsListsItems).toBe(filteredJson['monitors and geostories'].length);

    // check that the badges are displayed accurately
    await expect(page.getByTestId('Biodiversity-button')).toBeVisible();
    await expect(page.getByTestId('Forest-button')).toBeVisible();
    await expect(page.getByTestId('Agriculture-button')).toBeVisible();
  });
});
