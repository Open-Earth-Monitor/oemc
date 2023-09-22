import { test, expect } from '@playwright/test';

import { useMonitors } from '@/hooks/monitors';

import { navLinks } from 'components/header';
test('test main navigation from header', async ({ page }) => {
  await page.goto('/');

  const navigationBar = page.getByTestId('main-navigation');
  for (const link of navLinks) {
    await navigationBar.getByRole('link', { name: link.name }).click();
    await page.waitForTimeout(8000);
    await page.goto(link.href);
  }
});

test.describe('access to monitor information', () => {
  test('monitors directory navigation from modal', async ({ page }) => {
    await page.goto('/');
    const navigationBar = page.getByTestId('main-navigation');
    await navigationBar.getByRole('link', { name: 'Map' }).click();
    await page.waitForTimeout(8000);
    await page.goto('/map');
    await page.waitForTimeout(8000);
    // const { data: monitors } = useMonitors();
    // const monitorsIds = monitors.map((monitor) => monitor.id);

    // check the list of monitors is visible
    const monitorsList = page.getByTestId('monitors-list');
    await page.waitForTimeout(8000);
    await expect(monitorsList).toBeVisible();
    const monitorsIds = ['m1', 'm2'];

    for (const id of monitorsIds) {
      const navigationBar = page.getByTestId(id);
      await navigationBar.click();
      await page.waitForTimeout(8000);
      await page.goto(`/map/${id}/datasets`);
    }
  });

  test('monitors directory navigation from button in sidebar', async ({ page }) => {
    await page.goto('/map/m1/datasets');
    await page.waitForTimeout(300);
    // const { data: monitors } = useMonitors();
    // const monitorsIds = monitors.map((monitor) => monitor.id);
    const monitorsDirectoryTrigger = page.getByTestId('monitors-directory-trigger');
    await monitorsDirectoryTrigger.click();
    await page.waitForTimeout(300);

    // check the list of monitors is visible
    const monitorsList = page.getByTestId('monitors-list');
    await expect(monitorsList).toBeVisible();
    const monitorsIds = ['m1', 'm2'];

    for (const id of monitorsIds) {
      const monitorTrigger = page.getByTestId(id);
      await monitorTrigger.click();
      await page.waitForTimeout(8000);
      await page.goto(`/map/${id}/datasets`);
      await page.waitForTimeout(8000);
      await expect(monitorsList).toBeVisible();
    }
  });
});
