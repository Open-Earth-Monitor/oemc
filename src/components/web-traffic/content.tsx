import Script from 'next/script';

import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="relative flex w-full grow flex-col">
      <div />

      <Script
        id="clustrmaps"
        src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=371&t=tt&d=7RJrIJVpLxqbhMZ-6BvSvk2op75peRxpTRksMF6UTiw&co=17181e&cmo=23e9c3&cmn=67adf5"
      />

      <div className="flex flex-col py-20 sm:flex-row sm:justify-between">
        <WebTrafficRankingContent type="monitors" />
        <WebTrafficRankingContent type="geostories" />
      </div>
    </div>
  );
};

export default WebTrafficContent;
