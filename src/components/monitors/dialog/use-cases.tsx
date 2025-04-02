import { HiOutlineGlobeAlt } from 'react-icons/hi';
import type { Monitor } from '@/types/monitors';
import { UseCase } from '@/types/monitors-and-geostories';
import DoiBadge from '@/components/doi-badge';

const UseCasesUnit: React.FC<UseCase> = ({ title, url, doi }: UseCase) => (
  <li className="flex flex-col space-y-2">
    <a
      href={url}
      className="underline"
      target="_blank"
      rel="noopener noreferrer"
      title={url ? title : 'empty link'}
    >
      {title}
    </a>
    <span className="flex flex-wrap gap-1">
      {doi && !!doi.length && doi.map((d) => (d !== 'DOI NOT READY' ? <DoiBadge doi={d} /> : null))}
    </span>
  </li>
);

const UseCases: React.FC<{ items: Monitor['use_case_link'] }> = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-brand-500 py-6">
      <h3 className="flex items-center space-x-2">
        <HiOutlineGlobeAlt className="h-6 w-6" />
        <span className="text-2xl font-bold">Use cases</span>
      </h3>
      <ul className="space-y-2 py-2 pl-8 font-bold">
        {items.map((props, index) => (
          <UseCasesUnit key={index} {...props} />
        ))}
      </ul>
    </div>
  );
};

export default UseCases;
