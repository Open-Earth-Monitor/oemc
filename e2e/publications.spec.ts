import { test, expect } from '@playwright/test';

const ZENODO_RECORD = {
  hits: {
    hits: [
      {
        id: 20430754,
        links: { self_html: 'https://zenodo.org/records/20430754' },
        metadata: {
          title: 'Global Pasture Watch - Annual livestock headcount layers',
          publication_date: '2026-06-30',
          creators: [{ name: 'Doe, Jane' }],
          resource_type: { title: 'Dataset' },
        },
      },
    ],
  },
};

const ZOTERO_ITEM = [
  {
    key: 'ABCD1234',
    links: { alternate: { href: 'https://www.zotero.org/groups/5705036/items/ABCD1234' } },
    data: {
      key: 'ABCD1234',
      title: "Towards a FAIRer future: insights from Europe's geospatial community",
      itemType: 'journalArticle',
      date: '2026-07-03',
      url: 'https://www.tandfonline.com/doi/full/10.1080/22797254.2026.2676254',
      DOI: '10.1080/22797254.2026.2676254',
      creators: [{ firstName: 'Ann', lastName: 'Roe', creatorType: 'author' }],
    },
  },
];

test.describe('recent publications', () => {
  // Both feeds are stubbed: the section must render deterministically and the
  // tests must not depend on Zenodo or Zotero being reachable from CI.
  test.beforeEach(async ({ page }) => {
    // Zotero is cross-origin, so its stub must send the CORS header the real API
    // sends — without it the browser discards the mocked response. Zenodo is
    // reached through the app's own `/api/zenodo/records` proxy (Zenodo itself
    // sends no CORS headers), so that stub is same-origin.
    const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

    await page.route('**/api/zenodo/records**', (route) => route.fulfill({ json: ZENODO_RECORD }));
    await page.route('**/api.zotero.org/groups/**', (route) =>
      route.fulfill({ json: ZOTERO_ITEM, headers: CORS_HEADERS })
    );
  });

  test('lists the publications under the carousel, not inside it', async ({ page }) => {
    // From 1680px the panel's column clears the centred category filter, so both
    // entries are listed; below that only the first is (see the narrow case below).
    await page.setViewportSize({ width: 1680, height: 900 });
    await page.goto('/', { waitUntil: 'load' });

    // Both entries render in their own list below the feed carousel, so they are
    // reachable without paging through the posts — and one comes from each library.
    const list = page.getByTestId('globe-publications');
    await expect(list.getByTestId('publication-card-zenodo')).toBeVisible();
    await expect(list.getByTestId('publication-card-zotero')).toBeVisible();

    // Nothing publication-shaped is left in the carousel track.
    await expect(page.locator('[role="region"] [data-testid^="publication-card-"]')).toHaveCount(0);
  });

  test('lists one publication while the category filter reaches into the column', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'load' });

    // Newest first, so the Zotero item (2026-07-03) takes the single slot and the
    // Zenodo record (2026-06-30) is the one dropped: a second card would sit on
    // top of the last category in the filter.
    const list = page.getByTestId('globe-publications');
    await expect(list.getByTestId('publication-card-zotero')).toBeVisible();
    await expect(list.getByTestId('publication-card-zenodo')).toBeHidden();
  });

  test('links out to the record and the publisher', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    await expect(page.getByTestId('publication-card-zenodo')).toHaveAttribute(
      'href',
      'https://zenodo.org/records/20430754'
    );
    // Zotero items link to the publisher, not to the Zotero library entry.
    await expect(page.getByTestId('publication-card-zotero')).toHaveAttribute(
      'href',
      'https://www.tandfonline.com/doi/full/10.1080/22797254.2026.2676254'
    );
  });

  test('drops the publications list when both libraries fail', async ({ page }) => {
    await page.unroute('**/api/zenodo/records**');
    await page.unroute('**/api.zotero.org/groups/**');
    await page.route('**/api/zenodo/records**', (route) => route.abort());
    await page.route('**/api.zotero.org/groups/**', (route) => route.abort());

    // Both requests are observed before asserting, so the check is about the
    // rendered result rather than about being early. `networkidle` is unusable
    // here: the globe streams Cesium tiles for as long as the page is open.
    const zenodoFailed = page.waitForEvent('requestfailed', (request) =>
      request.url().includes('/api/zenodo/records')
    );
    const zoteroFailed = page.waitForEvent('requestfailed', (request) =>
      request.url().includes('api.zotero.org/groups')
    );

    await page.goto('/', { waitUntil: 'load' });
    await Promise.all([zenodoFailed, zoteroFailed]);

    // The social feed keeps working; the panel just loses the section.
    await expect(page.getByTestId('globe-publications')).toHaveCount(0);
    await expect(page.getByTestId('publication-card-zenodo')).toHaveCount(0);
    await expect(page.getByTestId('publication-card-zotero')).toHaveCount(0);
  });

  test('lists records from both libraries newest first in the publications tab', async ({
    page,
  }) => {
    await page.unroute('**/api/zenodo/records**');
    // Deliberately out of order: the hook must sort by publication date, not
    // trust the order Zenodo returns.
    await page.route('**/api/zenodo/records**', (route) =>
      route.fulfill({
        json: {
          hits: {
            hits: [
              {
                id: 1,
                links: { self_html: 'https://zenodo.org/records/1' },
                metadata: {
                  title: 'Older record',
                  publication_date: '2025-01-15',
                  resource_type: { title: 'Dataset' },
                },
              },
              {
                id: 2,
                links: { self_html: 'https://zenodo.org/records/2' },
                metadata: {
                  title: 'Newer record',
                  publication_date: '2026-06-30',
                  resource_type: { title: 'Dataset' },
                },
              },
            ],
          },
        },
      })
    );

    await page.goto('/usage-stats?mediaFilter=%5B%22publications%22%5D', { waitUntil: 'load' });

    const cards = page.locator('[data-testid="publications-list"] > div');
    // The Zotero item from `beforeEach` is dated 2026-07-03, so it sorts above
    // both Zenodo records: the tab merges the libraries rather than listing one.
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Towards a FAIRer future: insights from Europe');
    await expect(cards.nth(0)).toContainText('Zotero');
    await expect(cards.nth(1)).toContainText('Newer record');
    await expect(cards.nth(1)).toContainText('Zenodo');
    await expect(cards.nth(2)).toContainText('Older record');
  });
});
