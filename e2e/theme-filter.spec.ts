import { test, expect } from '@playwright/test';

import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('filter monitors and geostories by different theme', () => {
  test('Filter by theme Soil', async ({ page, request }) => {
    const response = await request.get(
      `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?theme=Soil&pagination=true`
    );
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;

    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Soil-checkbox').setChecked(true);

    const filteredResponse = await page.waitForResponse(
      `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?*theme=Soil/*`
    );
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    expect(filteredJson['monitors and geostories']['results']).toEqual(
      datasetsData['monitors and geostories']
    );

    // check that the badge is displayed accurately
    await expect(page.getByTestId('Soil-button')).toBeVisible();
  });
});

test(`Filter by themes Agriculture and Climate & Health`, async ({ page, request }) => {
  const response = await request.get(
    `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?theme=Climate+%26+Health,Agriculture&pagination=true`
  );
  const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;

  await page.getByTestId('themes-filter').click();
  await page.getByTestId('Agriculture-checkbox').setChecked(true);
  await page.getByTestId('Climate & Health-checkbox').setChecked(true);

  const responsePromise = page.waitForResponse(
    `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?*theme=Climate+%26+Health,Agriculture*/`
  );
  const filteredResponse = await responsePromise;
  const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

  expect(filteredJson['monitors and geostories']).toEqual(datasetsData['monitors and geostories']);

  // check that the badge is displayed accurately
  await expect(page.getByTestId('Agriculture-button')).toBeVisible();
  await expect(page.getByTestId('Climate & Health-button')).toBeVisible();
});

test(`Filter by themes Soil and Water`, async ({ page, request }) => {
  const response = await request.get(
    `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?theme=Water,Soil&pagination=true`
  );
  const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;

  await page.getByTestId('themes-filter').click();
  await page.getByTestId('Soil-checkbox').setChecked(true);
  await page.getByTestId('Water-checkbox').setChecked(true);

  const responsePromise = page.waitForResponse(
    `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?*theme=Water,Soil*`
  );
  const filteredResponse = await responsePromise;
  const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

  expect(filteredJson['monitors and geostories']).toEqual(datasetsData['monitors and geostories']);

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
      `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?*theme=Water,Soil*/`
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
      `${process.env.NEXT_PUBLIC_API_URL}/monitors-and-geostories?*theme=Agriculture,Forest,Biodiversity*`
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
