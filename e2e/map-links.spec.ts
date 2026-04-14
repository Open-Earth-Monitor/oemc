import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/explore', { waitUntil: 'load' });
});

test.describe('external links', () => {
  test('OEMC disclaimer', async ({ page }) => {
    const disclaimerButton = page.getByTestId('disclaimer-link');
    await disclaimerButton.click();
    // ensure a dialog is opened
    await page.waitForSelector('div[role="dialog"]');
  });

  test('OEMC contact us', async ({ page }) => {
    const contactLink = page.getByTestId('contact-link');
    const href = await contactLink.getAttribute('href');
    expect(href).toBe('https://earthmonitor.org/contact-us/');
  });

  test('OEMC privacy policy', async ({ page }) => {
    const privacyPolicyLink = page.getByTestId('privacy-policy-link');
    const href = await privacyPolicyLink.getAttribute('href');
    expect(href).toBe('https://earthmonitor.org/privacy-policy/');
  });
});
