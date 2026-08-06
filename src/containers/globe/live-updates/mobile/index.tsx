'use client';

import { useState } from 'react';

import { orderBy } from 'lodash-es';

import { useTrackEvent, type EventSource } from '@/lib/analytics';

import {
  useLatestPublications,
  DEFAULT_PUBLICATIONS_PER_SOURCE,
  type Publication,
} from '@/hooks/publications';
import { useSocialMedia } from '@/hooks/social-media';

import { SocialMediaContent } from '@/containers/globe/live-updates/desktop/carousel';
import GlobePublications from '@/containers/globe/live-updates/publications';

import Loading from '@/components/loading';

const LiveUpdatesFeed = ({
  source = 'landing-globe-mobile',
  publicationsPerSource = DEFAULT_PUBLICATIONS_PER_SOURCE,
}: {
  source?: EventSource;
  /** Publications fetched from *each* library (Zenodo, Zotero) for the list. */
  publicationsPerSource?: number;
}) => {
  const [count, setCount] = useState(1);
  const { data, isLoading } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  const { data: publications } = useLatestPublications({ perSource: publicationsPerSource });
  const trackEvent = useTrackEvent();

  const handlePublicationSelect = (publication: Publication) =>
    trackEvent('Publication Open', {
      props: {
        publication_source: publication.source,
        title: publication.title,
        source,
      },
    });

  return (
    // The drawer caps its own height; the feed plus the publications list can
    // exceed it, so this column is what scrolls.
    <aside className="h-fit space-y-6 overflow-y-auto overscroll-contain">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}

      <SocialMediaContent data={data} setCount={setCount} count={count} />

      <div className="border-t border-white-900/10 pt-6 empty:hidden">
        <GlobePublications data={publications} onSelect={handlePublicationSelect} />
      </div>
    </aside>
  );
};

export default LiveUpdatesFeed;
