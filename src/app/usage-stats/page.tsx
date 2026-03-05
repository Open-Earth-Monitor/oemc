import type { NextPage } from 'next';

import Header from '@/components/header';
import WebTrafficContent from '@/components/web-traffic/content';

const UsageStatsPage: NextPage = () => {
  return (
    <div className="m-auto min-h-screen font-satoshi font-medium">
      <div className="flex flex-col space-y-2 rounded-bl-3xl bg-pink-900 px-3 pt-7 sm:space-y-8">
        <Header className="z-50 mx-0 px-0" />
        <h1 className="text-3xl sm:text-7xl">
          Live Updates.
          <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Usage Statistics
          </span>
        </h1>
        <h2 className="py-2 text-base sm:py-4 sm:text-2xl">Web geographic activity</h2>
      </div>
      <div>Discover our Latest Updates.</div>

      <WebTrafficContent />
    </div>
  );
};

export default UsageStatsPage;
