import { test, expect, type Page } from '@playwright/test';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Long range labels are what used to push the compare row past the legend width, taking the
// close control off-screen with it (OEMC-444, reproduced on l62/l63).
const LAYER_L1 = {
  layer_id: 'l1',
  title: 'Gross primary productivity',
  gs_base_wms: '',
  gs_name: '',
  gs_dimension: 'time',
  gs_style: [{ color: '#1a9641', label: 'Forest' }],
  range: ['20000101_20001231', '20010101_20011231', '20020101_20021231'],
  range_labels: [
    '1 January 2000 – 31 December 2000',
    '1 January 2001 – 31 December 2001',
    '1 January 2002 – 31 December 2002',
  ],
  author: null,
  coverage: 'Global',
  description: '',
  download_url: '',
  filename: '',
  geo_story: '',
  license: '',
  location_query_url: '',
  metadata_url: '',
  monitor: 'm1',
  monitor_id: 'm1',
  polygon_query_url: '',
  regex: '',
  srv_path: '',
  theme: 'Forest',
  unit: '',
  use_case: '',
  position: 'left',
  value_society: '',
  data_meaning: '',
  usage_examples: '',
};

const MONITOR_M1 = {
  id: 'm1',
  title: 'World-land degradation neutrality monitor',
  author: '',
  coverage: 'Global',
  date_created: '2020-01-01',
  description: '',
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

async function mockAPIs(page: Page) {
  await page.route(new RegExp(`${API_URL}/layers`), (route) => route.fulfill({ json: [LAYER_L1] }));
  await page.route(new RegExp(`${API_URL}/monitors/m1/layers`), (route) =>
    route.fulfill({ json: [LAYER_L1] })
  );
  await page.route(new RegExp(`${API_URL}/monitors/m1/geostories`), (route) =>
    route.fulfill({ json: [] })
  );
  await page.route(new RegExp(`${API_URL}/monitors/m1$`), (route) =>
    route.fulfill({ json: [MONITOR_M1] })
  );
}

const LAYER_URL = '/explore/monitor/m1?layers=[{"id":"l1","opacity":1,"date":"20000101_20001231"}]';

test('compare can be closed when the date labels are long', async ({ page }) => {
  await mockAPIs(page);
  await page.goto(LAYER_URL, { waitUntil: 'load' });

  await expect(page.getByTestId('map-legend')).toBeVisible();

  const dateRow = page.locator('div:has(> span:text-is("Select date:")) > div').last();
  await expect(dateRow).toBeVisible();

  await page.getByRole('button', { name: 'Compare', exact: true }).first().click();

  const close = page.getByRole('button', { name: 'Close comparison' });
  await expect(close.first()).toBeVisible();

  // The date row must not overflow horizontally...
  const metrics = await dateRow.evaluate((el) => ({
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);

  // ...the long label must break at the dash rather than being clipped...
  const pill = page.locator('[data-testid="map-legend"] [role="combobox"]').first();
  const pillMetrics = await pill.evaluate((el) => {
    const label = el.querySelector('span.whitespace-nowrap');
    return {
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      height: el.getBoundingClientRect().height,
      firstLine: label?.textContent ?? '',
      fullText: el.textContent ?? '',
    };
  });
  expect(pillMetrics.scrollWidth).toBeLessThanOrEqual(pillMetrics.clientWidth + 1);
  expect(pillMetrics.fullText).toContain('31 December 2000');
  // two lines: the dash ends the first one
  expect(pillMetrics.firstLine.trim().endsWith('–')).toBe(true);
  expect(pillMetrics.height).toBeGreaterThan(28);

  // ...and the close control must be fully on screen.
  const box = await close.first().boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);

  // Clicking it clears comparison instead of opening the select it sits in.
  await close.first().click();
  await expect(page.getByRole('button', { name: 'Compare', exact: true }).first()).toBeVisible();
  await expect(page).not.toHaveURL(/compareLayers/);
  await expect(page.getByRole('option')).toHaveCount(0);
});
