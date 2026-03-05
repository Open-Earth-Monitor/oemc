'use client';

import Image from 'next/image';
import Link from 'next/link';

import cn from '@/lib/classnames';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/globe"
      aria-label="Go to homepage"
      title="Go to homepage"
      className={cn(className)}
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
