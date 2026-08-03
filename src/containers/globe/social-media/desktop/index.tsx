'use client';

import { orderBy } from 'lodash-es';

import { useTrackEvent, type EventSource } from '@/lib/analytics';

import { useLatestPublications, type Publication } from '@/hooks/publications';
import { useSocialMedia } from '@/hooks/social-media';

import SocialMediaDesktop from '@/containers/globe/social-media/desktop/carousel';

import Loading from '@/components/loading';

import { toFeedItems } from '../feed-items';

const SocialMediaFeed = ({ source = 'landing-globe' }: { source?: EventSource }) => {
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
  const { data: publications } = useLatestPublications();
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
    <aside className="h-fit">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      <SocialMediaDesktop
        data={toFeedItems(data, publications)}
        onPublicationSelect={handlePublicationSelect}
      />
    </aside>
  );
};

export default SocialMediaFeed;
