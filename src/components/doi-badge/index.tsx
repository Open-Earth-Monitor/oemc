import Link from 'next/link';

import { UseCase } from '@/types/monitors-and-geostories';

const DOI_RESOLVER = /^https?:\/\/(?:dx\.)?doi\.org\//i;

/** Every DOI starts with a `10.` prefix, a registrant number and a slash. */
const DOI_CODE = /^10\.\d{4,9}\/\S+$/i;

/**
 * The bare DOI in a value that may be either the code (`10.60566/ptm29-yhr16`)
 * or the resolver link (`https://doi.org/10.60566/ptm29-yhr16`); the API sends
 * both forms. Empty for anything that is not a DOI: blanks, the API's
 * "DOI NOT READY" placeholder, or an ordinary web address.
 */
export const parseDoi = (value?: string | null): string => {
  const code = (value ?? '').trim().replace(DOI_RESOLVER, '');
  return DOI_CODE.test(code) ? code : '';
};

export const isDoiResolverUrl = (url?: string | null) => !!url && DOI_RESOLVER.test(url.trim());

const DoiBadge: React.FC<{
  doi: UseCase['doi'][number];
}> = ({ doi }) => {
  const code = parseDoi(doi);

  if (!code) return null;

  return (
    <Link
      href={`https://doi.org/${code}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white flex overflow-hidden whitespace-nowrap rounded-l-md text-xs font-medium"
    >
      <div>
        <span className="bg-[#5C5C5C] px-1.5">DOI</span>
        <span className="rounded-r-md bg-[#2282C2] px-1.5">{code}</span>
      </div>
    </Link>
  );
};

export default DoiBadge;
