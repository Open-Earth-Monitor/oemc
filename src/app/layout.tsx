import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import Header from '@/components/header';
import Providers from '@/utils/providers';

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
    <html lang="en" className={`${satoshi.variable} ${inter.className} h-full min-h-screen`}>
      <body className="font-inter mx-auto h-full min-h-screen w-screen overflow-x-hidden bg-brand-500">
        <div className="flex h-full flex-col">
          <main className="relative h-full flex-1">
            <Providers>
              <Header />
              {children}
            </Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
