import dynamic from 'next/dynamic';

import type { Metadata, NextPage } from 'next';

import MonitorsTable from '@/components/monitors/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const StaticMap = dynamic(() => import('@/components/map/static'), { ssr: false });

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
  description: '...',
};

const MapLayout: NextPage = () => (
  <>
    <div className="left-50 absolute left-1/2 top-0 z-10 flex max-h-[85vh] w-full max-w-3xl -translate-x-1/2 flex-col bg-brand-400">
      <ScrollArea className="grow p-12">
        <section className="space-y-6">
          <header className="divide-x divide-secondary-500">
            <h1 className="inline-block pr-6 font-satoshi text-4xl font-bold">
              Monitors directory
            </h1>
            <span className="inline-block pl-6">Select one to discover</span>
          </header>
          <div>
            <MonitorsTable />
          </div>
        </section>
      </ScrollArea>
    </div>
    <StaticMap />
  </>
);

export default MapLayout;
