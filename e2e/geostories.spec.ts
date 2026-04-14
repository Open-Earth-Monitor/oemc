import { test, expect, type Page } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { MonitorsAndGeostories } from '@/types/monitors-and-geostories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAllItems(page: Page) {
  const response = await page.request.get(`${API_URL}/monitors-and-geostories/`);
  return (await response.json()) as MonitorsAndGeostories;
}

async function fetchGeostory(page: Page, id: string) {
  const response = await page.request.get(`${API_URL}/geostories?geostory_id=${id}`);
  const data = (await response.json()) as Geostory[];
  return data[0];
}

test.describe('explore page — monitors & geostories list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore', { waitUntil: 'load' });
  });

  test('result count badge matches API total', async ({ page }) => {
    const data = await fetchAllItems(page);

    const countEl = page.getByTestId('results-count-number');
    await expect(countEl).toBeVisible();
    await expect(countEl).toHaveText(String(data.length));
  });

  test('each geostory card shows "Geostory" label, theme, and title link', async ({ page }) => {
    const data = await fetchAllItems(page);
    const geostories = data.filter((item) => item.id.startsWith('g')) as Geostory[];

    expect(geostories.length).toBeGreaterThan(0);

    for (const geostory of geostories) {
      await expect(page.getByTestId(`sidebar-geostory-card-${geostory.id}`).first()).toBeVisible();

      await expect(page.getByTestId(`card-type-${geostory.id}`).first()).toHaveText('Geostory');
      await expect(page.getByTestId(`card-theme-${geostory.id}`).first()).toHaveText(geostory.theme);

      const titleLink = page.getByTestId(`card-title-link-${geostory.id}`).first();
      await expect(titleLink).toBeVisible();
      await expect(titleLink).toHaveAttribute(
        'href',
        new RegExp(`/explore/geostory/${geostory.id}`)
      );
    }
  });

  test('clicking a geostory title navigates to its detail page', async ({ page }) => {
    const data = await fetchAllItems(page);
    const firstGeostory = data.find((item) => item.id.startsWith('g')) as Geostory;

    if (!firstGeostory) {
      test.skip(true, 'No geostory in API response');
      return;
    }

    await page.getByTestId(`card-title-link-${firstGeostory.id}`).first().click();
    await page.waitForURL(`**/explore/geostory/${firstGeostory.id}**`, { waitUntil: 'load' });

    expect(page.url()).toContain(`/explore/geostory/${firstGeostory.id}`);
  });
});

test.describe('geostory detail page', () => {
  let firstGeostoryId: string;

  test.beforeEach(async ({ page }) => {
    const data = await fetchAllItems(page);
    const first = data.find((item) => item.id.startsWith('g')) as Geostory;
    firstGeostoryId = first?.id;
  });

  test('shows geostory description', async ({ page }) => {
    if (!firstGeostoryId) {
      test.skip(true, 'No geostory available');
      return;
    }

    const geostoryData = await fetchGeostory(page, firstGeostoryId);

    await page.goto(`/explore/geostory/${firstGeostoryId}`, { waitUntil: 'load' });

    const description = page.getByTestId('geostory-description').first();
    await expect(description).toBeVisible();
    await expect(description).toHaveText(geostoryData.description);
  });

  test('shows datasets list with items matching geostory layers', async ({ page }) => {
    if (!firstGeostoryId) {
      test.skip(true, 'No geostory available');
      return;
    }

    const geostoryData = await fetchGeostory(page, firstGeostoryId);

    const expectedLayerCount =
      geostoryData.layers?.filter(
        ({ position }: { position?: string }) => position === 'right' || !position
      ).length ?? 0;

    await page.goto(`/explore/geostory/${firstGeostoryId}`, { waitUntil: 'load' });
    await page.waitForSelector('[data-testid="datasets-list"] li', { state: 'visible' });

    await expect(page.getByTestId('datasets-list').first().locator('li')).toHaveCount(expectedLayerCount);
  });
});
