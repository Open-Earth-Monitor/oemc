import Link from 'next/link';

import { UseCase } from '@/types/monitors-and-geostories';

const DoiBadge: React.FC<{
  doi: UseCase['doi'][number];
}> = ({ doi }) => {
  const d = doi.split('https://doi.org/')[1];

  if (!d) return null;

  return (
    <Link
      href={doi}
      target="_blank"
      key={d}
      className="text-white flex overflow-hidden whitespace-nowrap rounded-l-md text-xs font-medium"
    >
      <div>
        <span className="bg-[#5C5C5C] px-1.5">DOI</span>
        <span className="rounded-r-md bg-[#2282C2] px-1.5">{d}</span>
      </div>
    </Link>
  );
};

export default DoiBadge;
