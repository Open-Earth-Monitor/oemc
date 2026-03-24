'use client';

import { useMediaQuery } from 'react-responsive';

import { mobile } from '@/lib/media-queries';

import { useSyncMediaFilter } from '@/hooks/sync-query';

import { FilterPill } from '@/containers/filter-pill';
import { LiveUpdatesFiltersContent } from '@/containers/globe/categories-filters/live-updates-filters-content';

import SocialMedia from './social-media';

export const LiveUpdatesContent = () => {
  const [mediaFilter] = useSyncMediaFilter();
  const isMobile = useMediaQuery(mobile);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl">
          Discover our <br className="xl:hidden" />
          <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
            Latest Updates.
          </span>
        </div>

        {!isMobile && <LiveUpdatesFiltersContent />}
        {isMobile && (
          <FilterPill>
            <LiveUpdatesFiltersContent />
          </FilterPill>
        )}
      </div>
      {(mediaFilter.includes('social-media') || mediaFilter.includes('all')) && <SocialMedia />}
      {(mediaFilter.includes('news') || mediaFilter.includes('all')) && <div>News</div>}
      {(mediaFilter.includes('media') || mediaFilter.includes('all')) && <div>Media</div>}
      {(mediaFilter.includes('events') || mediaFilter.includes('all')) && <div>Events</div>}
    </div>
  );
};

export default LiveUpdatesContent;
