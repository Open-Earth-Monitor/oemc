import { ReactNode } from 'react';

import localFont from 'next/font/local';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from '@/providers';
// Styles
import 'maplibre-gl/dist/maplibre-gl.css';
import '@/styles/globals.css';
import Header from '@/components/header';
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
  return (
    <html lang="en" className={`${satoshi.className} h-full min-h-screen w-screen`}>
      <body className="font-inter mx-auto h-full min-h-screen bg-brand-500">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
