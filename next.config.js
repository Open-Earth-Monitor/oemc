/**
 * @type { import('next').NextConfig }
 */

const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // ? https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
  poweredByHeader: false,
  env: {
    API_URL: process.env.API_URL || 'https://api.earthmonitor.org/',
  },
};

module.exports = nextConfig;
