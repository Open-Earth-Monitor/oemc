import { Metadata } from 'next';

import CategoriesFilters from '@/containers/globe/categories-filters';
import GlobeExploreData from '@/containers/globe/explore-data';
import Geostories from '@/containers/globe/geostories';
import GlobeSocialMedia from '@/containers/globe/social-media';

import Header from '@/components/header';

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
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[1000] px-4 py-8 sm:px-12">
        <Header />
      </div>

      {/* Left sidebar - Geostories */}
      <div className="pointer-events-none absolute left-0 top-28 z-[1000] sm:pl-12">
        <Geostories />
      </div>

      {/* Right sidebar - Social Media */}
      <div className="pointer-events-none absolute right-0 top-28 z-[1000] sm:pr-12">
        <GlobeSocialMedia />
      </div>

      {/* Bottom controls */}
      <div className="pointer-events-none absolute bottom-20 left-1/2 z-[1000] -translate-x-1/2 space-y-4">
        <div className="-translate-y-6">
          <CategoriesFilters />
        </div>
        <GlobeExploreData />
      </div>
    </div>
  );
}
