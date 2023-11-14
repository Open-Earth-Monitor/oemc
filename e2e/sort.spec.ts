import { test, expect } from '@playwright/test';
// import { orderBy } from 'lodash-es';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

type MonitorsAndGeostoriesResponse = Geostory | Monitor;

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test.describe('sort monitors and geostories', () => {
  // test('sort by id', async ({ page }) => {
  //   const response = await page.waitForResponse(
  //     'https://api.earthmonitor.org/monitors-and-geostories?sort_by=title'
  //   );

  //   const defaultOrderedDataByTitle = (await response.json()) as MonitorsAndGeostoriesResponse[];
  //   const sortByIdCheckbox = page.getByTestId('id-button');

  //   await sortByIdCheckbox.click();
  //   const sortPromise = page.waitForResponse(
  //     'https://api.earthmonitor.org/monitors-and-geostories?sort_by=id'
  //   );
  //   const sortedResponse = await sortPromise;
  //   const sortedByIdResponse = (await sortedResponse.json()) as MonitorsAndGeostoriesResponse[];

  //   const monitors = defaultOrderedDataByTitle.filter((item) => item.geostories);
  //   const geostories = defaultOrderedDataByTitle.filter((item) => item.layers);
  //   const orderedMonitorsById = orderBy(monitors, ['id']) satisfies Monitor[];
  //   const orderedGeostoriesById = orderBy(geostories, ['id']) satisfies Geostory[];
  //   expect(sortedByIdResponse).toEqual([...orderedMonitorsById, ...orderedGeostoriesById]);
  // }); TO - DO - fix when API gets ready

  // test('sort by date', async ({ page }) => {
  //   const response = await page.waitForResponse(
  //     'https://api.earthmonitor.org/monitors-and-geostories?sort_by=title'
  //   );

  //   const defaultOrderedDataByTitle = (await response.json()) as MonitorsAndGeostoriesResponse[];
  //   const sortByDateCheckbox = page.getByTestId('date-button');

  //   await sortByDateCheckbox.click();
  //   const sortPromise = page.waitForResponse(
  //     'https://api.earthmonitor.org/monitors-and-geostories?sort_by=date'
  //   );
  //   const sortedResponse = await sortPromise;
  //   const sortedByDateResponse = (await sortedResponse.json()) as MonitorsAndGeostoriesResponse[];

  //   const monitors = defaultOrderedDataByTitle.filter((item) => item.geostories);
  //   const geostories = defaultOrderedDataByTitle.filter((item) => item.layers);
  //   const orderedMonitorsByDate = orderBy(monitors, ['date']) satisfies Monitor[];
  //   const orderedGeostoriesByDate = orderBy(geostories, ['date']) satisfies Geostory[];
  //   expect(sortedByDateResponse).toEqual([...orderedMonitorsByDate, ...orderedGeostoriesByDate]);
  // }); TO - DO - fix when API gets ready

  test('sort by title (default option)', async ({ page }) => {
    const response = await page.waitForResponse(
      'https://api.earthmonitor.org/monitors-and-geostories?sort_by=title'
    );

    const defaultOrderedDataByTitle = (await response.json()) as MonitorsAndGeostoriesResponse[];

    const manuallyOrderedByTitle = defaultOrderedDataByTitle?.sort((a, b) =>
      a.title > b.title ? 1 : a.title < b.title ? -1 : 0
    );

    expect(defaultOrderedDataByTitle).toEqual(manuallyOrderedByTitle);
  });
});
