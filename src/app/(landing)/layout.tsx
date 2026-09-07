import { preconnect } from 'react-dom';

import Image from 'next/image';

import Header from '@/components/header';

import bg from '../../../public/images/landing/bg.png';

import { GlobeLayoutResponsive } from './globe-layout-responsive';

export default function GlobeLayout({ children }: { children: React.ReactNode }) {
  // Third parties the landing page hits right after hydration: the live feed,
  // the publications list and the globe's imagery tiles.
  preconnect('https://fosstodon.org');
  preconnect('https://cdn.fosstodon.org');
  preconnect('https://api.zotero.org');
  preconnect('https://server.arcgisonline.com');

  return (
    <div className="relative flex-1 overflow-hidden text-primary">
      {/* The starfield is the page's largest paint. As a CSS background it was
          a 1.2 MiB PNG the browser only discovered after the stylesheet, with no
          way to resize it per viewport. As an image element it is preloaded from
          the HTML with high fetch priority, served as WebP and sized to the
          screen. Empty alt: it is decoration behind the globe. */}
      <Image
        src={bg}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-right-bottom"
      />
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
