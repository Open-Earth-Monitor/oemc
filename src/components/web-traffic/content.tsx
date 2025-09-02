import Script from 'next/script';

import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="relative flex w-full grow flex-col">
      <section className="mt-12">
        <div className="mx-auto w-full max-w-4xl">
          <Script
            id="clustrmaps"
            src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
          />
        </div>
      </section>

      <div className="flex flex-col py-20 sm:flex-row sm:justify-between">
        <WebTrafficRankingContent type="monitors" />
        <WebTrafficRankingContent type="geostories" />
      </div>
    </div>
  );
};

export default WebTrafficContent;
