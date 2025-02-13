import dynamic from 'next/dynamic';

import type { Metadata, NextPage } from 'next';

import MonitorsTable from '@/components/monitors/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const StaticMap = dynamic(() => import('@/components/map/static'), { ssr: false });

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
};

const MapLayout: NextPage = () => (
  <div className="h-screen">
    <div className="absolute left-1/2 top-[70px] z-10 flex max-h-[85vh] w-full max-w-3xl -translate-x-1/2 flex-col bg-brand-400">
      <ScrollArea className="grow p-12">
        <section className="space-y-6">
          <header className="sm:divide-x-secondary-500 sm:divide-x">
            <h1 className="font-satoshi text-4xl font-bold leading-tight text-secondary-500 sm:inline-block sm:pr-6">
              Monitor List
            </h1>
            <span className="inline-block sm:pl-6">Select one to discover</span>
          </header>
          <div>
            <MonitorsTable />
          </div>
        </section>
      </ScrollArea>
    </div>
    <StaticMap />
  </div>
);

export default MapLayout;
