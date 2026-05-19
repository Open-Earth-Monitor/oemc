'use client';

import Link from 'next/link';

import { LuCircleArrowRight } from 'react-icons/lu';

export const GlobeExploreData = ({ className }: { className?: string }) => (
  <Link
    href="/explore"
    className={`z-60 pointer-events-auto relative m-auto flex w-fit items-center space-x-2 font-satoshi text-xs font-medium text-white-500 underline ${className}`}
  >
    <span>Explore our Monitors & Geostories</span>
    <LuCircleArrowRight className="h-6 w-6" />
  </Link>
);

export default GlobeExploreData;
