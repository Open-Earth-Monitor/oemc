import { test, expect } from '@playwright/test';

import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('filter monitors and geostories by multiple themes', () => {
  test(`Filter by theme Soil`, async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories*',
      { timeout: 10000 }
    );
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;

    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Soil-checkbox').setChecked(true);

    const responsePromise = page.waitForResponse(
      `https://api.earthmonitor.org/monitors-and-geostories?*theme=Soil*`
    );
    const filteredResponse = await responsePromise;
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    // compare filtered response with manually filtered response
    const manuallyFilteredResponse = datasetsData['monitors and geostories'].filter(
      (dataset) => dataset.theme === 'Soil'
    );
    expect(filteredJson['monitors and geostories']).toEqual(manuallyFilteredResponse);

    // check that the badge is displayed accurately
    await expect(page.getByTestId('Soil-button')).toBeVisible();
  });

  test(`Filter by theme Water`, async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories*',
      {
        timeout: 10000,
      }
    );
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;

    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Water-checkbox').setChecked(true);

    const responsePromise = page.waitForResponse(
      `https://api.earthmonitor.org/monitors-and-geostories?*theme=Water*`,
      { timeout: 10000 }
    );
    const filteredResponse = await responsePromise;
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    // compare filtered response with manually filtered response
    // const manuallyFilteredResponse = datasetsData['monitors and geostories']?.filter(
    //   (dataset) => dataset.theme === 'Soil'
    // );
    expect(filteredJson['monitors and geostories'].length).toBe(3);
    // check that the badge is displayed accurately
    await expect(page.getByTestId('Water-button')).toBeVisible();
  });

  test(`Filter by themes Soil and Water`, async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories*',
      { timeout: 10000 }
    );
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;

    await page.getByTestId('themes-filter').click();
    await page.getByTestId('Soil-checkbox').setChecked(true);
    await page.getByTestId('Water-checkbox').setChecked(true);

    const responsePromise = page.waitForResponse(
      `https://api.earthmonitor.org/monitors-and-geostories?*theme=Water&theme=Soil*`,
      { timeout: 10000 }
    );
    const filteredResponse = await responsePromise;
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    // compare filtered response with manually filtered response
    // const manuallyFilteredResponse = datasetsData['monitors and geostories'].filter(
    //   (dataset) => dataset.theme === 'Soil' || dataset.theme === 'Water'
    // );
    expect(filteredJson['monitors and geostories'].length).toBe(5);

    // check that the badges is displayed accurately
    await expect(page.getByTestId('Soil-button')).toBeVisible();
    await expect(page.getByTestId('Water-button')).toBeVisible();
  });
});
