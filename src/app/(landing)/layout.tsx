import { Metadata } from 'next';

import Header from '@/components/header';

import { GlobeLayoutResponsive } from './globe-layout-responsive';

export const metadata: Metadata = {
  title:
    'Open-Earth-Monitor project – A cyberinfrastructure to accelerate uptake of environmental information',
  keywords: ['Open Earth Monitor', 'Cyberinfrastructure', 'Geostories', 'Monitors'],
  description:
    'It supports sustainable land management, ecological monitoring, and spatial modeling through standardized, ready-to-use geospatial layers. The most extensive version of the data is hosted on OpenLandMap.org, while a selection of layers that can support on-the-ground activities / serving specific OEMC use-cases and partner organizations, will be made available in combination with other layers from Tier 2 stream.',
};

export default function GlobeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 overflow-hidden bg-[url('/images/landing/bg.png')] bg-cover bg-right-bottom text-primary">
      {/* Globe - full-screen base layer */}
      <div className="absolute inset-0 z-0">{children}</div>

      {/* Header - top overlay, fully transparent */}
      <div className="absolute left-0 right-0 top-5 z-[1000] xl:top-0">
        <Header className="px-5" />
      </div>

      <GlobeLayoutResponsive />
    </div>
  );
}
