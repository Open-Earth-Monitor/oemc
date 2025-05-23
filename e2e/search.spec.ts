import { test, expect } from '@playwright/test';

import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    const response = await page.waitForResponse(`${API_URL}/monitors-and-geostories/*`);
    const datasetsData = (await response.json()) as MonitorsAndGeostoriesPaginated;
    const searchInput = page.getByTestId('search-input');

    await searchInput.fill(datasetsData.results[0].title);
    const searchPromise = page.waitForResponse(`${API_URL}/monitors-and-geostories/?title=*`);
    const filteredResponse = await searchPromise;
    const inputValue = await searchInput.inputValue();
    const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

    expect(filteredJson.results[0].title).toEqual(inputValue);

    // check that the number of results is displayed accurately
    await expect(page.getByTestId('datasets-result')).toBeVisible();
    if (filteredJson.results.length === 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText('1 result');
    } else if (filteredJson['monitors and geostories'].length > 1) {
      await expect(page.getByTestId('datasets-result')).toHaveText(
        `${filteredJson['monitors and geostories']['results'].length} results`
      );
    }

    // check that the no results disclaimer is displayed
    const noResultsDisclaimer = page.getByTestId('no-results-found');
    if (!filteredJson['results'].length) {
      await expect(noResultsDisclaimer).toBeVisible();
    }
  });
});
