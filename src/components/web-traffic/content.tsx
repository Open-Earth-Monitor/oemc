import Script from 'next/script';

import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="relative flex w-full grow flex-col">
      <div className="relative my-8 h-96 min-h-[600px] w-full">
        <Script
          id="clustrmaps"
          src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
          strategy="afterInteractive"
          className="absolute left-0 top-0 h-full w-full"
        />
      </div>
      <div className="flex flex-col py-20 sm:flex-row sm:justify-between">
        <WebTrafficRankingContent type="monitors" />
        <WebTrafficRankingContent type="geostories" />
      </div>
    </div>
  );
};

export default WebTrafficContent;
