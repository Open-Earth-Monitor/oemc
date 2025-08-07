'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function MapLogo() {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"
      title="Go to homepage"
      className="absolute top-7 z-10"
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
