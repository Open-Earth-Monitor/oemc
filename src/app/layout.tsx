'use client';
import { ReactNode, useState } from 'react';

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import type { Metadata } from 'next';

import Header from '@/components/header';

// Styles
import 'maplibre-gl/dist/maplibre-gl.css';
import '@/styles/globals.css';

// export const metadata: Metadata = {
//   title: 'Hub - Open-Earth-Monitor Cyberinfrastructure',
//   description: '...',
// };

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

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className={`${satoshi.className} ${inter.variable} h-screen w-screen`}>
        <body className="inter mx-auto h-screen bg-brand-500">
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
