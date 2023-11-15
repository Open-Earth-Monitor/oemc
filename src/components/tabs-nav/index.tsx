'use client';

import type { FC } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

const TABS: string[] = ['datasets', 'geostories'];

const TabsNav: FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const monitorId = params?.monitor_id as string;
  const tabId = pathname.split(`${monitorId}/`)[1];

  return (
    <nav className="flex border-t border-brand-50">
      {TABS.map((tab) => (
        <Link
          key={tab}
          href={`/map/${monitorId}/${tab}`}
          className={cn({
            'flex basis-full items-center justify-center whitespace-nowrap border-t-4 border-t-transparent px-7.5 py-5 text-xs font-medium uppercase tracking-wide ring-offset-background transition-all first-letter:uppercase hover:bg-brand-50 hover:bg-secondary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50':
              true,
          })}
          data-testid={`tab-${tab}`}
        >
          {tab}
        </Link>
      ))}
    </nav>
  );
};
export default TabsNav;
