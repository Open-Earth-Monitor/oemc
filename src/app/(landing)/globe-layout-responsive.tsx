'use client';

import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import GlobeExploreData from '@/containers/globe/explore-data';
import CategoriesFilters from '@/containers/globe/filters';
import CategoriesFiltersMobile from '@/containers/globe/filters/mobile';
import Geostories from '@/containers/globe/geostories';
import GlobeSocialMedia from '@/containers/globe/social-media/desktop';

import GeostoriesGlobeMobile from './geostories-mobile';
import LiveUpdatesGlobeMobile from './live-updates-mobile';

function GlobeLayoutDesktop() {
  return (
    <div className="px-5">
      <div className="pointer-events-none absolute left-0 top-28 z-[1000]">
        <Geostories />
      </div>

      <div className="pointer-events-none absolute right-0 top-28 z-[1000] px-5 animate-in fade-in-0 slide-in-from-right-5 duration-700 delay-150 ease-out fill-mode-both">
        <GlobeSocialMedia />
      </div>

      <div className="pointer-events-none absolute bottom-20 left-1/2 z-[1000] -translate-x-1/2">
        <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300 ease-out fill-mode-both">
          <div className="-translate-y-6">
            <CategoriesFilters />
          </div>
          <GlobeExploreData />
        </div>
      </div>
    </div>
  );
}

function GlobeLayoutMobile() {
  return (
    <>
      <CategoriesFiltersMobile className="absolute right-0 top-24 flex w-full" />

      <div className="absolute bottom-40 right-5 flex flex-col items-end gap-4">
        <GeostoriesGlobeMobile />
        <LiveUpdatesGlobeMobile />
      </div>
    </>
  );
}

export function GlobeLayoutResponsive() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // xl breakpoint matches Tailwind's xl (1280px), same threshold used in the previous CSS approach
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  if (!mounted) return null;

  return isDesktop ? <GlobeLayoutDesktop /> : <GlobeLayoutMobile />;
}
