import { test, expect } from '@playwright/test';

import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    // Wait for the initial response from the API
    const initialResponse = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories*'
    );
    const datasetsData = (await initialResponse.json()) as MonitorsAndGeostoriesPaginated;

    // Get the search input element
    const searchInput = page.getByTestId('search-input');

    // Get a title that is at least 2 characters long for the search
    const searchTitle = datasetsData['monitors and geostories'][0].title;

    if (searchTitle.length >= 2) {
      // Start the debounced search by filling the input with a valid title
      await searchInput.fill(searchTitle);

      // Wait for the debounced search response, considering the debounce delay
      const searchPromise = page.waitForResponse(
        `https://api.earthmonitor.org/monitors-and-geostories?*title=${searchTitle}*`,
        { timeout: 15000 } // Increase the timeout if needed
      );

      const filteredResponse = await searchPromise;
      const inputValue = await searchInput.inputValue();
      const filteredJson = (await filteredResponse.json()) as MonitorsAndGeostoriesPaginated;

      // Assert that the filtered result matches the input value
      expect(filteredJson['monitors and geostories'][0].title).toEqual(inputValue);

      // Check that the number of results is displayed accurately
      await expect(page.getByTestId('datasets-result')).toBeVisible();
      if (filteredJson['monitors and geostories'].length === 1) {
        await expect(page.getByTestId('datasets-result')).toHaveText('1 result');
      } else if (filteredJson['monitors and geostories'].length > 1) {
        await expect(page.getByTestId('datasets-result')).toHaveText(
          `${filteredJson['monitors and geostories'].length} results`
        );
      }

      // Check that the no results disclaimer is displayed if there are no results
      const noResultsDisclaimer = page.getByTestId('no-results-found');
      if (!filteredJson['monitors and geostories'].length) {
        await expect(noResultsDisclaimer).toBeVisible();
      }
    } else {
      console.info('Search title is too short to trigger the search.');
    }
  });
});
