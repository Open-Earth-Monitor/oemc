import { test } from '@playwright/test';

import { navLinks } from 'components/main-menu/constants';

test('pages navigation', async ({ page }) => {
  await page.goto('/');

  const navigationBar = page.getByTestId('main-navigation');

  for (const link of navLinks) {
    await navigationBar.getByTestId(link['data-testid']).click();
    if (link.target !== '_blank') await page.waitForURL('**' + link.href);
  }
});
