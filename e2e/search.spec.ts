import { test, expect } from '@playwright/test';

import type { Monitor } from '@/types/monitors';

import { THEMES } from '@/components/datasets-grid/constants';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test.describe('search of monitors and geostories', () => {
  test('search by title', async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?type=monitors'
    );
    const json = (await response.json()) as Monitor[];
    const monitorsTitles = json.map((data) => data.title);

    const searchInput = page.getByTestId('search-input');

    await searchInput.fill(monitorsTitles[0]);

    const inputValue = await searchInput.inputValue();

    const filteredResponse = await page.waitForResponse(
      `https://api.earthmonitor.org/monitors-and-geostories?type=monitors&title=${inputValue}`
    );
    const filteredJson = (await filteredResponse.json()) as Monitor[];

    const manuallyFilteredResponse = json.filter((monitor) => monitor.title === THEMES[0]);

    expect(filteredJson).toEqual(manuallyFilteredResponse);
  });
});
