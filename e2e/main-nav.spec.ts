import { test } from '@playwright/test';

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
