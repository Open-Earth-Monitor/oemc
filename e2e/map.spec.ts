import { test, expect } from '@playwright/test';

test('legend', async ({ page }) => {
  // assuming layer_id l1 is a valid layer already added to the map
  await page.goto('/map/m1/datasets?layers=[{"id":"l1","opacity":1,"date":"20000101_20001231"}]', {
    waitUntil: 'load',
  });
  await page.waitForResponse('https://api.earthmonitor.org/layers?layer_id=l1');
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
      /layers=%5B%7B%22id%22%3A%22l1%22%2C%22opacity%22%3A0%2C%22date%22%3A%2220000101_20001231%22%7D%5D/,
      'g'
    )
  );
  await page.getByTestId('map-legend-item').getByTestId('layer-visibility').first().click();
  await expect(
    page.getByTestId('map-legend-item').getByTestId('layer-visibility').first()
  ).toHaveAttribute('data-active', 'true');
  await expect(page).toHaveURL(
    new RegExp(
      /layers=%5B%7B%22id%22%3A%22l1%22%2C%22opacity%22%3A1%2C%22date%22%3A%2220000101_20001231%22%7D%5D/,
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
