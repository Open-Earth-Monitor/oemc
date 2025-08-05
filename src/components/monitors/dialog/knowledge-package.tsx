import { LuLink } from 'react-icons/lu';

import cn from '@/lib/classnames';

import type { Monitor } from '@/types/monitors';
import { UseCase } from '@/types/monitors-and-geostories';

import DoiBadge from '@/components/doi-badge';

const UseCasesUnit: React.FC<UseCase> = ({ title, url, doi }: UseCase) => (
  <div
    key={title}
    className={cn('grid grid-cols-2 items-start justify-between gap-8 space-y-2', {
      flex: !doi?.length,
    })}
  >
    <a
      href={url}
      className="hover:text-brand-700 flex items-start gap-2 text-brand-500"
      target="_blank"
      rel="noopener noreferrer"
      title={url ? title : 'empty link'}
    >
      <LuLink className="h-6 w-6 shrink-0" />
      <span className="underline">{title || url}</span>
    </a>
    <span className="flex flex-wrap gap-1">
      {doi &&
        !!doi.length &&
        doi.map((d) =>
          d !== 'DOI NOT READY' ? (
            <div className="flex w-full justify-end" key={d}>
              <DoiBadge doi={d} key={d} />
            </div>
          ) : null
        )}
    </span>
  </div>
);

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
