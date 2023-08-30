import localFont from 'next/font/local';

import type { Metadata } from 'next';

import Header from '@/components/header';
import '@/styles/globals.css';
export const metadata: Metadata = {
  title: 'Hub - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const satoshi = localFont({
  src: [
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Black.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.className} h-screen w-screen`}>
      <body className="inter mx-auto h-screen max-w-7xl bg-brand-600">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
