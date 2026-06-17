import type { Page } from '@playwright/test';

import type { Geostory } from '@/types/geostories';

/**
 * Deterministic geostories fixture for the landing-page e2e tests.
 *
 * These tests used to hit the live `/geostories` API, which made them flaky on slow CI
 * runners (debounce + network round-trip + Cesium globe hydration regularly blew the
 * test-timeout budget). Mocking the endpoint keeps them fast and deterministic.
 *
 * Notes for anyone editing this fixture:
 * - `id`s must stay within FEATURED_GEOSTORY_IDS or the landing list won't render them.
 * - `theme` must be a valid category id (CATEGORIES_COLORS[theme] is read while rendering).
 * - `Water` is intentionally left with no featured geostory so the "no-results when no
 *   featured geostory matches the selected category" test has an empty category to select.
 */

export const FEATURED_GEOSTORY_IDS = [
  'g1',
  'g2',
  'g3',
  'g4',
  'g5',
  'g7',
  'g10',
  'g11',
  'g12',
  'g19',
  'g21',
  'g23',
  'g31',
  'g32',
] as const;

const makeGeostory = (id: string, title: string, theme: Geostory['theme']): Geostory => ({
  id,
  title,
  theme,
  author: 'Test Author',
  date_created: '2024-01-01',
  description: `${title} description`,
  layers: [],
  entity_type: 'geo_story',
  ready: true,
  metadata_url: '',
  notebooks_url: '',
  publications: [],
  use_case_link: [],
  geostory_bbox: null,
  monitors: [],
});

// 14 featured geostories spread across every category except Water (left empty on purpose).
export const GEOSTORIES_FIXTURE: Geostory[] = [
  makeGeostory('g1', 'Crop Yield Trends', 'Agriculture'),
  makeGeostory('g7', 'Irrigated Farmland Change', 'Agriculture'),
  makeGeostory('g2', 'Heatwave Exposure', 'Climate & Health'),
  makeGeostory('g10', 'Air Quality and Mortality', 'Climate & Health'),
  makeGeostory('g3', 'Soil Organic Carbon', 'Soil'),
  makeGeostory('g11', 'Soil Erosion Risk', 'Soil'),
  makeGeostory('g21', 'Topsoil Moisture', 'Soil'),
  makeGeostory('g4', 'Forest Carbon Stocks', 'Forest'),
  makeGeostory('g12', 'Deforestation Hotspots', 'Forest'),
  makeGeostory('g31', 'Forest Canopy Height', 'Forest'),
  makeGeostory('g5', 'Species Richness', 'Biodiversity'),
  makeGeostory('g19', 'Habitat Connectivity', 'Biodiversity'),
  makeGeostory('g23', 'Pollinator Distribution', 'Biodiversity'),
  makeGeostory('g32', 'Protected Area Coverage', 'Biodiversity'),
];

/**
 * Intercept the app's `GET /geostories` request and answer from the fixture. Honors the
 * `title` query param (the search box), filtering by case-insensitive substring match the
 * same way the backend does, so search tests stay realistic without a live API.
 */
export async function mockGeostories(page: Page, geostories: Geostory[] = GEOSTORIES_FIXTURE) {
  await page.route(/\/geostories(\?.*)?$/, (route) => {
    const url = new URL(route.request().url());
    const title = url.searchParams.get('title');
    const body =
      title && title.length >= 2
        ? geostories.filter((g) => g.title.toLowerCase().includes(title.toLowerCase()))
        : geostories;

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
}
