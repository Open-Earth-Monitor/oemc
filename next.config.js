/**
 * @type { import('next').NextConfig }
 */

/**
 * Host the geostory covers are served from (see `getGeostoryImageUrl`). Read from
 * the env so a preview pointed at another media server is still allowed by the
 * image optimizer; falls back to production.
 */
const mediaHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_IMAGES_URL || 'https://api.earthmonitor.org')
      .hostname;
  } catch {
    return 'api.earthmonitor.org';
  }
})();

const nextConfig = {
  reactStrictMode: false,
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  poweredByHeader: false,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    // Geostory covers come from the API as multi-megabyte JPEGs (one is 23 MiB)
    // and are shown at 79px; Fosstodon avatars and previews are 400px+ shown at
    // 56px. Letting Next resize and re-encode them is the single biggest saving
    // on the landing page, so the optimizer stays on.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: mediaHost,
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fosstodon.org',
      },
      {
        protocol: 'https',
        hostname: 'fosstodon.org',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mstdn.social',
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // Covers and avatars change rarely; keep the optimized variants for 30 days
    // rather than the default 4 hours so repeat loads never hit the origin.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  output: 'standalone',
  transpilePackages: ['ol'],
};

module.exports = nextConfig;
