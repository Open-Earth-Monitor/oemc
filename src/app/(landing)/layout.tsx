import { Metadata } from 'next';

import CategoriesFilters from '@/containers/globe/categories-filters';
import CategoriesFiltersMobile from '@/containers/globe/categories-filters/mobile';
import GlobeExploreData from '@/containers/globe/explore-data';
import Geostories from '@/containers/globe/geostories';
import GlobeSocialMedia from '@/containers/globe/social-media/desktop';

import Header from '@/components/header';

import GeostoriesGlobeMobile from './geostories-mobile';
import LiveUpdatesGlobeMobile from './live-updates-mobile';

export const metadata: Metadata = {
  title:
    'Open-Earth-Monitor project – A cyberinfrastructure to accelerate uptake of environmental information',
  keywords: ['Open Earth Monitor', 'Cyberinfrastructure', 'Geostories', 'Monitors'],
  description:
    'It supports sustainable land management, ecological monitoring, and spatial modeling through standardized, ready-to-use geospatial layers. The most extensive version of the data is hosted on OpenLandMap.org, while a selection of layers that can support on-the-ground activities / serving specific OEMC use-cases and partner organizations, will be made available in combination with other layers from Tier 2 stream.',
};

function GlobeLayoutDesktop() {
  return (
    <div className="px-5">
      {/* Left sidebar - Geostories */}
      <div className="pointer-events-none absolute left-0 top-28 z-[1000] hidden xl:block">
        <Geostories />
      </div>

      {/* Right sidebar - Social Media */}
      <div className="pointer-events-none absolute right-0 top-28 z-[1000] hidden animate-in fade-in-0 slide-in-from-right-5 duration-700 ease-out fill-mode-both delay-150 px-5 xl:block">
        <GlobeSocialMedia />
      </div>

      {/* Bottom controls — extra wrapper keeps centering transform separate from animation */}
      <div className="pointer-events-none absolute bottom-20 left-1/2 z-[1000] hidden -translate-x-1/2 xl:block">
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 ease-out fill-mode-both delay-300 space-y-4">
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
      <CategoriesFiltersMobile className="absolute right-0 top-24 flex w-full xl:hidden" />

      <div className="absolute bottom-40 right-5 flex flex-col items-end gap-4 xl:hidden">
        <GeostoriesGlobeMobile />
        <LiveUpdatesGlobeMobile />
      </div>
    </>
  );
}

export default function GlobeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 overflow-hidden bg-[url('/images/landing/bg.png')] bg-cover bg-right-bottom text-primary">
      {/* Globe - full-screen base layer */}
      <div className="absolute inset-0 z-0">{children}</div>

      {/* Header - top overlay, fully transparent */}
      <div className="absolute left-0 right-0 top-5 z-[1000] xl:top-0">
        <Header className="px-5" />
      </div>

      <GlobeLayoutDesktop />
      <GlobeLayoutMobile />
    </div>
  );
}
