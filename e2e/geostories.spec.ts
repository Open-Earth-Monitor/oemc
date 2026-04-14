import { test, expect, type Page } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';
import type { MonitorsAndGeostoriesPaginated } from '@/types/monitors-and-geostories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches monitors-and-geostories from the API and returns the first monitor
 * that has at least one related geostory.
 */
async function getFirstMonitorWithGeostories(page: Page) {
  const response = await page.request.get(`${API_URL}/monitors-and-geostories/`);
  const data = (await response.json()) as MonitorsAndGeostoriesPaginated;
  const monitors = data.results.filter((item) => item.entity_type === 'monitor') as Monitor[];
  return monitors.find((m) => m.geostories?.length > 0);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/explore', { waitUntil: 'load' });
});

test.describe('geostory links in explore sidebar', () => {
  test('monitor card shows geostory links with correct hrefs', async ({ page }) => {
    const firstMonitorWithGeostories = await getFirstMonitorWithGeostories(page);
    if (!firstMonitorWithGeostories) return;

    const firstGeostory = firstMonitorWithGeostories.geostories[0];
    const geostoryLink = page.getByTestId(`geostory-link-${firstGeostory.id}`);

    await expect(geostoryLink).toBeVisible();
    await expect(geostoryLink).toHaveAttribute(
      'href',
      new RegExp(`/explore/geostory/${firstGeostory.id}`)
    );
  });
});

test.describe('geostory page', () => {
  test('displays datasets list', async ({ page }) => {
    const firstMonitorWithGeostories = await getFirstMonitorWithGeostories(page);
    if (!firstMonitorWithGeostories) return;

    const firstGeostoryId = firstMonitorWithGeostories.geostories[0].id;

    await page.goto(`/explore/geostory/${firstGeostoryId}`, { waitUntil: 'load' });

    await page.waitForSelector('[data-testid="datasets-list"] li', { state: 'visible' });
    await expect(page.getByTestId('datasets-list')).toBeVisible();
  });

  test('displays geostory info from the API', async ({ page }) => {
    const firstMonitorWithGeostories = await getFirstMonitorWithGeostories(page);
    if (!firstMonitorWithGeostories) return;

    const firstGeostoryId = firstMonitorWithGeostories.geostories[0].id;

    const geostoryResponse = await page.request.get(
      `${API_URL}/geostories?geostory_id=${firstGeostoryId}`
    );
    const geostoryData = (await geostoryResponse.json()) as Geostory[];

    await page.goto(`/explore/geostory/${firstGeostoryId}`, { waitUntil: 'load' });

    await expect(page.getByTestId('datasets-list')).toBeVisible();
    // datasets count matches the geostory layers
    const datasetsListItems = page.getByTestId('datasets-list').locator('li');
    expect(await datasetsListItems.count()).toBeGreaterThan(0);
    expect(await datasetsListItems.count()).toBe(
      geostoryData[0]?.layers?.filter(
        ({ position }: { position?: string }) => position === 'right' || !position
      ).length
    );
  });

  test('shows related monitor links', async ({ page }) => {
    const firstMonitorWithGeostories = await getFirstMonitorWithGeostories(page);
    if (!firstMonitorWithGeostories) return;

    const firstGeostoryId = firstMonitorWithGeostories.geostories[0].id;
    await page.goto(`/explore/geostory/${firstGeostoryId}`, { waitUntil: 'load' });

    const monitorLink = page.getByTestId(`monitor-link-${firstMonitorWithGeostories.id}`);
    await expect(monitorLink).toBeVisible();
    await expect(monitorLink).toHaveText(firstMonitorWithGeostories.title);
  });
});

test('from a geostory, user can navigate to a related monitor', async ({ page }) => {
  const firstMonitorWithGeostories = await getFirstMonitorWithGeostories(page);
  if (!firstMonitorWithGeostories) return;

  const firstGeostoryId = firstMonitorWithGeostories.geostories[0].id;
  await page.goto(`/explore/geostory/${firstGeostoryId}`, { waitUntil: 'load' });

  const monitorLink = page.getByTestId(`monitor-link-${firstMonitorWithGeostories.id}`);
  await expect(monitorLink).toBeVisible();
  await monitorLink.click();

  await page.waitForURL(`**/explore/monitor/${firstMonitorWithGeostories.id}`, {
    waitUntil: 'load',
  });

  await expect(page.getByTestId('datasets-list')).toBeVisible();
});
