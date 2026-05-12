import { test, expect, devices, type Page } from '@playwright/test';

const VIEWPORTS = [
  { name: 'iPhone SE', ...devices['iPhone SE'] },
  { name: 'iPhone 14 Pro', ...devices['iPhone 14 Pro'] },
  { name: 'Pixel 7', ...devices['Pixel 7'] },
  { name: 'tablet', viewport: { width: 768, height: 1024 } },
  { name: 'small laptop (< xl)', viewport: { width: 1100, height: 800 } },
];

async function waitForLandingReady(page: Page) {
  // Mobile landing renders only the globe + drawer triggers — no
  // `featured-geostories-count`. Wait on the trigger we're about to click.
  await page
    .getByTestId('mobile-geostories-trigger')
    .waitFor({ state: 'visible', timeout: 30000 });
}

type Rect = { top: number; bottom: number; height: number };

async function rectOf(page: Page, testId: string): Promise<Rect> {
  return page.getByTestId(testId).evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height };
  });
}

/** Wait for vaul's slide-up animation to settle, i.e. the rect stops moving. */
async function waitForRectToSettle(page: Page, testId: string) {
  await expect
    .poll(
      async () => {
        const a = await rectOf(page, testId);
        await page.waitForTimeout(80);
        const b = await rectOf(page, testId);
        return Math.abs(a.top - b.top) + Math.abs(a.bottom - b.bottom);
      },
      { timeout: 5000, intervals: [100, 150, 200] }
    )
    .toBeLessThan(0.5);
}

test.describe('landing — mobile drawer height', () => {
  test.describe.configure({ timeout: 60_000 });

  for (const v of VIEWPORTS) {
    test(`geostories drawer opens below the header (${v.name})`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: v.viewport,
        userAgent: v.userAgent,
        deviceScaleFactor: v.deviceScaleFactor,
        isMobile: v.isMobile,
        hasTouch: v.hasTouch,
      });
      const page = await context.newPage();
      await page.goto('/', { waitUntil: 'load' });
      await waitForLandingReady(page);

      const headerBox = await page.locator('header').first().evaluate((el) =>
        el.getBoundingClientRect().toJSON()
      );

      const trigger = page.getByTestId('mobile-geostories-trigger');
      await expect(trigger).toBeVisible();
      await trigger.click();

      const drawer = page.getByTestId('mobile-geostories-drawer');
      await expect(drawer).toBeVisible();
      await waitForRectToSettle(page, 'mobile-geostories-drawer');

      // Measure the visible drawer-header (top of the content the user sees)
      // rather than the outer drawer wrapper — vaul may inflate the wrapper's
      // box past the visible top.
      const visibleTopBox = await drawer.locator('[data-slot="drawer-header"]').evaluate((el) =>
        el.getBoundingClientRect().toJSON()
      );

      // Drawer's visible top edge must sit at or below the header's bottom.
      expect(visibleTopBox.top).toBeGreaterThanOrEqual(headerBox.bottom);

      await context.close();
    });
  }

  test('live updates drawer opens below the header', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 14 Pro'] });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'load' });
    await waitForLandingReady(page);

    const headerBox = await page.locator('header').first().evaluate((el) =>
      el.getBoundingClientRect().toJSON()
    );

    const trigger = page.getByTestId('mobile-live-updates-trigger');
    await expect(trigger).toBeVisible();
    await trigger.click();

    const drawer = page.getByTestId('mobile-live-updates-drawer');
    await expect(drawer).toBeVisible();
    await waitForRectToSettle(page, 'mobile-live-updates-drawer');

    const visibleTopBox = await drawer.locator('[data-slot="drawer-header"]').evaluate((el) =>
      el.getBoundingClientRect().toJSON()
    );
    expect(visibleTopBox.top).toBeGreaterThanOrEqual(headerBox.bottom);

    await context.close();
  });

  test('both mobile drawer triggers expose an accessible name', async ({ browser }) => {
    const context = await browser.newContext({ ...devices['iPhone 14 Pro'] });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'load' });
    await waitForLandingReady(page);

    await expect(page.getByTestId('mobile-geostories-trigger')).toHaveAttribute(
      'aria-label',
      'Open geostories list'
    );
    await expect(page.getByTestId('mobile-live-updates-trigger')).toHaveAttribute(
      'aria-label',
      'Open live updates feed'
    );

    await context.close();
  });
});
