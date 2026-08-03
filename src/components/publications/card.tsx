import { ArrowUpRight } from 'lucide-react';

import type { Publication } from '@/hooks/publications';

const SOURCE_LABEL: Record<Publication['source'], string> = {
  zenodo: 'Zenodo',
  zotero: 'Zotero',
};

/**
 * Zotero dates are freeform (`2026`, `July 2026`, `2026-12-31`), so anything
 * unparseable is shown as stored rather than dropped or guessed at.
 */
export const formatPublicationDate = (date: string | null) => {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const PublicationCard = ({
  publication,
  onSelect,
}: {
  publication: Publication;
  onSelect?: (publication: Publication) => void;
}) => {
  const { title, authors, date, url, type, source } = publication;
  const formattedDate = formatPublicationDate(date);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onSelect?.(publication)}
      className="group/publication pointer-events-auto block rounded-2xl border border-black-100 bg-black-500 p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green"
      data-testid={`publication-card-${source}`}
    >
      <div className="flex items-center justify-between gap-2 text-[11px] font-medium">
        <span className="text-accent-green">{SOURCE_LABEL[source]}</span>
        {!!type && <span className="text-white-500/60">{type}</span>}
      </div>

      <h4 className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-white-500 group-hover/publication:underline">
        {title}
      </h4>

      {!!authors.length && (
        <p className="mt-1 line-clamp-1 text-[11px] text-white-500/60">{authors.join('; ')}</p>
      )}

      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-white-500/60">
        <span>{formattedDate}</span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-accent-green"
          aria-hidden
          focusable="false"
        />
      </div>
    </a>
  );
};

export default PublicationCard;
