import Header from '@/components/header';

import { GlobeLayoutResponsive } from './globe-layout-responsive';

export default function GlobeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 overflow-hidden bg-[url('/images/landing/bg.png')] bg-cover bg-right-bottom text-primary">
      <h1 className="sr-only">Open Earth Monitor – Geospatial Data Explorer</h1>
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
