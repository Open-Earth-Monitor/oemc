import Header from '@/components/header';

import { GlobeLayoutResponsive } from './globe-layout-responsive';

export default function GlobeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 overflow-hidden bg-[url('/images/landing/bg.png')] bg-cover bg-right-bottom text-primary">
      <h1 className="sr-only">Open Earth Monitor – Geospatial Data Explorer</h1>
      {/* Globe - full-screen base layer.
          In the mobile layout 72px are left free at the bottom for the explore link
          and the Cesium credits (see `GlobeLayoutMobile`), so they sit under the
          globe rather than over it. Between `md` and `xl` the footer is `fixed`, so
          that block also has to clear its measured height. The canvas is nudged 10px
          down so the sphere clears the filters bar at `top-24`. The arbitrary media
          query mirrors the desktop switch in `GlobeLayoutResponsive`, which
          Tailwind's `xl:` alone cannot express because of the height condition. */}
      <div className="absolute inset-x-0 bottom-[4.5rem] top-0 z-0 translate-y-2.5 md:max-xl:bottom-[calc(var(--footer-height,0px)+4.5rem)] [@media(min-width:1280px)_and_(min-height:820px)]:bottom-0 [@media(min-width:1280px)_and_(min-height:820px)]:translate-y-0">
        {children}
      </div>

      {/* Header - top overlay, fully transparent */}
      <div className="absolute left-0 right-0 top-5 z-[1000] xl:top-0">
        <Header className="px-5" />
      </div>

      <GlobeLayoutResponsive />
    </div>
  );
}
