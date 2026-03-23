import type { NextPage } from 'next';

import LiveUpdatesContent from '@/containers/live-updates';

import Header from '@/components/header';

const UsageStatsPage: NextPage = () => {
  return (
    <div className="m-auto min-h-screen font-satoshi font-medium">
      <div className="flex flex-col space-y-2 rounded-bl-3xl  bg-[url(/images/bg.png)] bg-cover bg-left-bottom  px-6 pt-7 sm:space-y-8">
        <Header className="z-50 mx-0 px-0" />
        <h1 className="py-10 text-3xl sm:text-7xl">
          Live Updates.
          {/* <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Usage Statistics
          </span> */}
        </h1>
        {/* <h2 className="py-2 text-base sm:py-4 sm:text-2xl">Web geographic activity</h2> */}
      </div>
      <LiveUpdatesContent />
    </div>
  );
};

export default UsageStatsPage;
