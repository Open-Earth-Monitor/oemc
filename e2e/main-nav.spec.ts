import { test, expect } from '@playwright/test';

import { useMonitors } from '@/hooks/monitors';

import { navLinks } from 'components/header';
test('test main navigation', async ({ page }) => {
  await page.goto('/');

  const navigationBar = page.getByTestId('main-navigation');
  for (const link of navLinks) {
    await navigationBar.getByRole('link', { name: link.name }).click();
    await page.waitForTimeout(8000);
    await page.goto(link.href);
  }
});

test('monitors directory navigation', async ({ page }) => {
  await page.goto('/map');
  // const { data: monitors } = useMonitors();
  // const monitorsIds = monitors.map((monitor) => monitor.id);
  const monitorsIds = ['m1', 'm2'];

  for (const id of monitorsIds) {
    const navigationBar = page.getByTestId(id);
    await navigationBar.getByRole('link', { name: id }).click();

    await navigationBar.click();
    await page.waitForTimeout(8000);
    await page.goto(`/map/${id}/datasets`);
  }
});
