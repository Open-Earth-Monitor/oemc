import { LuLink } from 'react-icons/lu';

import type { Monitor } from '@/types/monitors';
import { UseCase } from '@/types/monitors-and-geostories';

import DoiBadge, { isDoiResolverUrl, parseDoi } from '@/components/doi-badge';

/**
 * One use case. A minted DOI is the citation, so it is shown as a DOI badge,
 * which links to the resolver. A `url` is shown as a plain link unless it is
 * just the DOI's own resolver address (the API sends both for the same
 * publication). Blank DOIs, the "not ready" placeholder and ordinary web
 * addresses never become badges.
 */
const UseCasesUnit: React.FC<UseCase> = ({ title, url, doi }) => {
  const dois = Array.from(new Set((doi ?? []).map(parseDoi).filter(Boolean)));
  // A use case whose only link is a resolver address has its DOI in the url.
  const urlDoi = isDoiResolverUrl(url) ? parseDoi(url) : '';
  if (urlDoi && !dois.includes(urlDoi)) dois.push(urlDoi);

  const showLink = !!url && !urlDoi;

  return (
    <div className="flex items-start justify-between gap-8">
      {showLink ? (
        <a
          href={url}
          className="hover:text-brand-700 flex items-start gap-2 text-brand-500"
          target="_blank"
          rel="noopener noreferrer"
          title={title}
        >
          <LuLink className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="underline">{title || url}</span>
        </a>
      ) : (
        <span className="text-brand-500">{title}</span>
      )}
      {dois.length > 0 && (
        <span className="flex shrink-0 flex-wrap justify-end gap-1">
          {dois.map((d) => (
            <DoiBadge doi={d} key={d} />
          ))}
        </span>
      )}
    </div>
  );
};

const UseCases: React.FC<{ items: Monitor['use_case_link'] }> = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-brand-500 py-4">
      <div className="flex flex-col space-y-6">
        <p className="whitespace-nowrap text-xl font-medium">Use cases:</p>
        <div className="space-y-2 py-2 font-bold">
          {items.map((props, index) => (
            <UseCasesUnit key={index} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCases;
