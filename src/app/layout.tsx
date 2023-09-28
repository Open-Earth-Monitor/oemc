import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import Header from '@/components/header';
import Providers from '@/utils/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  weight: ['400'],
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
      path: '../fonts/Satoshi-Black.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

// Styles
import 'maplibre-gl/dist/maplibre-gl.css';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${satoshi.className} h-full min-h-screen w-screen`}
    >
      <body className="mx-auto h-full min-h-screen bg-brand-500 font-inter">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
