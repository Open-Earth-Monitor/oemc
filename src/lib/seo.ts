/**
 * Centralized SEO configuration and helpers.
 *
 * The canonical site URL is environment-driven so staging and production can
 * each advertise their own absolute URLs (metadataBase, canonicals, sitemap,
 * Open Graph). Set `NEXT_PUBLIC_SITE_URL` per environment; the fallback is the
 * current dev deployment.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://app-dev.earthmonitor.org'
).replace(/\/$/, '');

export const SITE_NAME = 'Open Earth Monitor Cyberinfrastructure';

export const DEFAULT_TITLE =
  'Open-Earth-Monitor project – A cyberinfrastructure to accelerate uptake of environmental information';

export const DEFAULT_DESCRIPTION =
  'It supports sustainable land management, ecological monitoring, and spatial modeling through standardized, ready-to-use geospatial layers. The most extensive version of the data is hosted on OpenLandMap.org, while a selection of layers that can support on‑the‑ground activities / serving specific OEMC use‑cases and partner organizations, will be made available in combination with other layers from Tier 2 stream.';

/** Build an absolute URL from a site-relative path. */
export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Serialize an object to a JSON-LD string safe to embed in a <script> tag.
 * Escaping `<` prevents a `</script>` sequence in the data from breaking out
 * of the script element (the main XSS vector for inline JSON-LD).
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * Trim a (possibly long, possibly HTML-ish) string to a meta-description-safe
 * length, collapsing whitespace and adding an ellipsis when truncated.
 */
export const truncateForMeta = (text: string | undefined | null, max = 160): string => {
  if (!text) return DEFAULT_DESCRIPTION;
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
};
