'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {children}
      {!pathname.includes('/explore') && <Footer />}
    </>
  );
}
