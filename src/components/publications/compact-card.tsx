import { ArrowUpRight } from 'lucide-react';

import cn from '@/lib/classnames';

import type { Publication } from '@/hooks/publications';

import { formatPublicationDate, SOURCE_LABEL } from '@/components/publications/card';

/**
 * The publications row under the live feed carousel, where vertical space is a
 * few dozen pixels per entry: source, title and date only. Abstracts and author
 * lists live on the full card (`@/components/publications/card`).
 */
export const PublicationCompactCard = ({
  publication,
  onSelect,
  className,
}: {
  publication: Publication;
  onSelect?: (publication: Publication) => void;
  className?: string;
}) => {
  const { title, date, url, source, description } = publication;
  const formattedDate = formatPublicationDate(date);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onSelect?.(publication)}
      className={cn(
        'group/publication pointer-events-auto flex items-start justify-between gap-3 rounded-2xl border border-black-100 bg-black-500 p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green',
        className
      )}
      data-testid={`publication-card-${source}`}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2 text-[11px] font-medium">
          <span className="text-accent-green">{SOURCE_LABEL[source]}</span>
          {!!formattedDate && <span className="text-white-500/60">{formattedDate}</span>}
        </div>

        <h4 className="line-clamp-2 text-xs font-medium leading-snug text-white-500 group-hover/publication:underline">
          {title}
        </h4>

        {/* Not every entry has an abstract — Zotero often omits it. Dropped on
            short viewports, where the room it takes costs a whole entry. */}
        {!!description && (
          <p className="line-clamp-2 text-xs leading-snug text-white-500/80 [@media(max-height:899px)]:hidden">
            {description}
          </p>
        )}
      </div>

      <ArrowUpRight
        size={16}
        className="shrink-0 text-accent-green"
        aria-hidden
        focusable="false"
      />
    </a>
  );
};

export default PublicationCompactCard;
