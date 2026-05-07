'use client';

import { useMediaQuery } from 'react-responsive';

import { orderBy } from 'lodash';

import { mobile } from '@/lib/media-queries';

import { useSocialMedia } from '@/hooks/social-media';
import { useSyncMediaFilter } from '@/hooks/sync-query';

import { FilterPill } from '@/containers/filter-pill';
import { LiveUpdatesFiltersContent } from '@/containers/globe/filters/live-updates-filters-content';

import SocialMedia from './social-media';

export const LiveUpdatesContent = () => {
  const [mediaFilter] = useSyncMediaFilter();
  const isMobile = useMediaQuery(mobile);
  const { data: socialMediaData, isLoading: isLoadingSocialMedia } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  const socialMediaResults = socialMediaData?.length || 0;

  const resultsByFilter = {
    'social-media': socialMediaResults,
    // news: newsData?.length || 0,
    // media: mediaData?.length || 0,
    // events: eventsData?.length || 0,
  };

  const totalResults = mediaFilter.includes('all')
    ? Object.values(resultsByFilter).reduce((sum, value) => sum + value, 0)
    : mediaFilter.reduce((sum, filter) => {
        if (filter === 'all') return sum;
        return sum + (resultsByFilter[filter] || 0);
      }, 0);

  return (
    <div>
      <div className="flex items-end justify-between py-10">
        <div className="space-y-10">
          <div className="text-2xl">
            Discover our <br className="xl:hidden" />
            <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
              Latest Updates.
            </span>
          </div>
          <p className="text-sm text-white-500/50">
            Showing {totalResults} {totalResults === 1 ? 'result' : 'results'}
          </p>
        </div>

        {!isMobile && <LiveUpdatesFiltersContent />}
        {isMobile && (
          <FilterPill>
            <LiveUpdatesFiltersContent />
          </FilterPill>
        )}
      </div>
      {(mediaFilter.includes('social-media') || mediaFilter.includes('all')) && (
        <SocialMedia data={socialMediaData} isLoading={isLoadingSocialMedia} />
      )}
      {(mediaFilter.includes('news') || mediaFilter.includes('all')) && <div>News</div>}
      {(mediaFilter.includes('media') || mediaFilter.includes('all')) && <div>Media</div>}
      {(mediaFilter.includes('events') || mediaFilter.includes('all')) && <div>Events</div>}
    </div>
  );
};

export default LiveUpdatesContent;
