import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
});

const socialLinks = [
  {
    test: 'twitter-link',
    href: 'https://twitter.com/i/flow/login?redirect_after_login=%2FEarthMonitorOrg',
  },
  // mastodon: '',
  { test: 'github-link', href: 'https://github.com/Open-Earth-Monitor' },
  // { test: 'tib-link', href: 'https://av.tib.eu/publisher/OpenGeoHub_Foundation' },
  { test: 'linkedin-link', href: 'https://www.linkedin.com/in/opengeohub]' },
];

test.describe('external links', () => {
  test('links to social media', async ({ page }) => {
    for (const link of socialLinks) {
      const Link = page.getByTestId(link['test']);
      await Link.click();
      await page.waitForURL(link.href);
    }
  });

  test('OEMC factsheet', async ({ page }) => {
    const OEMCFactsheet = page.getByTestId('OEMC-factsheet-link');
    await OEMCFactsheet.click();
    await page.waitForURL('https://cordis.europa.eu/project/id/101059548');
  });

  test('OEMC contact us', async ({ page }) => {
    const OEMCFactsheet = page.getByTestId('contact-link');
    await OEMCFactsheet.click();
    await page.waitForURL('https://earthmonitor.org/contact-us/');
  });

  test('OEMC privacy policy', async ({ page }) => {
    const OEMCFactsheet = page.getByTestId('privacy-policy-link');
    await OEMCFactsheet.click();
    await page.waitForURL('https://earthmonitor.org/privacy-policy/');
  });
});

test('Disclaimer', async ({ page }) => {
  const disclaimerTrigger = page.getByTestId('disclaimer');
  await disclaimerTrigger.click();
  await expect(page.getByTestId('disclaimer-content')).toBeVisible();
});
