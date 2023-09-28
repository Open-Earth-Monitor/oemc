import { FC } from 'react';

import type { Metadata } from 'next';

import MonitorsTable from '@/components/monitors/table';

export const metadata: Metadata = {
  title: 'Map - Open Earth Monitor Cyberinfrastructure',
  description: '...',
};

const MapLayout: FC = () => (
  <div className="absolute top-0 z-10 w-full">
    <div className="m-auto w-full max-w-3xl bg-brand-400 p-12">
      <section className="space-y-6 text-secondary-500">
        <header className="divide-x-secondary-500 divide-x">
          <h1 className="inline-block pr-6 font-satoshi text-4xl font-bold">Monitors directory</h1>
          <span className="inline-block pl-6">Select one to discover</span>
        </header>
        <div>
          <MonitorsTable />
        </div>
      </section>
    </div>
  </div>
);

export default MapLayout;
