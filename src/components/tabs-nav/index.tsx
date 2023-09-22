import { FC } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/classnames';

const TABS: string[] = ['datasets', 'geostories'];

const TabsNav: FC<{ monitorId: string; tabId: string }> = ({ monitorId, tabId }) => (
  <nav>
    {TABS.map((tab) => (
      <Link
        key={tab}
        href={`/map/${monitorId}/${tab}`}
        className={cn({
          'inline-flex items-center justify-center whitespace-nowrap px-7.5 py-5 text-xs font-medium uppercase tracking-wide text-secondary-500 ring-offset-background transition-all first-letter:uppercase hover:bg-brand-50 hover:bg-secondary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50':
            true,
          'border-t-2 border-t-secondary-500': tab === tabId,
        })}
      >
        {tab}
      </Link>
    ))}
  </nav>
);
export default TabsNav;
