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
          <div className="flex h-full flex-col">
            <div className="relative z-10 h-[70px] w-full border-b border-b-secondary-900 bg-brand-500/80">
              <div className="m-auto flex flex h-full max-w-[1200px] items-center justify-between">
                <div className="mx-2">
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
            <main className="relative flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
