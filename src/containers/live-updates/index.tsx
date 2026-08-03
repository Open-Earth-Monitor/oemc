'use client';

import { Fragment } from 'react';

import { useMediaQuery } from 'react-responsive';

import { orderBy } from 'lodash';

import { mobile } from '@/lib/media-queries';

import { LIVE_UPDATES_CONTENT } from '@/constants/live-updates';

import { useLatestPublications, MAX_PUBLICATIONS_PER_SOURCE } from '@/hooks/publications';
import { useSocialMedia } from '@/hooks/social-media';
import { useSyncMediaFilter } from '@/hooks/sync-query';

import { FilterPill } from '@/containers/filter-pill';
import { LiveUpdatesFiltersContent } from '@/containers/globe/filters/live-updates-filters-content';

import Publications from './publications';
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

  const { data: publicationsData, isLoading: isLoadingPublications } = useLatestPublications({
    perSource: MAX_PUBLICATIONS_PER_SOURCE,
  });

  const socialMediaResults = socialMediaData?.length || 0;

  const resultsByFilter = {
    'social-media': socialMediaResults,
    publications: publicationsData?.length || 0,
    // news: newsData?.length || 0,
    // media: mediaData?.length || 0,
    // events: eventsData?.length || 0,
  };

  const contentById = {
    'social-media': <SocialMedia data={socialMediaData} isLoading={isLoadingSocialMedia} />,
    publications: <Publications data={publicationsData} isLoading={isLoadingPublications} />,
    news: null,
    media: null,
    events: null,
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
      {LIVE_UPDATES_CONTENT.filter(
        ({ id }) =>
          id !== 'all' &&
          contentById[id] != null &&
          (mediaFilter.includes(id) || mediaFilter.includes('all'))
      ).map(({ id }) => (
        <Fragment key={id}>{contentById[id]}</Fragment>
      ))}
    </div>
  );
};

export default LiveUpdatesContent;
