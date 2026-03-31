'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <div className="relative flex flex-1 flex-col">{children}</div>
      {!pathname.includes('/explore') && <Footer />}
    </div>
  );
}
