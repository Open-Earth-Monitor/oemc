'use client';

import Link from 'next/link';

import { LuCircleArrowRight } from 'react-icons/lu';

export const GlobeExploreData = () => (
  <Link
    href="/explore"
    className="z-60 relative m-auto flex w-fit items-center space-x-2 font-satoshi text-xs font-medium text-white-500 underline"
  >
    <span>Explore our Monitors & Geostories</span>
    <LuCircleArrowRight className="h-6 w-6" />
  </Link>
);

export default GlobeExploreData;
