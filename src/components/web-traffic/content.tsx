import Script from 'next/script';
import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="relative flex w-full grow flex-col">
      <section className="mt-12">
        <div className="mx-auto w-full max-w-4xl">
          <a
            href="https://clustrmaps.com/site/1c7ts"
            id="clustrmaps-widget-v2"
            title="ClustrMaps"
            className="border-white/10 block h-[600px] w-full overflow-hidden rounded-xl border"
          />

          <Script
            id="clustrmaps"
            src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
            strategy="afterInteractive"
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
