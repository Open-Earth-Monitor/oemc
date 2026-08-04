import { test, expect } from '@playwright/test';

import { BASEMAPS } from '../src/components/map/controls/basemaps/constants';

const OPENFREEMAP_TILES = '**/tiles.openfreemap.org/**';

test.describe('basemap catalogue', () => {
  test('each basemap has exactly one kind of tile source', () => {
    for (const basemap of BASEMAPS) {
      expect(Boolean(basemap.url) !== Boolean(basemap.styleUrl), `${basemap.id}`).toBe(true);
    }
  });

  test('imagery basemaps declare the zoom their host stops at', () => {
    // Both hosts 404 above these levels. Losing the cap makes the imagery vanish
    // as the user zooms in rather than stretching the deepest level available.
    const ceilings = { s2cloudless: 16, blue_marble: 8 };

    for (const [id, maxZoom] of Object.entries(ceilings)) {
      expect(BASEMAPS.find((basemap) => basemap.id === id)?.maxZoom, id).toBe(maxZoom);
    }
  });
});

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

  test('both label styles carry only text layers, recoloured per variant', async ({ request }) => {
    const variants = { light: '#4a4a4a', dark: '#f2f3f0' };

    for (const [variant, textColor] of Object.entries(variants)) {
      const response = await request.get(`/basemaps/labels-${variant}.json`);
      expect(response.ok(), `labels-${variant}.json is served`).toBe(true);

      const style = await response.json();

      // Text only: sprite icons belong to the basemap, and an overlay carrying
      // them would draw highway shields on top of satellite imagery.
      expect(style.layers.every((layer) => layer.type === 'symbol')).toBe(true);
      expect(style.layers.every((layer) => !layer.layout?.['icon-image'])).toBe(true);
      expect(style.layers.length).toBeGreaterThan(0);

      // Every layer is recoloured for the variant, bar the four that are
      // deliberately stronger (countries and capitals).
      const colors = new Set(style.layers.map((layer) => layer.paint['text-color']));
      expect(colors.has(textColor)).toBe(true);

      // Empty template stops ol-mapbox-style fetching webfonts from a CDN.
      expect(style.metadata['ol:webfonts']).toBe('');
    }
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
    // The map is mounted and interactive even though nothing can paint: both the
    // basemap and the labels overlay pull their tiles from the blocked host.
    await expect(page.locator('.ol-viewport').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
});
