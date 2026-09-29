import { LuLink } from 'react-icons/lu';

import type { Monitor } from '@/types/monitors';
import { UseCase } from '@/types/monitors-and-geostories';

import DoiBadge, { isDoiResolverUrl, parseDoi } from '@/components/doi-badge';

/**
 * One use case. The title links to `url` whenever there is one, including a
 * DOI resolver address. Every minted DOI is also shown as a badge that links
 * to `https://doi.org/<code>`; a DOI that only appears in `url` gets a badge
 * too. Blank DOIs, the "not ready" placeholder and ordinary web addresses
 * never become badges.
 */
const UseCasesUnit: React.FC<UseCase> = ({ title, url, doi }) => {
  const dois = Array.from(new Set((doi ?? []).map(parseDoi).filter(Boolean)));
  // A use case whose only link is a resolver address has its DOI in the url.
  const urlDoi = isDoiResolverUrl(url) ? parseDoi(url) : '';
  if (urlDoi && !dois.includes(urlDoi)) dois.push(urlDoi);

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
      {url ? (
        <a
          href={url}
          className="hover:text-brand-700 flex min-w-0 flex-1 basis-60 items-start gap-2 text-brand-500"
          target="_blank"
          rel="noopener noreferrer"
          title={title}
        >
          <LuLink className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="underline">{title || url}</span>
        </a>
      ) : (
        <span className="min-w-0 flex-1 basis-60 text-brand-500">{title}</span>
      )}
      {dois.length > 0 && (
        <span className="flex max-w-full flex-wrap justify-start gap-1">
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
        <div className="space-y-4 py-2 font-bold">
          {items.map((props, index) => (
            <UseCasesUnit key={index} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCases;
