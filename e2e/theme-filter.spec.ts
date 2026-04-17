import { test, expect, type Page } from '@playwright/test';

import type { Geostory } from '@/types/geostories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FEATURED_GEOSTORY_IDS = [
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
];

async function fetchGeostories(page: Page): Promise<Geostory[]> {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set');
  const response = await page.request.get(`${API_URL}/geostories`);
  if (!response.ok()) throw new Error(`Failed to fetch geostories: ${response.status()}`);
  return response.json();
}

function featuredForCategories(geostories: Geostory[], categories: string[]) {
  return geostories.filter(
    (g) => FEATURED_GEOSTORY_IDS.includes(g.id) && categories.includes(g.theme)
  );
}

/**
 * On slow CI runners the landing page takes ~13s to become interactive because of
 * React hydration, the Cesium 3D globe, slide-in CSS animations, and Next.js RSC
 * prefetches. Until the page settles, Playwright's `locator.click` spends its entire
 * test-timeout budget on actionability checks for the first click. Waiting for the
 * geostories panel to render is a reliable signal that hydration and data fetching
 * have finished, so subsequent clicks dispatch immediately.
 */
async function waitForLandingReady(page: Page) {
  await page
    .getByTestId('featured-geostories-count')
    .waitFor({ state: 'attached', timeout: 30000 });
}

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

test.describe('category filters on landing page', () => {
  // The landing page carries Cesium and the 3D globe bundle, so on slow CI runners hydration
  // can eat ~15s of actionability wait before the first click lands. The default 30s test
  // timeout leaves no room for a second click, which is why multi-click cases used to fail.
  // Give these tests a 60s budget so every click has time to re-render between iterations.
  test.describe.configure({ timeout: 60_000 });

  test('categories-filter container is visible', async ({ page }) => {
    await expect(page.getByTestId('categories-filter')).toBeVisible();
  });

  test('each category button is visible', async ({ page }) => {
    const categories = [
      'Agriculture',
      'Water',
      'Climate & Health',
      'Soil',
      'Forest',
      'Biodiversity',
    ];
    for (const id of categories) {
      await expect(page.getByTestId(`category-filter-${id}`)).toBeVisible();
    }
  });

  test('selecting one category filters the list and updates the URL', async ({ page }) => {
    const allGeostories = await fetchGeostories(page);
    const category = 'Forest';

    await waitForLandingReady(page);
    await page.getByTestId(`category-filter-${category}`).click();

    // URL must contain the selected category
    await expect(page).toHaveURL(new RegExp(`categories=.*${encodeURIComponent(category)}`));

    const expected = featuredForCategories(allGeostories, [category]);
    const countEl = page.getByTestId('featured-geostories-count');

    if (expected.length === 1) {
      await expect(countEl).toHaveText('1 Feature Geostory');
    } else if (expected.length > 1) {
      await expect(countEl).toHaveText(`${expected.length} Featured Geostories`);
    } else {
      await expect(page.getByTestId('no-geostories-found')).toBeVisible();
    }
  });

  test('selecting multiple categories is accumulative and updates the URL', async ({ page }) => {
    const allGeostories = await fetchGeostories(page);
    const categories = ['Soil', 'Water'];

    await waitForLandingReady(page);
    for (const cat of categories) {
      const btn = page.getByTestId(`category-filter-${cat}`);
      await btn.click();
      // Wait for both the URL update AND aria-pressed before the next click. Waiting only on
      // aria-pressed can race the nuqs-driven URL write, which on slow CI keeps the main
      // thread busy and stalls the subsequent click. The single-button deselect test uses
      // this same sequence and passes reliably.
      await expect(page).toHaveURL(new RegExp(`categories=.*${encodeURIComponent(cat)}`));
      await expect(btn).toHaveAttribute('aria-pressed', 'true');
    }

    const expected = featuredForCategories(allGeostories, categories);
    const countEl = page.getByTestId('featured-geostories-count');

    if (expected.length === 1) {
      await expect(countEl).toHaveText('1 Feature Geostory');
    } else if (expected.length > 1) {
      await expect(countEl).toHaveText(`${expected.length} Featured Geostories`);
    } else {
      await expect(page.getByTestId('no-geostories-found')).toBeVisible();
    }
  });

  test('deselecting a category removes it from the URL', async ({ page }) => {
    await waitForLandingReady(page);
    const btn = page.getByTestId('category-filter-Agriculture');

    await btn.click();
    await expect(page).toHaveURL(/categories=.*Agriculture/);
    await expect(btn).toHaveAttribute('aria-pressed', 'true');

    await btn.click();
    // After deselecting, Agriculture must no longer appear in the categories param
    const url = page.url();
    const params = new URL(url).searchParams.get('categories');
    expect(params ?? '').not.toContain('Agriculture');
    await expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  test('selecting three categories shows only matching featured geostories and all are in the URL', async ({
    page,
  }) => {
    const allGeostories = await fetchGeostories(page);
    const categories = ['Forest', 'Agriculture', 'Biodiversity'];

    await waitForLandingReady(page);
    for (const cat of categories) {
      const btn = page.getByTestId(`category-filter-${cat}`);
      await btn.click();
      // Wait for both the URL update AND aria-pressed before the next click — see the
      // "selecting multiple categories" test above for the reasoning.
      await expect(page).toHaveURL(new RegExp(`categories=.*${encodeURIComponent(cat)}`));
      await expect(btn).toHaveAttribute('aria-pressed', 'true');
    }

    const expected = featuredForCategories(allGeostories, categories);
    const countEl = page.getByTestId('featured-geostories-count');

    if (expected.length === 1) {
      await expect(countEl).toHaveText('1 Feature Geostory');
    } else if (expected.length > 1) {
      await expect(countEl).toHaveText(`${expected.length} Featured Geostories`);
    } else {
      await expect(page.getByTestId('no-geostories-found')).toBeVisible();
    }
  });

  test('no-results message shown when no featured geostory matches the selected category', async ({
    page,
  }) => {
    const allGeostories = await fetchGeostories(page);

    const allCategories = [
      'Agriculture',
      'Water',
      'Climate & Health',
      'Soil',
      'Forest',
      'Biodiversity',
    ];
    const emptyCategory = allCategories.find(
      (cat) => featuredForCategories(allGeostories, [cat]).length === 0
    );

    if (!emptyCategory) {
      test.skip(true, 'All categories have at least one featured geostory');
      return;
    }

    await waitForLandingReady(page);
    await page.getByTestId(`category-filter-${emptyCategory}`).click();
    await expect(page).toHaveURL(new RegExp(`categories=.*${encodeURIComponent(emptyCategory)}`));
    await expect(page.getByTestId('no-geostories-found')).toBeVisible();
    await expect(page.getByTestId('no-geostories-found')).toContainText(
      "We couldn't find any geostories for your search. Try different keywords or remove some filters."
    );
  });
});
