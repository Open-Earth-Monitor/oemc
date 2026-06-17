import type { Metadata, NextPage } from 'next';

import LiveUpdatesContent from '@/containers/live-updates';

import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Live Updates',
  description:
    'Live usage statistics and activity updates for the Open Earth Monitor Cyberinfrastructure platform.',
  alternates: { canonical: '/usage-stats' },
};

const UsageStatsPage: NextPage = () => {
  return (
    <div className="m-auto h-full font-satoshi font-medium">
      <div className="flex flex-col space-y-2 rounded-bl-[3.5rem]  bg-[url(/images/bg.png)] bg-cover bg-left-bottom  px-6 pt-7 md:px-24 ">
        <Header />
        <h1 className="py-10 text-3xl sm:text-7xl">Live Updates.</h1>
      </div>
      <div className="md:6 px-6 pb-28 xl:px-24">
        <LiveUpdatesContent />
      </div>
    </div>
  );
};

export default UsageStatsPage;
