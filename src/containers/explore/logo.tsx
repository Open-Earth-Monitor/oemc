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
      className={cn(
        'block h-[35px] w-[142px] shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green',
        className
      )}
    >
      <Image
        alt="Open-earth-monitor"
        src="/images/OEM_Logo.webp"
        // Matches the file's 365×90 ratio. With Tailwind's `height: auto`, 140×35 rendered
        // 34.5px tall and next/image warned that only the height had changed.
        width={142}
        height={35}
        className="block"
        priority
      />
    </Link>
  );
}
