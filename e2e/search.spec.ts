import { test, expect } from '@playwright/test';

import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

const API_URL = 'https://g3w.earthmonitor.org';
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    const response = await page.waitForResponse(`${API_URL}*`);
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;
    const searchInput = page.getByTestId('search-input');

    const searchPromise = page.waitForResponse(`${API_URL}?*title=*`);
    await searchInput.fill(datasetsData['results'][0].title);
    const filteredResponse = await searchPromise;
    const inputValue = await searchInput.inputValue();
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    expect(filteredJson['results'][0].title).toEqual(inputValue);

    // check that the number of results is displayed accurately
    await expect(page.getByTestId('datasets-result')).toBeVisible();
    if (filteredJson['results'].length === 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText('1 result');
    } else if (filteredJson['results'].length > 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText(
        `${filteredJson['results'].length} results`
      );
    }

    // check that the no results disclaimer is displayed
    const noResultsDisclaimer = page.getByTestId('no-results-found');
    if (!filteredJson['results'].length) {
      await expect(noResultsDisclaimer).toBeVisible();
    }
  });
});
