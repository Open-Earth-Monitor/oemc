import dynamic from 'next/dynamic';

import type { Metadata, NextPage } from 'next';

import MonitorsTable from '@/components/monitors/table';

const StaticMap = dynamic(() => import('@/components/map/static'), { ssr: false });

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
  description: '...',
};

const MapLayout: NextPage = () => (
  <>
    <div className="left-50 absolute left-1/2 top-0 z-10 w-full max-w-3xl -translate-x-1/2 bg-brand-400 p-12">
      <section className="space-y-6">
        <header className="divide-x-secondary-500 divide-x">
          <h1 className="inline-block pr-6 font-satoshi text-4xl font-bold">Monitors directory</h1>
          <span className="inline-block pl-6">Select one to discover</span>
        </header>
        <div>
          <MonitorsTable />
        </div>
      </section>
    </div>
    <StaticMap />
  </>
);

export default MapLayout;
