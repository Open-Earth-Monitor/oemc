import { test, expect, type Page } from '@playwright/test';

import { FEATURED_GEOSTORY_IDS, GEOSTORIES_FIXTURE, mockGeostories } from './fixtures/geostories';

/**
 * Wait for the landing page's geostories panel to render — a reliable signal that
 * React hydration and initial data fetching have finished, so subsequent actions
 * don't burn test-timeout budget waiting on a half-hydrated page on slow CI.
 */
async function waitForLandingReady(page: Page) {
  await page
    .getByTestId('featured-geostories-count')
    .waitFor({ state: 'attached', timeout: 30000 });
}

test.beforeEach(async ({ page }) => {
  await mockGeostories(page);
  await page.goto('/');
});

test.describe('featured geostories on landing page', () => {
  // The landing page ships the Cesium 3D globe; on slow CI runners hydration plus the
  // 500ms search debounce plus the /geostories API round-trip can exceed the default 30s
  // test budget (the no-results test previously flaked for exactly this reason). Give the
  // landing-page tests a 60s budget.
  test.describe.configure({ timeout: 60_000 });

  test('displays only featured geostories', async ({ page }) => {
    // Wait for geostory items to appear
    await page.waitForSelector('[data-testid^="geostory-item-"]');

    const items = page.locator('[data-testid^="geostory-item-"]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    // Snapshot all test-ids in one page evaluation to avoid re-render races
    // (iterating with .nth(i).getAttribute() can detach mid-loop if the list re-renders).
    const testIds = await items.evaluateAll((els) =>
      els.map((el) => el.getAttribute('data-testid'))
    );
    for (const testId of testIds) {
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
    await waitForLandingReady(page);
    const searchInput = page.getByTestId('search-input');
    await searchInput.fill('zzz_no_match_query_xyz');

    // The search is debounced by 500ms then hits the real API on CI. Slow runners can
    // take well over 10s for the round-trip, so use 30s — still inside the 60s test budget.
    const noResults = page.getByTestId('no-geostories-found');
    await expect(noResults).toBeVisible({ timeout: 30000 });
    await expect(noResults).toContainText(
      "We couldn't find any geostories for your search. Try different keywords or remove some filters."
    );
  });

  test('filters displayed geostories when searching by title', async ({ page }) => {
    // The fixture's first entry is a featured geostory; its title is unique enough that
    // the substring search resolves to a single item.
    const featuredResult = GEOSTORIES_FIXTURE[0];
    expect((FEATURED_GEOSTORY_IDS as readonly string[]).includes(featuredResult.id)).toBe(true);

    await waitForLandingReady(page);
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
