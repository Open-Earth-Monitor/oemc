import { NextResponse, type NextRequest } from 'next/server';

/**
 * Same-origin proxy for Zenodo's records search.
 *
 * The browser cannot call `zenodo.org/api` directly: its responses carry no
 * `Access-Control-Allow-Origin`, so the publications list lost every Zenodo
 * record and logged a CORS error on each landing load. Fetching from the server
 * sidesteps that, and one cached copy is shared by every visitor instead of
 * each of them hitting Zenodo's rate-limited API.
 *
 * Only the query parameters the app uses are forwarded, so this is not an open
 * proxy to the rest of the Zenodo API.
 */
const ZENODO_RECORDS_URL = 'https://zenodo.org/api/records';

const FORWARDED_PARAMS = ['communities', 'sort', 'size', 'page', 'q'] as const;

/** Publications change a few times a year; a quarter of an hour is plenty fresh. */
const REVALIDATE_SECONDS = 60 * 15;

export async function GET(request: NextRequest) {
  const upstream = new URL(ZENODO_RECORDS_URL);
  for (const name of FORWARDED_PARAMS) {
    const value = request.nextUrl.searchParams.get(name);
    if (value !== null) upstream.searchParams.set(name, value);
  }

  try {
    const response = await fetch(upstream, {
      headers: { Accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Zenodo responded ${response.status}` },
        { status: response.status === 429 ? 503 : 502 }
      );
    }

    const data: unknown = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${
          REVALIDATE_SECONDS * 4
        }`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Zenodo is unreachable' }, { status: 502 });
  }
}
