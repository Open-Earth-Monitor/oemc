import { Metadata } from 'next';

import CategoriesFilters from '@/containers/globe/categories-filters';

import Footer from '@/components/footer';
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
    <div className="relative py-9">
      <Header />
      {children}
      <div className="absolute bottom-60 left-[50%] z-[1000] -translate-x-1/2">
        <CategoriesFilters />
      </div>
      <Footer />
    </div>
  );
}
