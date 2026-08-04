'use client';

import { useMemo } from 'react';

import { orderBy } from 'lodash-es';

import { useTrackEvent, type EventSource } from '@/lib/analytics';

import {
  useLatestPublications,
  DEFAULT_PUBLICATIONS_PER_SOURCE,
  type Publication,
} from '@/hooks/publications';
import { useSocialMedia } from '@/hooks/social-media';

import SocialMediaDesktop from '@/containers/globe/live-updates/desktop/carousel';
import { toFeedItems } from '@/containers/globe/live-updates/feed-items';

import Loading from '@/components/loading';

const LiveUpdatesFeed = ({
  source = 'landing-globe',
  publicationsPerSource = DEFAULT_PUBLICATIONS_PER_SOURCE,
}: {
  source?: EventSource;
  /** Publications fetched from *each* library (Zenodo, Zotero) for the carousel. */
  publicationsPerSource?: number;
}) => {
  const { data, isLoading } = useSocialMedia(null, {
    select: (data) => {
      const orderedData = orderBy(data, 'created_at', 'desc');
      const postsIds = orderedData.map((post) => post.id);
      const filteredData = orderedData.filter((post) => !postsIds.includes(post.reblog?.id));
      return filteredData;
    },
  });

  // Publications share the carousel with the posts; a slow or failing library
  // just means fewer slides, never a blocked feed.
  const { data: publications } = useLatestPublications({ perSource: publicationsPerSource });
  const trackEvent = useTrackEvent();

  // The merge and sort only depend on the two queries, so they should not re-run
  // when this component re-renders for any other reason.
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
      <SocialMediaDesktop data={feedItems} onPublicationSelect={handlePublicationSelect} />
    </aside>
  );
};

export default LiveUpdatesFeed;
