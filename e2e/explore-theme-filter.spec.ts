import { test, expect, type Page } from '@playwright/test';

import type { MonitorsAndGeostories } from '@/types/monitors-and-geostories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAllItems(page: Page): Promise<MonitorsAndGeostories> {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set');
  const response = await page.request.get(`${API_URL}/monitors-and-geostories/`);
  if (!response.ok()) throw new Error(`Failed to fetch items: ${response.status()}`);
  return response.json();
}

async function fetchItemsByTheme(page: Page, theme: string): Promise<MonitorsAndGeostories> {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not set');
  const response = await page.request.get(
    `${API_URL}/monitors-and-geostories/?theme=${encodeURIComponent(theme)}`
  );
  if (!response.ok()) throw new Error(`Failed to fetch items: ${response.status()}`);
  return response.json();
}

test.describe('explore page — map sidebar theme filter', () => {
  test.describe.configure({ timeout: 60_000 });

  test.beforeEach(async ({ page }) => {
    await page.goto('/explore', { waitUntil: 'load' });
    // Wait for first dataset render so the sidebar is interactive.
    await page.getByTestId('results-count-number').waitFor({ state: 'attached', timeout: 30_000 });
  });

  test('All Categories button is rendered, labeled, and active by default', async ({ page }) => {
    const allBtn = page.getByTestId('map-sidebar-category-All');
    await expect(allBtn).toBeVisible();
    await expect(allBtn).toHaveAttribute('aria-label', 'All Categories');
    await expect(allBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('clicking All Categories shows every dataset (bug regression)', async ({ page }) => {
    const all = await fetchAllItems(page);

    // First narrow the list with a real category.
    await page.getByTestId('map-sidebar-category-Forest').click();
    await expect(page).toHaveURL(/categories=.*Forest/);
    await expect(page.getByTestId('map-sidebar-category-Forest')).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    // Then click "All Categories" — full list must come back.
    const allBtn = page.getByTestId('map-sidebar-category-All');
    await allBtn.click();

    await expect(allBtn).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('results-count-number')).toHaveText(String(all.length));
    // URL should not encode an array like ["All"] — value is the string "All" or absent.
    const param = new URL(page.url()).searchParams.get('categories');
    expect(param ?? '"All"').not.toMatch(/\[/);
  });

  test('selecting a category narrows results to that theme', async ({ page }) => {
    const theme = 'Forest';
    const expected = await fetchItemsByTheme(page, theme);

    const btn = page.getByTestId(`map-sidebar-category-${theme}`);
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(new RegExp(`categories=.*${encodeURIComponent(theme)}`));
    await expect(page.getByTestId('results-count-number')).toHaveText(String(expected.length));

    // Only one category active at a time in the map sidebar.
    await expect(page.getByTestId('map-sidebar-category-All')).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('each category button is keyboard reachable and activates with Enter', async ({ page }) => {
    const forest = page.getByTestId('map-sidebar-category-Forest');
    await forest.focus();
    await expect(forest).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(forest).toHaveAttribute('aria-pressed', 'true');

    const all = page.getByTestId('map-sidebar-category-All');
    await all.focus();
    await page.keyboard.press('Space');
    await expect(all).toHaveAttribute('aria-pressed', 'true');
  });

  test('every category button exposes a programmatic accessible name', async ({ page }) => {
    const labels = [
      ['All', 'All Categories'],
      ['Agriculture', 'Agriculture'],
      ['Water', 'Water'],
      ['Climate & Health', 'Climate & Health'],
      ['Soil', 'Soil'],
      ['Forest', 'Forest'],
      ['Biodiversity', 'Biodiversity'],
    ] as const;

    for (const [id, label] of labels) {
      const btn = page.getByTestId(`map-sidebar-category-${id}`);
      await expect(btn).toBeVisible();
      await expect(btn).toHaveAttribute('aria-label', label);
      // Toggle semantics: must always expose aria-pressed.
      await expect(btn).toHaveAttribute('aria-pressed', /(true|false)/);
    }
  });

  test('hit target is at least 44x44 (WCAG 2.5.5 Enhanced)', async ({ page }) => {
    const btn = page.getByTestId('map-sidebar-category-All');
    const box = await btn.evaluate((el) => {
      const cs = window.getComputedStyle(el, '::before');
      const rect = el.getBoundingClientRect();
      // Extension via the ::before pseudo-element.
      const extendTop = Math.abs(parseFloat(cs.top || '0'));
      const extendLeft = Math.abs(parseFloat(cs.left || '0'));
      return {
        width: rect.width + 2 * extendLeft,
        height: rect.height + 2 * extendTop,
      };
    });
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  });
});
