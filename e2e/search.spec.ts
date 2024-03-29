import { test, expect } from '@playwright/test';

import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories*'
    );
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;
    const searchInput = page.getByTestId('search-input');

    const searchPromise = page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?*title=*'
    );
    await searchInput.fill(datasetsData['monitors and geostories'][0].title);
    const filteredResponse = await searchPromise;
    const inputValue = await searchInput.inputValue();
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    expect(filteredJson['monitors and geostories'][0].title).toEqual(inputValue);

    // check that the number of results is displayed accurately
    await expect(page.getByTestId('datasets-result')).toBeVisible();
    if (filteredJson['monitors and geostories'].length === 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText('1 result');
    } else if (filteredJson['monitors and geostories'].length > 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText(
        `${filteredJson['monitors and geostories'].length} results`
      );
    }

    // check that the no results disclaimer is displayed
    const noResultsDisclaimer = page.getByTestId('no-results-found');
    if (!filteredJson['monitors and geostories'].length) {
      await expect(noResultsDisclaimer).toBeVisible();
    }
  });
});
