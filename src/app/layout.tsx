import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

import MainMenu from '@/components/main-menu';
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
      <body className="mx-auto h-full min-h-screen bg-brand-500 font-inter">
        <Providers>
          <div className="flex h-full flex-col">
            <div className="h-[70px] w-full items-center border-b border-b-secondary-900 bg-brand-500/80">
              <div className="m-auto flex h-full max-w-[1200px] items-center justify-between">
                <div className="mx-2 items-center space-x-4">
                  <Link href="/">
                    <Image
                      alt="Open-earth-monitor"
                      src="/images/OEM-logo.svg"
                      width={147}
                      height={40}
                      className="inline-block"
                    />
                  </Link>
                </div>
                <MainMenu />
              </div>
            </div>
            <main className="relative h-[calc(100%-4.375rem)] flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
