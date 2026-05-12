import { test, expect, devices, type BrowserContextOptions, type Page } from '@playwright/test';

type ViewportCase = { name: string; context: BrowserContextOptions };

const VIEWPORTS: ViewportCase[] = [
  { name: 'iPhone SE', context: devices['iPhone SE'] },
  { name: 'iPhone 14 Pro', context: devices['iPhone 14 Pro'] },
  { name: 'Pixel 7', context: devices['Pixel 7'] },
  { name: 'tablet', context: { viewport: { width: 768, height: 1024 } } },
  { name: 'small laptop (< xl)', context: { viewport: { width: 1100, height: 800 } } },
];

async function waitForLandingReady(page: Page) {
  // Mobile landing renders only the globe + drawer triggers — no
  // `featured-geostories-count`. Wait on the trigger we're about to click.
  await page
    .getByTestId('mobile-geostories-trigger')
    .waitFor({ state: 'visible', timeout: 30000 });
}

/**
 * Poll until the drawer's visible top edge (the inner drawer-header) sits at
 * or below `floor`. Vaul slides the drawer up from the bottom and the rect
 * continues moving while async content lays out inside, so polling the
 * invariant directly is more robust than waiting for the rect to "settle"
 * on slow CI runners.
 */
async function expectDrawerBelow(page: Page, drawerTestId: string, floor: number) {
  await expect
    .poll(
      () =>
        page
          .getByTestId(drawerTestId)
          .locator('[data-slot="drawer-header"]')
          .evaluate((el) => el.getBoundingClientRect().top),
      { timeout: 15_000, intervals: [100, 200, 400, 800] }
    )
    .toBeGreaterThanOrEqual(floor);
}

test.describe('landing — mobile drawer height', () => {
  test.describe.configure({ timeout: 60_000 });

  for (const v of VIEWPORTS) {
    test(`geostories drawer opens below the header (${v.name})`, async ({ browser }) => {
      const context = await browser.newContext(v.context);
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

      // Drawer's visible top edge must settle at or below the header's bottom.
      // The drawer-header is the first visible element to the user — measuring
      // the outer wrapper would include vaul's offscreen slide region.
      await expectDrawerBelow(page, 'mobile-geostories-drawer', headerBox.bottom);

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

    await expectDrawerBelow(page, 'mobile-live-updates-drawer', headerBox.bottom);

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
