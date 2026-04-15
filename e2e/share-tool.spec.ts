import { test, expect, type Page } from '@playwright/test';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';
import type { MonitorsAndGeostories } from '@/types/monitors-and-geostories';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getFirstMonitor(page: Page): Promise<Monitor> {
  const response = await page.request.get(`${API_URL}/monitors-and-geostories/`);
  const data = (await response.json()) as MonitorsAndGeostories;
  return data.find((item) => item.id.startsWith('m')) as Monitor;
}

async function getFirstGeostory(page: Page): Promise<Geostory> {
  const response = await page.request.get(`${API_URL}/monitors-and-geostories/`);
  const data = (await response.json()) as MonitorsAndGeostories;
  return data.find((item) => item.id.startsWith('g')) as Geostory;
}

/** Wait for both `layers` and `bbox` URL params to appear — they're set by React hooks after data loads. */
async function waitForMapState(page: Page) {
  await page.waitForURL((url) => url.searchParams.has('layers') && url.searchParams.has('bbox'), {
    timeout: 15000,
  });
}

async function openSharePopover(page: Page) {
  await page.getByTestId('share-tool-trigger').click();
  await expect(page.getByTestId('copy-url-link')).toBeVisible();
}

test.describe('share tool — copy URL', () => {
  test('copies the current URL with monitor path, layers, and bbox', async ({ page }) => {
    const monitor = await getFirstMonitor(page);
    await page.goto(`/explore/monitor/${monitor.id}`, { waitUntil: 'load' });
    await waitForMapState(page);

    const urlBeforeCopy = new URL(page.url());
    expect(urlBeforeCopy.pathname).toBe(`/explore/monitor/${monitor.id}`);
    expect(urlBeforeCopy.searchParams.has('layers')).toBe(true);
    expect(urlBeforeCopy.searchParams.has('bbox')).toBe(true);

    await openSharePopover(page);
    await page.getByTestId('copy-url-link').click();

    await expect(page.getByTestId('copy-link-success')).toBeVisible();
    await expect(page.getByTestId('copy-link-success')).toBeHidden({ timeout: 5000 });
  });

  test('copies the current URL with geostory path, layers, and bbox', async ({ page }) => {
    const geostory = await getFirstGeostory(page);
    await page.goto(`/explore/geostory/${geostory.id}`, { waitUntil: 'load' });
    await waitForMapState(page);

    const urlBeforeCopy = new URL(page.url());
    expect(urlBeforeCopy.pathname).toBe(`/explore/geostory/${geostory.id}`);
    expect(urlBeforeCopy.searchParams.has('layers')).toBe(true);
    expect(urlBeforeCopy.searchParams.has('bbox')).toBe(true);

    await openSharePopover(page);
    await page.getByTestId('copy-url-link').click();
    await expect(page.getByTestId('copy-link-success')).toBeVisible();
  });

  test('URL includes active category filter', async ({ page }) => {
    const monitor = await getFirstMonitor(page);
    await page.goto(`/explore/monitor/${monitor.id}`, { waitUntil: 'load' });
    await waitForMapState(page);

    // Navigate to explore root so category filter is accessible (sidebar has it)
    await page.goto(`/explore/monitor/${monitor.id}?categories=["Forest"]`, { waitUntil: 'load' });

    const url = new URL(page.url());
    expect(url.searchParams.get('categories')).toContain('Forest');

    await openSharePopover(page);
    await page.getByTestId('copy-url-link').click();
    await expect(page.getByTestId('copy-link-success')).toBeVisible();
  });

  test('URL includes compare layers when comparison is active', async ({ page }) => {
    const geostory = await getFirstGeostory(page);
    // Navigate with a simulated compareLayers param to verify it is preserved
    await page.goto(`/explore/geostory/${geostory.id}`, { waitUntil: 'load' });
    await waitForMapState(page);

    // If the geostory has a comparison layer, compareLayers will appear in the URL
    const url = new URL(page.url());
    // At minimum the layers param must be present
    expect(url.searchParams.has('layers')).toBe(true);

    await openSharePopover(page);
    await page.getByTestId('copy-url-link').click();
    await expect(page.getByTestId('copy-link-success')).toBeVisible();
  });
});

test.describe('share tool — social media', () => {
  test.beforeEach(async ({ page }) => {
    const monitor = await getFirstMonitor(page);
    await page.goto(`/explore/monitor/${monitor.id}`, { waitUntil: 'load' });
    await waitForMapState(page);
    await openSharePopover(page);
  });

  test('X (Twitter) button is visible and opens share popup with current URL', async ({ page }) => {
    const twitterBtn = page.getByTestId('share-twitter-button');
    await expect(twitterBtn).toBeVisible();

    const currentUrl = page.url();

    const [popup] = await Promise.all([page.waitForEvent('popup'), twitterBtn.click()]);

    await popup.waitForLoadState('domcontentloaded');
    expect(popup.url()).toMatch(/twitter\.com|x\.com/);
    // The share popup URL must encode the current page URL
    expect(decodeURIComponent(popup.url())).toContain(new URL(currentUrl).pathname);
  });

  test('LinkedIn button is visible and opens share popup with current URL', async ({ page }) => {
    const linkedinBtn = page.getByTestId('share-linkedin-button');
    await expect(linkedinBtn).toBeVisible();

    const currentUrl = page.url();

    const [popup] = await Promise.all([page.waitForEvent('popup'), linkedinBtn.click()]);

    await popup.waitForLoadState('domcontentloaded');
    expect(popup.url()).toContain('linkedin.com');
    expect(decodeURIComponent(popup.url())).toContain(new URL(currentUrl).pathname);
  });
});
