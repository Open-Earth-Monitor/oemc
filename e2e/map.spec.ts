import { test, expect, type Page } from '@playwright/test';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Minimal layer fixture — enough for the legend to render.
// gs_base_wms is intentionally empty to disable the useLegendGraphic WMS query.
const LAYER_L1 = {
  layer_id: 'l1',
  title: 'Land Cover 2000',
  gs_base_wms: '',
  gs_name: '',
  gs_dimension: 'time',
  gs_style: [{ color: '#1a9641', label: 'Forest' }],
  range: ['20000101_20001231'],
  range_labels: ['2000'],
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
  title: 'Forest Monitor',
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

/** Intercept all backend API calls used by the monitor/map page. */
async function mockAPIs(page: Page) {
  // Layer detail — used by legend (useLayerParsedSource)
  await page.route(new RegExp(`${API_URL}/layers`), (route) => route.fulfill({ json: [LAYER_L1] }));
  // Monitor layers — used by the sidebar layer list
  await page.route(new RegExp(`${API_URL}/monitors/m1/layers`), (route) =>
    route.fulfill({ json: [LAYER_L1] })
  );
  // Monitor geostories — used by the sidebar geostory list
  await page.route(new RegExp(`${API_URL}/monitors/m1/geostories`), (route) =>
    route.fulfill({ json: [] })
  );
  // Monitor detail — used by useMonitor hook
  await page.route(new RegExp(`${API_URL}/monitors/m1$`), (route) =>
    route.fulfill({ json: [MONITOR_M1] })
  );
}

const LAYER_URL = '/explore/monitor/m1?layers=[{"id":"l1","opacity":1,"date":"20000101_20001231"}]';

test('legend', async ({ page }) => {
  await mockAPIs(page);
  await page.goto(LAYER_URL, { waitUntil: 'load' });

  await expect(page.getByTestId('map-legend')).toBeVisible();

  // should be 1 layer in the legend
  expect(await page.getByTestId('map-legend-item').count()).toBe(1);

  // legend actions
  await expect(page.getByTestId('map-legend-item-toolbar')).toBeVisible();

  // toggle visibility off
  await page.getByTestId('map-legend-item').getByTestId('layer-visibility').first().click();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'false');
  await expect(page).toHaveURL(
    new RegExp(
      /layers=\[{%22id%22:%22l1%22,%22opacity%22:0,%22date%22:%2220000101_20001231%22}\]/,
      'gi'
    )
  );

  // toggle visibility on
  await page.getByTestId('map-legend-item').getByTestId('layer-visibility').first().click();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');
  await expect(page).toHaveURL(
    new RegExp(
      /layers=\[{%22id%22:%22l1%22,%22opacity%22:1,%22date%22:%2220000101_20001231%22}\]/,
      'g'
    )
  );

  // opacity button visible
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-opacity-button')
  ).toBeVisible();
});

test('opacity 1 from url', async ({ page }) => {
  await mockAPIs(page);
  await page.goto(LAYER_URL, { waitUntil: 'load' });

  await expect(page.getByTestId('map-legend')).toBeVisible();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');

  await page.getByTestId('map-legend-item').getByTestId('layer-opacity-button').click();
  await expect(page.getByTestId('slider-current-value')).toHaveText('100%');
});

test('opacity 0 from url', async ({ page }) => {
  await mockAPIs(page);
  await page.goto(
    '/explore/monitor/m1?layers=[{"id":"l1","opacity":0,"date":"20000101_20001231"}]',
    { waitUntil: 'load' }
  );

  await expect(page.getByTestId('map-legend')).toBeVisible();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'false');

  await page.getByTestId('map-legend-item').getByTestId('layer-opacity-button').click();
  await expect(page.getByTestId('slider-current-value')).toHaveText('0%');
});

test('opacity 0.5 from url', async ({ page }) => {
  await mockAPIs(page);
  await page.goto(
    '/explore/monitor/m1?layers=[{"id":"l1","opacity":0.5,"date":"20000101_20001231"}]',
    { waitUntil: 'load' }
  );

  await expect(page.getByTestId('map-legend')).toBeVisible();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');

  await page.getByTestId('map-legend-item').getByTestId('layer-opacity-button').click();
  await expect(page.getByTestId('slider-current-value')).toHaveText('50%');
});

test.describe('general information in map page', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPIs(page);
    // Use networkidle so React Query fetches settle and the page stops re-rendering
    // before any test interaction — prevents elements detaching mid-click.
    await page.goto('/explore/monitor/m1', { waitUntil: 'networkidle' });
  });

  test('attributions', async ({ page }) => {
    const attributions = page.getByTestId('attributions');
    await expect(attributions).toBeVisible();
    await attributions.click();

    const attributionsContent = page.getByTestId('attributions-content');
    await expect(attributionsContent).toBeVisible();
    await expect(attributionsContent).toHaveText(
      "This project has received funding from the European Union's Horizon Europe research and innovation programme under grant agreement No. 101059548."
    );
  });

  test('disclaimer', async ({ page }) => {
    const disclaimer = page.getByTestId('disclaimer-link');
    await expect(disclaimer).toBeVisible();
    await disclaimer.click();

    const disclaimerContent = page.getByTestId('disclaimer-content');
    await expect(disclaimerContent).toBeVisible();
    await expect(page.getByTestId('disclaimer-content-1')).toHaveText(
      'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or European Commission.'
    );
    await expect(page.getByTestId('disclaimer-content-2')).toHaveText(
      'Neither the European Union nor the granting authority can be held responsible for them. The data is provided \u201cas is\u201d. Open-Earth-Monitor Cyberinfrastructure (OEMC) project consortium and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement.'
    );
    await expect(page.getByTestId('disclaimer-content-3')).toHaveText(
      'Neither OEMC project Consortium nor its suppliers and licensors, makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, the Website at your own discretion and risk.'
    );
  });

  test('OEMC contact us', async ({ page }) => {
    const contactUs = page.getByTestId('contact-link');
    await contactUs.click();
    await expect(contactUs).toHaveAttribute('href', 'https://earthmonitor.org/contact-us/');
  });

  test('OEMC privacy policy', async ({ page }) => {
    const privacyPolicy = page.getByTestId('privacy-policy-link');
    await privacyPolicy.click();
    await expect(privacyPolicy).toHaveAttribute('href', 'https://earthmonitor.org/privacy-policy/');
  });
});

test.describe('map tooltip', () => {
  test('shows "No layer active" message when clicking the map with no layer', async ({
    page,
  }) => {
    await mockAPIs(page);
    await page.goto('/explore/monitor/m1', { waitUntil: 'networkidle' });

    const viewport = page.locator('.ol-viewport').first();
    await expect(viewport).toBeVisible();
    const box = await viewport.boundingBox();
    if (!box) throw new Error('map viewport not laid out');
    // Click well inside the map, far enough from the sidebar to avoid pointer-event interception.
    await page.mouse.click(box.x + box.width - 100, box.y + box.height / 2);

    const tooltip = page.getByTestId('map-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(page.getByTestId('map-tooltip-title')).toHaveText('No layer active');
    await expect(page.getByTestId('map-tooltip-no-layer')).toBeVisible();
    await expect(page.getByTestId('map-tooltip-point-histogram')).toHaveCount(0);
    await expect(page.getByTestId('map-tooltip-region-histogram')).toHaveCount(0);

    await page.getByTestId('map-tooltip-close').click();
    await expect(tooltip).toHaveCount(0);
  });

  test('closes the tooltip on Escape and exposes dialog semantics', async ({ page }) => {
    await mockAPIs(page);
    await page.goto('/explore/monitor/m1', { waitUntil: 'networkidle' });

    const viewport = page.locator('.ol-viewport').first();
    await expect(viewport).toBeVisible();
    const box = await viewport.boundingBox();
    if (!box) throw new Error('map viewport not laid out');
    await page.mouse.click(box.x + box.width - 100, box.y + box.height / 2);

    const tooltip = page.getByTestId('map-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute('role', 'dialog');
    await expect(tooltip).toHaveAttribute('aria-live', 'polite');
    await expect(page.getByTestId('map-tooltip-close')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(tooltip).toHaveCount(0);
  });

  test('shows point histogram button when clicking the map with an active layer', async ({
    page,
  }) => {
    // Mock GetFeatureInfo for the WMS layer so a numeric value is returned.
    await page.route(
      /geoserver\.earthmonitor\.org\/geoserver\/.*REQUEST=GetFeatureInfo/i,
      (route) =>
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({
            type: 'FeatureCollection',
            features: [{ type: 'Feature', properties: { value: 42 } }],
          }),
        })
    );

    // Override the layer fixture so the GFI request fires (needs gs_name + gs_base_wms).
    const layerWithWms = {
      ...LAYER_L1,
      gs_name: 'oem:landcover',
      gs_base_wms: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
    };
    await mockAPIs(page);
    await page.route(new RegExp(`${API_URL}/layers`), (route) =>
      route.fulfill({ json: [layerWithWms] })
    );
    await page.route(new RegExp(`${API_URL}/monitors/m1/layers`), (route) =>
      route.fulfill({ json: [layerWithWms] })
    );

    await page.goto(LAYER_URL, { waitUntil: 'networkidle' });

    const viewport = page.locator('.ol-viewport').first();
    await expect(viewport).toBeVisible();
    const box = await viewport.boundingBox();
    if (!box) throw new Error('map viewport not laid out');
    // Click well inside the map, far enough from the sidebar to avoid pointer-event interception.
    await page.mouse.click(box.x + box.width - 100, box.y + box.height / 2);

    const tooltip = page.getByTestId('map-tooltip');
    await expect(tooltip).toBeVisible();
    await expect(page.getByTestId('map-tooltip-title')).toContainText('Land Cover 2000');
    await expect(page.getByTestId('map-tooltip-point-histogram')).toHaveText(
      'Show point histogram'
    );
    await expect(page.getByTestId('map-tooltip-region-histogram')).toHaveCount(0);

    // Point queries can't be named — show coordinates so the user knows where
    // they clicked. Expect "lat°, lon°" with at least one decimal place each.
    const coords = page.getByTestId('map-tooltip-coordinates');
    await expect(coords).toBeVisible();
    await expect(coords).toContainText('Coordinates:');
    await expect(coords).toContainText(/-?\d+\.\d+°,\s*-?\d+\.\d+°/);
  });
});
