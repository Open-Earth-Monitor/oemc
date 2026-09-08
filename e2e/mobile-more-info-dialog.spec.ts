import { test, expect, devices, type Page } from '@playwright/test';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MONITOR_M1 = {
  id: 'm1',
  title: 'Forest Monitor',
  author: '',
  coverage: 'Global',
  date_created: '2020-01-01',
  description: 'A monitor.',
  geostories: [],
  entity_type: 'monitor',
  ready: true,
  metadata_url: '',
  notebooks_url: '',
  publications: [],
  // As the API sends them: a DOI not yet minted comes as an empty string, and
  // a minted one comes as the bare code with its resolver link in `url`.
  use_case_link: [
    { title: 'Crop yield monitoring tools for Africa', url: null, doi: [''] },
    {
      title: 'Tools for Digitalisation of Agriculture in Ethiopia',
      url: 'https://doi.org/10.60566/ptm29-yhr16',
      doi: ['10.60566/ptm29-yhr16'],
    },
    // A web page, no DOI at all: a plain link, never a badge.
    {
      title: 'Drought Monitoring at high resolution throughout Italy',
      url: 'https://earthmonitor.org/drought-monitoring-at-high-resolution-throughout-italy/',
    },
  ],
  monitor_bbox: [-25, 24, 45, 72],
  theme: 'Forest',
  responsible_partner_name: 'OpenGeoHub',
  responsible_partner_url: 'https://opengeohub.org',
};

async function mockMonitor(page: Page) {
  await page.route(new RegExp(`${API_URL}/layers`), (route) => route.fulfill({ json: [] }));
  await page.route(new RegExp(`${API_URL}/monitors/m1/layers`), (route) =>
    route.fulfill({ json: [] })
  );
  await page.route(new RegExp(`${API_URL}/monitors/m1/geostories`), (route) =>
    route.fulfill({ json: [] })
  );
  await page.route(new RegExp(`${API_URL}/monitors/m1$`), (route) =>
    route.fulfill({ json: [MONITOR_M1] })
  );
}

test.use({ ...devices['Pixel 7'] });

test.describe('map page on phones — "More info" dialog', () => {
  test('has a visible close button that closes it', async ({ page }) => {
    await mockMonitor(page);
    await page.goto('/explore/monitor/m1', { waitUntil: 'load' });

    await page.locator('[data-testid^="card-button-"]:visible').first().click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    // Use cases. A minted DOI is a badge linking to the resolver, not a plain
    // publication link; a blank DOI shows only the title; a web address is a
    // plain link and never a badge.
    const minted = dialog.getByText('Tools for Digitalisation of Agriculture in Ethiopia');
    await expect(minted).toBeVisible();
    await expect(minted.locator('xpath=ancestor::a')).toHaveCount(0);
    await expect(
      dialog.getByRole('link', { name: /DOI\s*10\.60566\/ptm29-yhr16/ })
    ).toHaveAttribute('href', 'https://doi.org/10.60566/ptm29-yhr16');

    await expect(dialog.getByText('Crop yield monitoring tools for Africa')).toBeVisible();

    await expect(
      dialog.getByRole('link', { name: 'Drought Monitoring at high resolution throughout Italy' })
    ).toHaveAttribute(
      'href',
      'https://earthmonitor.org/drought-monitoring-at-high-resolution-throughout-italy/'
    );

    // Exactly one badge in the whole dialog.
    await expect(dialog.getByRole('link', { name: /^DOI/ })).toHaveCount(1);

    // A phone has no Escape key and the dialog fills the screen, so the button
    // is the only way out. It used to have no visible content at all.
    const close = dialog.getByRole('button', { name: 'Close' });
    await expect(close).toBeVisible();
    // The dialog zooms in from 95%; measure once that has finished.
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .map((a) => a.finished)
      )
    );
    const box = await close.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(24);
    expect(box.height).toBeGreaterThanOrEqual(24);

    await close.click();
    await expect(dialog).toHaveCount(0);
  });
});
