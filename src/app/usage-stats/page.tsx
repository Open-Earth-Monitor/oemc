import type { NextPage } from 'next';

import WebTrafficContent from '@/components/web-traffic/content';

const UsageStatsPage: NextPage = () => {
  return (
    <div className="container m-auto h-screen ">
      <div className="flex flex-col space-y-8 py-80">
        <h1 className="text-4xl font-bold">
          Live{' '}
          <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Usage Statistics
          </span>
        </h1>
        <h2>Web geographic activity</h2>
      </div>

      <WebTrafficContent />
    </div>
  );
};

export default UsageStatsPage;
