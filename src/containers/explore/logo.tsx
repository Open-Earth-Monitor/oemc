'use client';

import Image from 'next/image';
import Link from 'next/link';

import cn from '@/lib/classnames';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      title="Go to homepage"
      className={cn('block h-[35px] w-[140px] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded', className)}
    >
      <Image
        alt="Open-earth-monitor"
        src="/images/OEM_Logo.webp"
        width={140}
        height={35}
        className="block"
        priority
      />
    </Link>
  );
}
