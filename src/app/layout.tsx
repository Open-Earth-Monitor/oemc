import { Metadata } from 'next';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
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
  title:
    'Open-Earth-Monitor project – A cyberinfrastructure to accelerate uptake of environmental information',
  keywords: ['Open Earth Monitor', 'Cyberinfrastructure', 'Geostories', 'Monitors'],
  description:
    'It supports sustainable land management, ecological monitoring, and spatial modeling through standardized, ready-to-use geospatial layers. The most extensive version of the data is hosted on OpenLandMap.org, while a selection of layers that can support on‑the‑ground activities / serving specific OEMC use‑cases and partner organizations, will be made available in combination with other layers from Tier 2 stream.',
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
      <body className="mx-auto min-h-screen w-screen overflow-x-hidden bg-black-500 font-inter">
        <div className="flex min-h-screen flex-col">
          <main className="relative flex-1">
            <Providers>
              <LayoutClient>{children}</LayoutClient>
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
