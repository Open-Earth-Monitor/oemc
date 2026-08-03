'use client';

import { useTrackEvent, type EventSource } from '@/lib/analytics';

import { useLatestPublications, type Publication } from '@/hooks/publications';

import Loading from '@/components/loading';
import PublicationCard from '@/components/publications/card';

const RecentPublications = ({ source, className }: { source: EventSource; className?: string }) => {
  const { data, isLoading } = useLatestPublications();
  const trackEvent = useTrackEvent();

  const handleSelect = (publication: Publication) =>
    trackEvent('Publication Open', {
      props: {
        publication_source: publication.source,
        title: publication.title,
        source,
      },
    });

  if (isLoading) {
    return (
      <div className={className}>
        <Loading className="relative flex h-16 w-full items-center justify-center" />
      </div>
    );
  }

  // Both feeds failed or are empty — drop the section rather than show an
  // empty heading.
  if (!data.length) return null;

  return (
    <section className={`flex flex-col ${className ?? ''}`} data-testid="recent-publications">
      <h3 className="shrink-0 text-sm font-medium text-white-500">Recent publications</h3>

      {/* Scrolls only when the column runs out of room, which keeps the section
          from pushing past the bottom of the viewport on short screens. */}
      <ul className="pointer-events-auto mt-2 min-h-0 space-y-2 overflow-y-auto">
        {data.map((publication) => (
          <li key={publication.id}>
            <PublicationCard publication={publication} onSelect={handleSelect} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentPublications;
