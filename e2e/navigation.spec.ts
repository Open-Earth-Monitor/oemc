import { expect, test } from '@playwright/test';

import { navLinks, navSubLinksCommunity, otherResources } from 'components/main-menu/constants';

// Helper: open the main-menu popover. Uses .first() because /explore renders
// multiple Header instances, each containing a MainMenuDesktop trigger.
const openMenu = async (page: import('@playwright/test').Page) => {
  const trigger = page.getByTestId('main-navigation-trigger').first();
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(page.getByTestId('main-navigation')).toBeVisible();
};

// ─── Presence across routes ───────────────────────────────────────────────────

test.describe('main menu trigger is present on key pages', () => {
  for (const path of ['/', '/explore', '/usage-stats']) {
    test(`visible on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'load' });
      await expect(page.getByTestId('main-navigation-trigger').first()).toBeVisible();
    });
  }
});

// ─── Nav links (Home, Explore Data) ──────────────────────────────────────────

test.describe('main navigation links', () => {
  const expectedRoutes: Record<string, string> = {
    'home-link': '/',
    'explore-data-link': '/explore',
  };

  for (const link of navLinks) {
    const testId = link['data-testid'];
    const expectedPath = expectedRoutes[testId];

    test(`"${link.name}" navigates to ${expectedPath}`, async ({ page }) => {
      await page.goto('/');
      await openMenu(page);

      await page.getByTestId('main-navigation').getByTestId(testId).click();
      await page.waitForURL(expectedPath === '/' ? /\/$/ : new RegExp(`${expectedPath}(/|$)`));
      await expect(page).toHaveURL(
        expectedPath === '/' ? /\/$/ : new RegExp(`${expectedPath}(/|$)`)
      );
    });
  }
});

// ─── Community external links ─────────────────────────────────────────────────

test.describe('community navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await openMenu(page);
    // Expand the community collapsible
    await page.getByRole('button', { name: /community/i }).click();
    await expect(page.getByTestId('community-navigation')).toBeVisible();
  });

  test('renders all community links with correct hrefs and target="_blank"', async ({ page }) => {
    const communityNav = page.getByTestId('community-navigation');

    const expectedLinks: Record<string, string> = {
      'data-catalogue-link': 'https://zenodo.org/communities/oemc-project/',
      'project-site-link': 'https://earthmonitor.org/',
      'developers-link': 'https://github.com/Open-Earth-Monitor',
    };

    for (const link of navSubLinksCommunity) {
      const testId = link['data-testid'];
      const locator = communityNav.getByTestId(testId);
      await expect(locator).toBeVisible();
      await expect(locator).toHaveAttribute('href', expectedLinks[testId]);
      await expect(locator).toHaveAttribute('target', '_blank');
    }
  });
});

// ─── Other resources ─────────────────────────────────────────────────────────

test.describe('other resources links', () => {
  const internalResources = otherResources.filter((r) => r.href.startsWith('/'));
  const externalResources = otherResources.filter((r) => r.href.startsWith('http'));

  for (const resource of internalResources) {
    test(`"${resource.name}" navigates to ${resource.href}`, async ({ page }) => {
      await page.goto('/');
      await openMenu(page);

      const link = page.getByTestId(resource['data-testid']);
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL(new RegExp(`${resource.href}(/|$)`));
    });
  }

  test('external links have correct hrefs', async ({ page }) => {
    await page.goto('/');
    await openMenu(page);

    for (const resource of externalResources) {
      const link = page.getByTestId(resource['data-testid']);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', resource.href);
    }
  });
});
