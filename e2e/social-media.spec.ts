import { test, expect } from '@playwright/test';

test.describe('social media', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const socialMedia = page.getByTestId('social-media');
    await socialMedia.click();
  });
  test('twitter', async ({ page }) => {
    const twitterLink = page.getByTestId('twitter-link');
    await expect(twitterLink).toHaveAttribute('href', `https://twitter.com/EarthMonitorOrg`);
  });
  test('linkedin', async ({ page }) => {
    const linkedinLink = page.getByTestId('linkedin-link');
    await expect(linkedinLink).toHaveAttribute('href', `https://www.linkedin.com/in/opengeohub`);
  });
  test('github', async ({ page }) => {
    const githubLink = page.getByTestId('github-link');
    await expect(githubLink).toHaveAttribute('href', `https://github.com/Open-Earth-Monitor`);
  });
  test('tib', async ({ page }) => {
    const tibLink = page.getByTestId('tib-link');
    await expect(tibLink).toHaveAttribute(
      'href',
      `https://av.tib.eu/publisher/OpenGeoHub_Foundation`
    );
  });
});
