import { test, expect } from '@playwright/test';

import { MonitorTypes } from 'types/datasets';

test.beforeEach(async ({ page }) => {
  await page.goto('/map', { waitUntil: 'load' });
  const response = await page.waitForResponse('https://api.earthmonitor.org/monitors');
  const json = (await response.json()) as MonitorTypes[];
  const monitorsIds = json.map((data) => data.id);
  const monitorsList = page.getByTestId('monitors-list');

  await expect(monitorsList).toBeVisible();
  await page.getByTestId(`monitor-item-${monitorsIds[0]}`).click();
  await page.waitForURL(`**/map/${monitorsIds[0]}/datasets`, { waitUntil: 'load' });
});

test.describe('user should be able to copy and share current url', () => {
  test('copy to clipboard', async ({ page }) => {});

  test('from modal in /map/{monitor_id}/datasets', async ({ page }) => {
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
