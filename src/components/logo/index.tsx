'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <>
      <Link href="/" className="absolute top-7 z-10 transition-[left] duration-300 ease-in-out">
        <Image
          alt="Open-earth-monitor"
          src="/images/OEM_Logo.webp"
          width={140}
          height={35}
          className="block"
          priority
        />
      </Link>
    </>
  );
}
