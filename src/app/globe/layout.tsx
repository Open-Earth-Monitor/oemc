import { Metadata } from 'next';

import CategoriesFilters from '@/containers/globe/categories-filters';

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
    <div className="relative flex h-screen flex-col overflow-hidden">
      <div className="absolute left-0 top-0 z-[1000] h-full w-full shrink-0 py-8">
        <Header />
      </div>

      <div className="relative h-full min-h-0 flex-1">{children}</div>

      <div className="absolute bottom-60 left-1/2 z-[1000] -translate-x-1/2">
        <CategoriesFilters />
      </div>
    </div>
  );
}
