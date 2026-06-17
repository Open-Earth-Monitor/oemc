import { Metadata } from 'next';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  absoluteUrl,
  serializeJsonLd,
} from '@/lib/seo';

import Providers from '@/utils/providers';

// Styles
import '@/styles/globals.css';
import 'ol/ol.css';

import LayoutClient from './layout-client';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  weight: ['400', '500'],
  style: ['normal'],
  display: 'block',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  keywords: ['Open Earth Monitor', 'Cyberinfrastructure', 'Geostories', 'Monitors'],
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': absoluteUrl('/#organization') },
    },
  ],
};

const satoshi = localFont({
  variable: '--font-satoshi',
  src: [
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Bold.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${inter.variable}`}>
      <body className="mx-auto min-h-screen overflow-x-hidden bg-black-500 font-inter">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[9999] focus:rounded focus:bg-accent-green focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black-500 focus:outline-none"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <main id="main-content" className="relative flex flex-1 flex-col">
            <Providers>
              <LayoutClient>{children}</LayoutClient>
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
