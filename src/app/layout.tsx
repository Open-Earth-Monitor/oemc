import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import Providers from '@/utils/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  weight: ['400', '500'],
  style: ['normal'],
  display: 'block',
});

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: '400',
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

// Styles
import '@/styles/globals.css';
import 'ol/ol.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${satoshi.className} h-full min-h-screen`}>
      <body className="mx-auto h-full min-h-screen bg-gradient-to-b from-[#0a141e] to-[#0a1520] font-inter">
        <Providers>
          <div className="flex h-full flex-col">
            <main className="relative h-full flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
