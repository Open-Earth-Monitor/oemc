/**
 * @type { import('next').NextConfig }
 */

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
        hostname: 'api.earthmonitor.org',
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
