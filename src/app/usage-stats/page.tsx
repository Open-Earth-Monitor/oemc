import type { NextPage } from 'next';

import WebTrafficContent from '@/components/web-traffic/content';

const UsageStatsPage: NextPage = () => {
  return (
    <div className="container m-auto h-screen font-medium">
      <div className="flex flex-col space-y-8 pt-56">
        <h1 className="satoshi text-7xl ">
          Live{' '}
          <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Usage Statistics
          </span>
        </h1>
        <h2 className="py-4 text-2xl">Web geographic activity</h2>
      </div>

      <WebTrafficContent />
    </div>
  );
};

export default UsageStatsPage;
