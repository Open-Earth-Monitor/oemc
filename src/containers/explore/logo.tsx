'use client';

import Image from 'next/image';
import Link from 'next/link';

import cn from '@/lib/classnames';

import { SIDEBAR_WIDTH, SIDEBAR_THEME_FILTERS } from '@/constants/sidebar';

import { useSidebar } from '@/components/ui/sidebar';

const LOGO_PADDING = 10;

export default function MapLogo() {
  const { open } = useSidebar();
  const left = open
    ? `calc(${SIDEBAR_WIDTH} + ${SIDEBAR_THEME_FILTERS}px + ${LOGO_PADDING}px)`
    : `calc(${SIDEBAR_THEME_FILTERS}px + ${LOGO_PADDING}px)`;
  return (
    <>
      <Link
        href="/"
        className="absolute top-7 z-10 transition-[left] duration-300 ease-in-out"
        style={{ left }}
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
    </>
  );
}
