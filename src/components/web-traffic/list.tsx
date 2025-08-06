'use client';

import { useGetWebTraffic } from '@/hooks/web-traffic';

import Loading from '../loading';

import WebTrafficRankingContentItem from './item';

const WebTrafficRankingContent = ({ type }) => {
  const { isLoadingGeostories, isLoadingMonitors, geostoriesInfo, monitorsInfo } =
    useGetWebTraffic();
  const isLoading = type === 'monitors' ? isLoadingMonitors : isLoadingGeostories;
  const data = type === 'monitors' ? monitorsInfo : geostoriesInfo;

  return (
    <div className="h-full w-full grid-cols-2 space-y-4  p-6 text-secondary-500">
      <h5 className="text-xs font-medium uppercase tracking-widest">
        top 5 most visited {type === 'monitors' ? 'monitors' : 'geostories'}
      </h5>
      <ul className="space-y-5">
        {isLoading && <Loading />}
        {!isLoading &&
          data.map(({ title, theme, color, monitor_id, geostory_id }) => {
            return (
              <WebTrafficRankingContentItem
                id={monitor_id || geostory_id}
                key={title}
                title={title}
                theme={theme}
                color={color}
                type={type === 'monitors' ? 'monitor' : 'geostory'}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default WebTrafficRankingContent;
