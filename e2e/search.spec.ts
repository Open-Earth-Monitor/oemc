import { test, expect } from '@playwright/test';

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

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('featured geostories on landing page', () => {
  test('displays only featured geostories', async ({ page }) => {
    // Wait for geostory items to appear
    await page.waitForSelector('[data-testid^="geostory-item-"]');

    const items = page.locator('[data-testid^="geostory-item-"]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    // Every visible item must be in the featured list
    for (let i = 0; i < count; i++) {
      const testId = await items.nth(i).getAttribute('data-testid');
      const id = testId?.replace('geostory-item-', '');
      expect(FEATURED_GEOSTORY_IDS).toContain(id);
    }
  });

  test('shows correct count label for featured geostories', async ({ page }) => {
    await page.waitForSelector('[data-testid^="geostory-item-"]');

    const countEl = page.getByTestId('featured-geostories-count');
    await expect(countEl).toBeVisible();

    const items = page.locator('[data-testid^="geostory-item-"]');
    const count = await items.count();

    if (count === 1) {
      await expect(countEl).toHaveText('1 Feature Geostory');
    } else if (count > 1) {
      await expect(countEl).toHaveText(`${count} Featured Geostories`);
    }
  });

  test('shows no-results message when search yields no featured geostories', async ({ page }) => {
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('zzz_no_match_query_xyz');

    // The search is debounced by 500ms; use a polling assertion with enough headroom
    // instead of a fixed timeout that races against the debounce.
    const noResults = page.getByTestId('no-geostories-found');
    await expect(noResults).toBeVisible({ timeout: 3000 });
    await expect(noResults).toContainText(
      "We couldn't find any geostories for your search. Try different keywords or remove some filters."
    );
  });

  test('filters displayed geostories when searching by title', async ({ page }) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await page.request.get(`${API_URL}/monitors-and-geostories/`);
    const data = await response.json();

    // Find a geostory from the featured list in the API response (plain array)
    const featuredResult = Array.isArray(data)
      ? data.find((item) => item.id?.startsWith('g') && FEATURED_GEOSTORY_IDS.includes(item.id))
      : undefined;

    if (!featuredResult) {
      test.skip(true, 'No featured geostory found in API response to search for');
      return;
    }

    const searchInput = page.getByTestId('search-input');
    await searchInput.fill(featuredResult.title);

    // At least one matching item should be visible
    const matchingItem = page.getByTestId(`geostory-item-${featuredResult.id}`);
    await expect(matchingItem).toBeVisible();

    // Count label should reflect visible results
    const countEl = page.getByTestId('featured-geostories-count');
    await expect(countEl).toBeVisible();
  });
});
