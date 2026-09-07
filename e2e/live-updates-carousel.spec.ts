import { test, expect } from '@playwright/test';

const ACCOUNT = {
  id: '323362',
  username: 'opengeohub',
  display_name: 'OpenGeoHub Foundation',
  avatar_static:
    'https://cdn.fosstodon.org/accounts/avatars/000/323/362/original/543a7ca78e34108f.png',
};

const CARD_URL =
  'https://www.eventbrite.nl/e/integrated-modeling-of-soil-vegetation-hydrology-dynamics-tickets-1999483863059';

/** A post that shares a link: Fosstodon attaches a preview card with its url. */
const POST_WITH_CARD = {
  id: '117201254759817765',
  created_at: '2026-09-02T11:40:24.243Z',
  url: 'https://fosstodon.org/@opengeohub/117201254759817765',
  content: `<p>We are organizing a 60 mins webinar <a href="${CARD_URL}" target="_blank" rel="nofollow noopener">eventbrite.nl</a> funded by <span class="h-card"><a href="https://ec.social-network.europa.eu/@REA" class="u-url mention">@<span>REA</span></a></span></p>`,
  account: ACCOUNT,
  media_attachments: [],
  reblog: null,
  card: {
    url: CARD_URL,
    title: 'Integrated modeling of soil-vegetation-hydrology dynamics',
    description: 'Explore state-of-the-art integrated soil, vegetation, and hydrology modelling.',
  },
};

/** A boost: the wrapper is empty and points at an `/activity` address. */
const BOOST = {
  id: '117201534731375978',
  created_at: '2026-09-02T12:51:36.269Z',
  url: 'https://fosstodon.org/users/opengeohub/statuses/117201534731375978/activity',
  content: '',
  account: ACCOUNT,
  media_attachments: [],
  card: null,
  reblog: { ...POST_WITH_CARD, id: '117201254759817700' },
};

/** Images only, no preview card: the card can only lead to the post itself. */
const POST_WITH_MEDIA = {
  id: '117168002951395620',
  created_at: '2026-08-27T14:44:01.913Z',
  url: 'https://fosstodon.org/@opengeohub/117168002951395620',
  content: '<p>Last days to get your ticket for the Global Workshop!</p>',
  account: ACCOUNT,
  media_attachments: [
    {
      preview_url:
        'https://cdn.fosstodon.org/media_attachments/files/117/168/000/218/687/165/small/645fdf5167cdd4a2.png',
      description: 'Last call OEMC conference',
      meta: { small: { width: 480, height: 480 } },
    },
  ],
  reblog: null,
  card: null,
};

/** Filler so the dot strip has more dots than the six it shows at once. */
const FILLER = Array.from({ length: 6 }, (_, index) => ({
  ...POST_WITH_MEDIA,
  id: `11700000000000000${index}`,
  created_at: `2026-08-${String(20 - index).padStart(2, '0')}T10:00:00.000Z`,
  url: `https://fosstodon.org/@opengeohub/11700000000000000${index}`,
}));

// Newest first, as the feed sorts them. The boosted status is not itself in the
// list, so the boost is kept (the feed drops a boost whose original it already
// shows).
const POSTS = [BOOST, POST_WITH_MEDIA, ...FILLER];

test.describe('live updates carousel', () => {
  test.beforeEach(async ({ page }) => {
    // Cross-origin stub, so it must send the CORS header the real API sends.
    await page.route('**/fosstodon.org/api/v1/accounts/**/statuses**', (route) =>
      route.fulfill({ json: POSTS, headers: { 'Access-Control-Allow-Origin': '*' } })
    );
    await page.goto('/', { waitUntil: 'load' });
    await expect(page.getByTestId('live-updates-post').first()).toBeVisible();
  });

  test('a boosted post with a link preview opens the shared page in a new tab', async ({
    page,
  }) => {
    const first = page.getByTestId('live-updates-post').first();

    // Read from the boosted status, not the wrapper's `/activity` address.
    await expect(first).toHaveAttribute('href', CARD_URL);
    await expect(first).toHaveAttribute('target', '_blank');
    await expect(first).toHaveAttribute('rel', /noopener/);
  });

  test('a post without a link preview opens the post itself', async ({ page }) => {
    const second = page.getByTestId('live-updates-post').nth(1);

    await expect(second).toHaveAttribute('href', POST_WITH_MEDIA.url);
  });

  test('a card does not nest links inside itself', async ({ page }) => {
    const first = page.getByTestId('live-updates-post').first();

    // The preview description shows instead of the body, and the body's own
    // links would have been flattened anyway: the card is the only `<a>`.
    await expect(first.locator('a')).toHaveCount(0);
  });

  test('"Read more" on the live updates page follows the same link', async ({ page }) => {
    await page.goto('/usage-stats', { waitUntil: 'load' });

    const readMore = page.getByRole('link', { name: 'Read more' });
    await expect(readMore.first()).toBeVisible();

    // The boost used to link to its wrapper's `/activity` address.
    await expect(readMore.first()).toHaveAttribute('href', CARD_URL);
    await expect(readMore.nth(1)).toHaveAttribute('href', POST_WITH_MEDIA.url);
  });

  test('the dot strip is centred between the arrows and shows whole dots', async ({ page }) => {
    // The feed panel slides in for 700ms after load. Boxes read while it moves
    // disagree with each other, so wait for every finite animation to finish
    // and then take all the rectangles in a single call, from the same frame.
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((a) => a.effect?.getTiming().iterations !== Infinity)
          .map((a) => a.finished)
      )
    );

    const { prevBox, nextBox, stripBox, boxes } = await page.evaluate(() => {
      const rect = (el: Element | null) => el?.getBoundingClientRect().toJSON() as DOMRect;
      const strip = document.querySelector('[data-testid="live-updates-dots"]');
      return {
        prevBox: rect(document.querySelector('button[aria-label="Previous Slide"]')),
        nextBox: rect(document.querySelector('button[aria-label="Next Slide"]')),
        stripBox: rect(strip),
        boxes: Array.from(strip?.querySelectorAll('button') ?? []).map(rect),
      };
    });

    // Centred in the gap left between the two arrow buttons.
    const gapCentre = (prevBox.x + prevBox.width + nextBox.x) / 2;
    expect(Math.abs(stripBox.x + stripBox.width / 2 - gapCentre)).toBeLessThanOrEqual(1);

    // Six dots are inside the strip, every one of them whole: none is cut at the
    // edge by a strip narrower than the dots it holds.
    const inside = boxes.filter(
      (b) => b.right > stripBox.x && b.left < stripBox.x + stripBox.width
    );

    expect(inside).toHaveLength(6);
    for (const box of inside) {
      expect(box.left).toBeGreaterThanOrEqual(stripBox.x);
      expect(box.right).toBeLessThanOrEqual(stripBox.x + stripBox.width);
    }
  });
});
