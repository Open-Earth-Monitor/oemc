'use client';

import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import GlobeExploreData from '@/containers/globe/explore-data';
import CategoriesFilters from '@/containers/globe/filters';
import CategoriesFiltersMobile from '@/containers/globe/filters/mobile';
import Geostories from '@/containers/globe/geostories';
import GlobeLiveUpdates from '@/containers/globe/live-updates/desktop';

import { GLOBE_ATTRIBUTION_SLOT_ID } from '@/components/globe/attribution-slot';

import GeostoriesGlobeMobile from './geostories-mobile';
import LiveUpdatesGlobeMobile from './live-updates-mobile';

function GlobeLayoutDesktop() {
  return (
    <div className="px-5">
      <div className="pointer-events-none absolute left-0 top-28 z-[1000]">
        <Geostories />
      </div>

      {/* `bottom` as well as `top`: the panel is bounded by the globe area, which
          ends where the footer starts, so a taller (wrapped) footer cannot be
          overlapped no matter how much the feed and publications add up to. */}
      <div className="pointer-events-none absolute bottom-8 right-0 top-28 z-[1000] flex flex-col px-5 animate-in fade-in-0 slide-in-from-right-5 duration-700 delay-150 ease-out fill-mode-both">
        <GlobeLiveUpdates />
      </div>

      <div className="pointer-events-none absolute bottom-20 left-1/2 z-[1000] -translate-x-1/2 [@media(max-height:940px)]:bottom-4">
        <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300 ease-out fill-mode-both [@media(max-height:940px)]:space-y-0">
          <div className="-translate-y-6">
            <CategoriesFilters />
          </div>
          <GlobeExploreData className="[@media(max-height:940px)]:mt-0" />
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

      {/* The 72px the layout reserves under the globe canvas: the explore link
          centered, then the Cesium credits right-aligned at the footer edge (they
          portal into the slot). Between `md` and `xl` the footer is `fixed`, so the
          whole block sits on top of it. */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-[4.5rem] flex-col md:max-xl:bottom-[var(--footer-height,0px)]">
        <div className="flex h-10 items-center justify-center px-5">
          <GlobeExploreData className="!m-0" />
        </div>
        <div id={GLOBE_ATTRIBUTION_SLOT_ID} className="flex h-8 items-center justify-end px-5" />
      </div>
    </>
  );
}

export function GlobeLayoutResponsive() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // xl breakpoint matches Tailwind's xl (1280px), same threshold used in the previous CSS approach.
  // Short laptops (≤ ~800px height) fall back to mobile layout to avoid the featured-stories list
  // overlapping the centered categories filter at the bottom of the screen.
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px) and (min-height: 820px)' });

  if (!mounted) return null;

  return isDesktop ? <GlobeLayoutDesktop /> : <GlobeLayoutMobile />;
}
