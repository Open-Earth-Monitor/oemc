import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

const socialLinks = [
  {
    test: 'twitter-link',
    href: 'https://twitter.com/EarthMonitorOrg',
  },
  { test: 'github-link', href: 'https://github.com/Open-Earth-Monitor' },
  { test: 'tib-link', href: 'https://av.tib.eu/publisher/OpenGeoHub_Foundation' },
  { test: 'linkedin-link', href: 'https://www.linkedin.com/in/opengeohub' },
];

test.describe('external links', () => {
  test('links to social media', async ({ page }) => {
    for (const link of socialLinks) {
      const Link = page.getByTestId(link['test']);
      const href = await Link.getAttribute('href');
      expect(href).toBe(link['href']);
    }
  });
});
