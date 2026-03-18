import { Metadata } from 'next';

import CategoriesFilters from '@/containers/globe/categories-filters';
import GlobeExploreData from '@/containers/globe/explore-data';
import Geostories from '@/containers/globe/geostories';
import GlobeSocialMedia from '@/containers/globe/social-media';

import Header from '@/components/header';
import CategoriesFiltersMobile from '@/containers/globe/categories-filters/mobile';
import GeostoriesGlobeMobile from './geostories-mobile';

export const metadata: Metadata = {
  title:
    'Open-Earth-Monitor project – A cyberinfrastructure to accelerate uptake of environmental information',
  keywords: ['Open Earth Monitor', 'Cyberinfrastructure', 'Geostories', 'Monitors'],
  description:
    'It supports sustainable land management, ecological monitoring, and spatial modeling through standardized, ready-to-use geospatial layers. The most extensive version of the data is hosted on OpenLandMap.org, while a selection of layers that can support on‑the‑ground activities / serving specific OEMC use‑cases and partner organizations, will be made available in combination with other layers from Tier 2 stream.',
};

export default function GlobeLayout({ children }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden text-primary">
      {/* Globe - full-screen base layer */}
      <div className="absolute inset-0 z-0">{children}</div>

      {/* Header - top overlay, fully transparent */}
      <div className="pointer-events-none absolute left-0 right-0 top-5 z-[1000] xl:top-0">
        <Header />
      </div>

      {/* Left sidebar - Geostories */}
      <div className="pointer-events-none absolute left-0 top-28 z-[1000] hidden sm:pl-12 xl:block">
        <Geostories />
      </div>

      {/* Right sidebar - Social Media */}
      <div className="pointer-events-none absolute right-0 top-28 z-[1000] hidden sm:pr-12 xl:block">
        <GlobeSocialMedia />
      </div>

      {/* Bottom controls */}
      <div className="pointer-events-none absolute bottom-20 left-1/2 z-[1000] hidden -translate-x-1/2 space-y-4 xl:block">
        <div className="-translate-y-6">
          <CategoriesFilters />
        </div>
        <GlobeExploreData />
      </div>
      <div>
        <CategoriesFiltersMobile className="absolute right-0 top-28 flex w-full xl:hidden" />
      </div>

      <div className="block xl:hidden">
        <GeostoriesGlobeMobile />
      </div>
    </div>
  );
}
