'use client';

import { orderBy } from 'lodash-es';

import { useTrackEvent, type EventSource } from '@/lib/analytics';

import {
  useLatestPublications,
  DEFAULT_PUBLICATIONS_PER_SOURCE,
  type Publication,
} from '@/hooks/publications';
import { useSocialMedia } from '@/hooks/social-media';

import SocialMediaDesktop from '@/containers/globe/live-updates/desktop/carousel';
import GlobePublications from '@/containers/globe/live-updates/publications';

import Loading from '@/components/loading';

const LiveUpdatesFeed = ({
  source = 'landing-globe',
  publicationsPerSource = DEFAULT_PUBLICATIONS_PER_SOURCE,
}: {
  source?: EventSource;
  /** Publications fetched from *each* library (Zenodo, Zotero) for the list. */
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

  // Publications sit under the carousel in their own list; a slow or failing
  // library costs the panel that section, never the posts.
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
    <aside className="flex min-h-0 flex-1 flex-col">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      <SocialMediaDesktop data={data}>
        <GlobePublications
          data={publications}
          onSelect={handlePublicationSelect}
          dropExtraWhenNarrow
        />
      </SocialMediaDesktop>
    </aside>
  );
};

export default LiveUpdatesFeed;
