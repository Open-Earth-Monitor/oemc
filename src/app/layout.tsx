import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import Header from '@/components/header';
import Providers from '@/utils/providers';

import Script from 'next/script';

// Styles
import '@/styles/globals.css';
import 'ol/ol.css';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${satoshi.className} h-full min-h-screen`}>
      <body className="mx-auto h-full min-h-screen w-screen overflow-x-hidden bg-brand-500 font-inter">
        <div className="flex h-full flex-col">
          <main className="relative h-full flex-1">
            <Providers>
              <Header />
              {children}
            </Providers>
            <Script
              src="//rf.revolvermaps.com/0/0/8.js?i=55ky0c1lddb&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33"
              strategy="lazyOnload" // This attribute ensures the script loads without blocking page load
              async
            />
          </main>
        </div>
      </body>
    </html>
  );
}
