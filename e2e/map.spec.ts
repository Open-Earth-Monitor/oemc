import { test, expect } from '@playwright/test';

test('legend', async ({ page }) => {
  // assuming layer_id l1 is a valid layer already added to the map
  await page.goto('/map/m1/datasets?layers=[{"id":"l1","opacity":1,"date":"20000101_20001231"}]', {
    waitUntil: 'load',
  });
  await page.waitForResponse('https://g3w.earthmonitor.org/dev
/layers?layer_id=l1');
  await expect(page.getByTestId('map-legend')).toBeVisible();

  // should be 1 layer in the legend
  expect(await page.getByTestId('map-legend-item').count()).toBe(1);

  // legend actions
  await expect(page.getByTestId('map-legend-item-toolbar')).toBeVisible();
  // toggle visibility
  await page.getByTestId('map-legend-item').getByTestId('layer-visibility').first().click();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'false');
  await expect(page).toHaveURL(
    new RegExp(
      /layers=\[{%22id%22:%22l1%22,%22opacity%22:0,%22date%22:%2220000101_20001231%22}\]/,
      'gi'
    )
  );
  await page.getByTestId('map-legend-item').getByTestId('layer-visibility').first().click();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');
  await expect(page).toHaveURL(
    new RegExp(
      /layers=\[{%22id%22:%22l1%22,%22opacity%22:1,%22date%22:%2220000101_20001231%22}\]/,
      'g'
    )
  );
  // opacity
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-opacity-button')
  ).toBeVisible();
});

test('opacity 1 from url', async ({ page }) => {
  // assuming layer_id l1 is a valid layer already added to the map
  await page.goto('/map/m1/datasets?layers=[{"id":"l1","opacity":1,"date":"20000101_20001231"}]', {
    waitUntil: 'load',
  });
  await expect(page.getByTestId('map-legend')).toBeVisible();

  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');

  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-opacity-button')
  ).toBeVisible();
  await page.getByTestId('map-legend-item').getByTestId('layer-opacity-button').click();
  await expect(page.getByTestId('slider-current-value')).toHaveText('100%');
});

test('opacity 0 from url', async ({ page }) => {
  // assuming layer_id l1 is a valid layer already added to the map
  await page.goto('/map/m1/datasets?layers=[{"id":"l1","opacity":0,"date":"20000101_20001231"}]', {
    waitUntil: 'load',
  });
  await expect(page.getByTestId('map-legend')).toBeVisible();

  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'false');

  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-opacity-button')
  ).toBeVisible();
  await page.getByTestId('map-legend-item').getByTestId('layer-opacity-button').click();
  await expect(page.getByTestId('slider-current-value')).toHaveText('0%');
});

test('opacity 0.5 from url', async ({ page }) => {
  // assuming layer_id l1 is a valid layer already added to the map
  await page.goto(
    '/map/m1/datasets?layers=[{"id":"l1","opacity":0.5,"date":"20000101_20001231"}]',
    { waitUntil: 'load' }
  );
  await expect(page.getByTestId('map-legend')).toBeVisible();

  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');

  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-opacity-button')
  ).toBeVisible();
  await page.getByTestId('map-legend-item').getByTestId('layer-opacity-button').click();
  await expect(page.getByTestId('slider-current-value')).toHaveText('50%');
});

test.describe('general information in map page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map/m1/datasets', { waitUntil: 'load' });
  });

  test('attributtions', async ({ page }) => {
    await page.goto('/map/m1/datasets', { waitUntil: 'load' });
    const attributions = page.getByTestId('attributions');
    await expect(attributions).toBeVisible();
    await attributions.click();

    const attributionsContent = page.getByTestId('attributions-content');
    await expect(attributionsContent).toBeVisible();
    await expect(attributionsContent).toHaveText(
      "This project has received funding from the European Union's Horizon Europe research and innovation programme under grant agreement No. 101059548."
    );
  });

  test('disclaimer', async ({ page }) => {
    await page.goto('/map/m1/datasets', { waitUntil: 'load' });
    const disclaimer = page.getByTestId('disclaimer');
    await expect(disclaimer).toBeVisible();
    await disclaimer.click();

    const disclaimerContent = page.getByTestId('disclaimer-content');
    await expect(disclaimerContent).toBeVisible();
    await expect(page.getByTestId('disclaimer-content-1')).toHaveText(
      'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or European Commission.'
    );
    await expect(page.getByTestId('disclaimer-content-2')).toHaveText(
      'Neither the European Union nor the granting authority can be held responsible for them. The data is provided “as is”. Open-Earth-Monitor Cyberinfrastructure (OEMC) project consortium and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement.'
    );
    await expect(page.getByTestId('disclaimer-content-3')).toHaveText(
      'Neither OEMC project Consortium nor its suppliers and licensors, makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, the Website at your own discretion and risk.'
    );
  });

  test('OEMC contact us', async ({ page }) => {
    await page.goto('/map/m1/datasets', { waitUntil: 'load' });

    const contactUs = page.getByTestId('contact-link');
    await contactUs.click();
    await expect(contactUs).toHaveAttribute('href', 'https://earthmonitor.org/contact-us/');
  });

  test('OEMC privacy policy', async ({ page }) => {
    const privacyPolicy = page.getByTestId('privacy-policy-link');
    await privacyPolicy.click();
    await expect(privacyPolicy).toHaveAttribute('href', 'https://earthmonitor.org/privacy-policy/');
  });
});

test.describe('social media', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/map/m1/datasets', { waitUntil: 'load' });
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
