// import { useMemo } from 'react';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import CardHeader from '@/components/sidebar/card-header';
import type { GeostoryParsed } from '@/types/geostories';

// import { getValidPublications } from '@/utils/geostories';

function DatasetCardGeostory({ theme, title, color, id, geostory_bbox }: GeostoryParsed) {
  // const validPublications = useMemo(() => getValidPublications(publications), [publications]);
  return (
    <div className="relative">
      <div
        data-testid={`sidebar-geostory-card-${id}`}
        className="group/monitor-card relative h-40 space-y-2 border-l bg-cover bg-center p-[18px] font-satoshi transition-all duration-200 hover:border-l-4"
        style={{ borderLeftColor: color, backgroundImage: `url(/images/geostories/${id}.jpg)` }}
      >
        {/* overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black-500/60" />

        {/* content */}
        <div className="relative z-10 space-y-8">
          <CardHeader
            theme={theme}
            title={title}
            type="geostory"
            color={color}
            id={id}
            bbox={geostory_bbox}
          />

          <div className="flex w-full justify-end">
            <Link
              href={`/explore/geostory/${id}${
                geostory_bbox ? `?bbox=${geostory_bbox.join(',')}` : ''
              }`}
              className="flex items-center justify-end"
            >
              <span className="ml-2 inline-block w-0 overflow-hidden whitespace-nowrap font-inter text-xs text-white-500/50 opacity-0 transition-all duration-300 ease-in-out group-hover/monitor-card:w-full group-hover/monitor-card:opacity-100">
                Go to geostory
              </span>

              <ChevronRight className="inline h-6 w-6 shrink-0 text-white-500/50 group-hover/monitor-card:text-accent-green" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatasetCardGeostory;
