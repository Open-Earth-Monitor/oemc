'use client';

import { byPublicationDateDesc, type Publication } from '@/hooks/publications';

import PublicationCompactCard from '@/components/publications/compact-card';

/** Entries shown under the carousel; the panel is a narrow column, not a page. */
export const DEFAULT_PUBLICATIONS_SHOWN = 2;

/**
 * Newest first, but one per library before a second from either: Zotero entries
 * currently carry later dates than anything on Zenodo, so a plain date sort
 * fills the two slots with Zotero and Zenodo never shows. Falls back to whatever
 * is available when one library is empty or down.
 */
const pickAcrossLibraries = (publications: Publication[], limit: number) => {
  const queues = new Map<Publication['source'], Publication[]>();

  publications.forEach((publication) => {
    const queue = queues.get(publication.source) ?? [];
    queue.push(publication);
    queues.set(publication.source, queue);
  });

  const picked: Publication[] = [];

  while (picked.length < limit) {
    const round = [...queues.values()].map((queue) => queue.shift()).filter(Boolean);
    if (!round.length) break;

    picked.push(...round.slice(0, limit - picked.length));
  }

  return picked.sort(byPublicationDateDesc);
};

/**
 * The latest publications, listed under the live feed carousel rather than mixed
 * into its slides: they are a different kind of thing from a Mastodon post and
 * were unreachable without paging through the whole feed.
 *
 * Renders nothing when both libraries come back empty — a failing library should
 * cost the panel a section, not leave an empty heading behind.
 */
export const GlobePublications = ({
  data,
  limit = DEFAULT_PUBLICATIONS_SHOWN,
  onSelect,
  dropExtraWhenShort = false,
}: {
  data?: Publication[];
  limit?: number;
  onSelect?: (publication: Publication) => void;
  /**
   * Keep only the first entry on short viewports. For the globe panel, which is
   * boxed in by the footer and cannot scroll; the drawer takes all the height
   * there is above the footer and scrolls the remainder, so it shows both.
   */
  dropExtraWhenShort?: boolean;
}) => {
  const publications = pickAcrossLibraries(data ?? [], limit);

  if (!publications.length) return null;

  return (
    <section className="space-y-3" data-testid="globe-publications">
      <p className="font-medium text-white-500">Latest publications.</p>

      <ul className="space-y-2">
        {publications.map((publication, index) => (
          <li
            key={publication.id}
            // Under ~900px of viewport the panel has room for one entry beside a
            // post; a second would squeeze the carousel to nothing.
            className={
              dropExtraWhenShort && index > 0 ? '[@media(max-height:899px)]:hidden' : undefined
            }
          >
            <PublicationCompactCard publication={publication} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GlobePublications;
