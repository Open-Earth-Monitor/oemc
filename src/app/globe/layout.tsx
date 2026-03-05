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
    <div className="home hidden h-screen w-screen flex-col justify-between overflow-x-hidden text-primary sm:flex sm:px-12">
      <div className=" z-[1000] w-full py-8">
        <Header />
      </div>
      <div className="flex flex-1">
        <div className="relative m-auto flex h-full w-full min-w-0 flex-1 items-center justify-center">
          <Geostories />
          <div className="relative h-full w-full flex-1">{children}</div>
          <GlobeSocialMedia />

          <div className="absolute bottom-20 left-1/2 z-[1000] -translate-x-1/2 space-y-4">
            <div className="-translate-y-6">
              <CategoriesFilters />
            </div>
            <GlobeExploreData />
          </div>
        </div>
      </div>
    </div>
  );
}
