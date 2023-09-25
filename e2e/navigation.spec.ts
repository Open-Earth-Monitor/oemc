import { test, expect } from '@playwright/test';

import { navLinks } from 'components/header';
import type { MonitorTypes } from 'types/datasets';

test('pages navigation', async ({ page }) => {
  await page.goto('/');

  const navigationBar = page.getByTestId('main-navigation');

  for (const link of navLinks) {
    await navigationBar.getByTestId(link['data-testid']).click();
    await page.waitForURL('**' + link.href);
  }
});

test.describe('monitors navigation', () => {
  test('from modal', async ({ page }) => {
    await page.goto('/map', { waitUntil: 'load' });

    const response = await page.waitForResponse('https://api.earthmonitor.org/monitors');
    const json = (await response.json()) as MonitorTypes[];
    const monitorsIds = json.map((data) => data.id);
    const monitorsList = page.getByTestId('monitors-list');

    await expect(monitorsList).toBeVisible();

    for (const id of monitorsIds) {
      const monitorItem = page.getByTestId(`monitor-item-${id}`);
      await expect(monitorItem).toBeVisible();
      await expect(monitorItem).toHaveAttribute('href', `/map/${id}/datasets`);
    }

    // we only test the navigation of the first monitor
    await page.getByTestId(`monitor-item-${monitorsIds[0]}`).click();
    await page.waitForURL(`**/map/${monitorsIds[0]}/datasets`, { waitUntil: 'load' });
  });

  test('from sidebar', async ({ page }) => {
    await page.goto('/map', { waitUntil: 'load' });

    const monitorsFetchResponse = page.waitForResponse('https://api.earthmonitor.org/monitors');
    const response = await monitorsFetchResponse;
    const json = (await response.json()) as MonitorTypes[];
    const monitorsIds = json.map((data) => data.id);

    await page.getByTestId(`monitor-item-${monitorsIds[0]}`).click();
    await page.waitForURL(`**/map/${monitorsIds[0]}/datasets`, { waitUntil: 'load' });

    await page.getByTestId('monitors-directory-trigger').click();

    await monitorsFetchResponse;

    const monitorsList = page.getByTestId('monitors-list');

    await expect(monitorsList).toBeVisible();

    for (const id of monitorsIds) {
      const monitorItem = page.getByTestId(`monitor-item-${id}`);
      await expect(monitorItem).toBeVisible();
      await expect(monitorItem).toHaveAttribute('href', `/map/${id}/datasets`);
    }
  });
});
