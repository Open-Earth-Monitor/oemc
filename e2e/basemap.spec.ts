import { test, expect } from '@playwright/test';

const OPENFREEMAP_TILES = '**/tiles.openfreemap.org/**';

test.describe('vector basemap', () => {
  test('the bundled style draws no labels of its own', async ({ request }) => {
    const response = await request.get('/basemaps/oemc.json');
    expect(response.ok()).toBe(true);

    const style = await response.json();

    // Labels come from the overlay in map settings, not from the basemap: every
    // `symbol` layer was stripped so place names cannot be drawn twice.
    expect(style.layers.filter((layer) => layer.type === 'symbol')).toEqual([]);
    // The land colour lives in the background layer; losing it lets the page
    // background show through as if the continents were unpainted.
    expect(style.layers.some((layer) => layer.type === 'background')).toBe(true);
    expect(style.sources.openmaptiles.url).toContain('tiles.openfreemap.org');
  });

  test('renders without errors when the tile host is unreachable', async ({ page }) => {
    // The style is served by us, the tiles are not. Blocking them keeps the test
    // offline and proves an unreachable tile host does not break the map.
    await page.route(OPENFREEMAP_TILES, (route) => route.abort());

    const errors: string[] = [];
    // The Cesium globe's SSR warning fires on every page and is not ours.
    page.on('pageerror', (error) => {
      if (!error.message.includes('document is not defined')) errors.push(error.message);
    });

    const styleRequested = page.waitForResponse((response) =>
      response.url().includes('/basemaps/oemc.json')
    );

    await page.goto('/explore?basemap=%22gray_scale%22', { waitUntil: 'load' });

    expect((await styleRequested).ok()).toBe(true);
    await expect(page.locator('.ol-viewport canvas').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
});
