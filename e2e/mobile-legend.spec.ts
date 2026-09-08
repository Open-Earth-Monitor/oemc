import { test, expect, devices, type Page } from '@playwright/test';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Enough of a layer for the legend to render; the empty WMS fields keep the
// legend graphic query off.
const LAYER_L1 = {
  layer_id: 'l1',
  title: 'Land Cover 2000',
  gs_base_wms: '',
  gs_name: '',
  gs_dimension: 'time',
  gs_style: [{ color: '#1a9641', label: 'Forest' }],
  range: ['20000101_20001231'],
  range_labels: ['2000'],
  monitor: 'm1',
  monitor_id: 'm1',
  theme: 'Forest',
  position: 'left',
};

const MONITOR_M1 = {
  id: 'm1',
  title: 'Forest Monitor',
  author: '',
  coverage: 'Global',
  date_created: '2020-01-01',
  description: 'A monitor.',
  geostories: [],
  entity_type: 'monitor',
  ready: true,
  metadata_url: '',
  notebooks_url: '',
  publications: [],
  use_case_link: [],
  monitor_bbox: [-25, 24, 45, 72],
  theme: 'Forest',
};

async function mockMonitor(page: Page, layers: (typeof LAYER_L1)[]) {
  await page.route(new RegExp(`${API_URL}/layers`), (route) => route.fulfill({ json: layers }));
  await page.route(new RegExp(`${API_URL}/monitors/m1/layers`), (route) =>
    route.fulfill({ json: layers })
  );
  await page.route(new RegExp(`${API_URL}/monitors/m1/geostories`), (route) =>
    route.fulfill({ json: [] })
  );
  await page.route(new RegExp(`${API_URL}/monitors/m1$`), (route) =>
    route.fulfill({ json: [MONITOR_M1] })
  );
}

test.use({ ...devices['Pixel 7'] });

test.describe('map page on phones — legend tab', () => {
  test('a monitor without layers has no legend tab', async ({ page }) => {
    await mockMonitor(page, []);
    await page.goto('/explore/monitor/m1', { waitUntil: 'load' });

    // The details tab is there; only the legend is missing.
    await expect(page.getByRole('button', { name: 'Monitor', exact: true })).toBeVisible();
    await expect(page.getByTestId('mobile-legend-toggle')).toHaveCount(0);
  });

  test('a monitor with a layer on the map has a legend tab that opens the legend', async ({
    page,
  }) => {
    await mockMonitor(page, [LAYER_L1]);
    await page.goto('/explore/monitor/m1?layers=[{"id":"l1","opacity":1}]', {
      waitUntil: 'load',
    });

    const toggle = page.getByTestId('mobile-legend-toggle');
    await expect(toggle).toBeVisible();

    await toggle.click();
    await expect(
      page.locator('[data-testid="map-legend-item-title"]:visible', { hasText: 'Land Cover 2000' })
    ).toBeVisible();
  });

  test('the legend tab goes away when the last layer is removed', async ({ page }) => {
    await mockMonitor(page, [LAYER_L1]);
    await page.goto('/explore/monitor/m1?layers=[{"id":"l1","opacity":1}]', {
      waitUntil: 'load',
    });

    const toggle = page.getByTestId('mobile-legend-toggle');
    await toggle.click();
    await page
      .locator('[data-testid="map-legend-item-toolbar"]:visible')
      .getByRole('button', { name: /remove/i })
      .click();

    await expect(toggle).toHaveCount(0);
  });
});
