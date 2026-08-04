'use client';

import { useMemo, useState } from 'react';

import { orderBy } from 'lodash-es';

import { useTrackEvent, type EventSource } from '@/lib/analytics';

import {
  useLatestPublications,
  DEFAULT_PUBLICATIONS_PER_SOURCE,
  type Publication,
} from '@/hooks/publications';
import { useSocialMedia } from '@/hooks/social-media';

import { SocialMediaContent } from '@/containers/globe/live-updates/desktop/carousel';
import { toFeedItems } from '@/containers/globe/live-updates/feed-items';

import Loading from '@/components/loading';

const LiveUpdatesFeed = ({
  source = 'landing-globe-mobile',
  publicationsPerSource = DEFAULT_PUBLICATIONS_PER_SOURCE,
}: {
  source?: EventSource;
  /** Publications fetched from *each* library (Zenodo, Zotero) for the carousel. */
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

  // Every slide change sets `count` and re-renders this component; without the
  // memo the feed would be re-merged and re-sorted on each one, handing the
  // carousel a new array and a new identity for every item.
  const feedItems = useMemo(() => toFeedItems(data, publications), [data, publications]);

  const handlePublicationSelect = (publication: Publication) =>
    trackEvent('Publication Open', {
      props: {
        publication_source: publication.source,
        title: publication.title,
        source,
      },
    });

  return (
    <aside className="h-fit">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}

      <SocialMediaContent
        data={feedItems}
        setCount={setCount}
        count={count}
        onPublicationSelect={handlePublicationSelect}
      />
    </aside>
  );
};

export default LiveUpdatesFeed;
