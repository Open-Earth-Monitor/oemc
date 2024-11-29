// TODO: fix tests when API gets ready
// import { test, expect } from '@playwright/test';
// import { orderBy } from 'lodash';

// import type { Geostory } from '@/types/geostories';
// import type { Monitor } from '@/types/monitors';

// import type { PaginatedResponse } from '@/hooks/datasets';

// test.beforeEach(async ({ page }) => {
//   await page.goto('/', { waitUntil: 'load' });
// });

// test.describe('sort monitors and geostories', () => {
//   // test('sort by id', async ({ page }) => {
//   //   const response = await page.waitForResponse(
//   //     'https://g3w.earthmonitor.org/dev
/monitors-and-geostories?sort_by=title'
//   //   );

//   //   const defaultOrderedDataByTitle = (await response.json()) as MonitorsAndGeostoriesResponse[];
//   //   const sortByIdCheckbox = page.getByTestId('id-button');

//   //   await sortByIdCheckbox.click();
//   //   const sortPromise = page.waitForResponse(
//   //     'https://g3w.earthmonitor.org/dev
/monitors-and-geostories?sort_by=id'
//   //   );
//   //   const sortedResponse = await sortPromise;
//   //   const sortedByIdResponse = (await sortedResponse.json()) as MonitorsAndGeostoriesResponse[];

//   //   const monitors = defaultOrderedDataByTitle.filter((item) => item.geostories);
//   //   const geostories = defaultOrderedDataByTitle.filter((item) => item.layers);
//   //   const orderedMonitorsById = orderBy(monitors, ['id']) satisfies Monitor[];
//   //   const orderedGeostoriesById = orderBy(geostories, ['id']) satisfies Geostory[];
//   //   expect(sortedByIdResponse).toEqual([...orderedMonitorsById, ...orderedGeostoriesById]);
//   // }); TO - DO - fix when API gets ready

//   test('sort by date', async ({ page }) => {
//     const response = await page.waitForResponse(
//       'https://g3w.earthmonitor.org/dev
/monitors-and-geostories?*sort_by=title*'
//     );

//     const defaultOrderedDataByTitle = (await response.json()) as PaginatedResponse;
//     const sortByDateCheckbox = page.getByTestId('date-button');

//     await sortByDateCheckbox.click();
//     const sortPromise = page.waitForResponse(
//       'https://g3w.earthmonitor.org/dev
/monitors-and-geostories?*sort_by=date'
//     );
//     const sortedResponse = await sortPromise;
//     const sortedByDateResponse = (await sortedResponse.json()) as PaginatedResponse;

//     const monitors = (defaultOrderedDataByTitle as Monitor[]).filter((item) => item.geostories);
//     const geostories = (defaultOrderedDataByTitle as Geostory[]).filter((item) => item.layers);
//     const orderedMonitorsByDate = orderBy(monitors, ['date']) satisfies Monitor[];
//     const orderedGeostoriesByDate = orderBy(geostories, ['date']) satisfies Geostory[];
//     expect(sortedByDateResponse).toEqual([...orderedMonitorsByDate, ...orderedGeostoriesByDate]);
//   });

//   test('sort by title (default option)', async ({ page }) => {
//     const response = await page.waitForResponse(
//       'https://g3w.earthmonitor.org/dev
/monitors-and-geostories?sort_by=title'
//     );

//     const defaultOrderedDataByTitle = (await response.json()) as PaginatedResponse;

//     const manuallyOrderedByTitle = defaultOrderedDataByTitle.sort((a, b) => {
//       return a.title.localeCompare(b.title);
//     });

//     expect(defaultOrderedDataByTitle).toEqual(manuallyOrderedByTitle);
//   });
// });
