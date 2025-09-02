import Script from 'next/script';

import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="relative flex w-full grow flex-col">
      <Script
        id="clustrmaps"
        src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&amp;w=a&amp;t=tt&amp;d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&amp;co=092539"
      />
      <Script
        id="clustrmaps"
        src="//clustrmaps.com/map_v2.js?d=aPewiJXDWdjZQbyH9Yg-r_o0pb5xj1e5wFof-PFRqKQ&cl=ffffff&w=a"
      ></Script>
      <div className="flex flex-col py-20 sm:flex-row sm:justify-between">
        <WebTrafficRankingContent type="monitors" />
        <WebTrafficRankingContent type="geostories" />
      </div>
    </div>
  );
};

export default WebTrafficContent;
