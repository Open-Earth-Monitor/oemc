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
    // Both hosts are cross-origin, so the stubs must send the CORS header the
    // real APIs send — without it the browser discards the mocked response.
    const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

    await page.route('**/zenodo.org/api/records**', (route) =>
      route.fulfill({ json: ZENODO_RECORD, headers: CORS_HEADERS })
    );
    await page.route('**/api.zotero.org/groups/**', (route) =>
      route.fulfill({ json: ZOTERO_ITEM, headers: CORS_HEADERS })
    );
  });

  test('shows one card per source inside the social feed carousel', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    await expect(page.getByTestId('publication-card-zenodo')).toBeVisible();
    await expect(page.getByTestId('publication-card-zotero')).toBeVisible();

    // Both live in the feed's carousel track rather than in a section of their
    // own. The post count is live data, so the slide total is not asserted.
    await expect(page.locator('aside [data-testid="publication-card-zenodo"]')).toHaveCount(1);
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

  test('drops the publication slides when both libraries fail', async ({ page }) => {
    await page.unroute('**/zenodo.org/api/records**');
    await page.unroute('**/api.zotero.org/groups/**');
    await page.route('**/zenodo.org/api/records**', (route) => route.abort());
    await page.route('**/api.zotero.org/groups/**', (route) => route.abort());

    // Both requests are observed before asserting, so the check is about the
    // rendered result rather than about being early. `networkidle` is unusable
    // here: the globe streams Cesium tiles for as long as the page is open.
    const zenodoFailed = page.waitForEvent('requestfailed', (request) =>
      request.url().includes('zenodo.org/api/records')
    );
    const zoteroFailed = page.waitForEvent('requestfailed', (request) =>
      request.url().includes('api.zotero.org/groups')
    );

    await page.goto('/', { waitUntil: 'load' });
    await Promise.all([zenodoFailed, zoteroFailed]);

    // The social feed keeps working; it just has no publication slides.
    await expect(page.getByTestId('publication-card-zenodo')).toHaveCount(0);
    await expect(page.getByTestId('publication-card-zotero')).toHaveCount(0);
  });

  test('lists Zenodo records newest first in the publications tab', async ({ page }) => {
    await page.unroute('**/zenodo.org/api/records**');
    // Deliberately out of order: the hook must sort by publication date, not
    // trust the order Zenodo returns.
    await page.route('**/zenodo.org/api/records**', (route) =>
      route.fulfill({
        headers: { 'Access-Control-Allow-Origin': '*' },
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
    await expect(cards).toHaveCount(2);
    await expect(cards.first()).toContainText('Newer record');
    await expect(cards.last()).toContainText('Older record');
  });
});
