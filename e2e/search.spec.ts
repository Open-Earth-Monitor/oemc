import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories'
    );
    const datasetsData = (await response.json()) as (Monitor | Geostory)[];
    const datasetsTitles = datasetsData.map((data) => data.title);
    const searchInput = page.getByTestId('search-input');

    await searchInput.fill(datasetsTitles[0]);

    const inputValue = await searchInput.inputValue();
    const filteredResponse = await page.waitForResponse(
      `https://api.earthmonitor.org/monitors-and-geostories?title=${inputValue}`
    );
    const filteredJson = (await filteredResponse.json()) as (Monitor | Geostory)[];

    // compare filtered response with manually filtered response
    const manuallyFilteredResponse = datasetsData.filter((dataset) => dataset.title === inputValue);
    expect(filteredJson).toEqual(manuallyFilteredResponse);

    // check that the number of results is displayed accurately
    const displayResultsSentence = page.getByTestId('result-number');
    await expect(displayResultsSentence).toBeVisible();
    if (filteredJson.length === 1) {
      await expect(displayResultsSentence).toHaveText('1 results');
    } else if (filteredJson.length > 1) {
      await expect(displayResultsSentence).toHaveText(`${filteredJson.length} results`);
    }

    // check that the no results disclaimer is displayed
    const noResultsDisclaimer = page.getByTestId('no-results-found');
    if (!filteredJson.length) {
      await expect(noResultsDisclaimer).toBeVisible();
    }
  });
});
