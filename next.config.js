/**
 * @type { import('next').NextConfig }
 */

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  poweredByHeader: false,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.fosstodon.org',
      },
      {
        protocol: 'http',
        hostname: '0.0.0.0',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mstdn.social',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['ol'],
};

module.exports = nextConfig;
