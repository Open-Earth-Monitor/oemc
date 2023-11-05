import { test, expect } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?sort_by=title'
    );
    const datasetsData = (await response.json()) as (Monitor | Geostory)[];
    const searchInput = page.getByTestId('search-input');

    const searchPromise = page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?title=*&sort_by=title'
    );
    await searchInput.fill(datasetsData[0].title);
    const filteredResponse = await searchPromise;
    const inputValue = await searchInput.inputValue();
    const filteredJson = (await filteredResponse.json()) as (Monitor | Geostory)[];

    // compare filtered response with manually filtered response
    const manuallyFilteredResponse = datasetsData.filter((dataset) => dataset.title === inputValue);
    expect(filteredJson).toEqual(manuallyFilteredResponse);

    // check that the number of results is displayed accurately
    // const displayResultsSentence = page.getByTestId('result-number');
    await expect(page.getByTestId('datasets-result')).toBeVisible();
    if (filteredJson.length === 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText('1 result');
    } else if (filteredJson.length > 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText(
        `${filteredJson.length} results`
      );
    }

    // check that the no results disclaimer is displayed
    const noResultsDisclaimer = page.getByTestId('no-results-found');
    if (!filteredJson.length) {
      await expect(noResultsDisclaimer).toBeVisible();
    }
  });
});
