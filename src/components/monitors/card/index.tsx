import { FC } from 'react';

import Link from 'next/link';

import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';
import { LuRefreshCcw } from 'react-icons/lu';

import cn from '@/lib/classnames';

import { Monitor } from '@/types/monitors';

import { TAG_STYLE } from '@/styles/constants';

import MonitorDialog from '../dialog';

const MonitorCard: FC<Partial<Monitor> & { color?: string }> = (monitor) => {
  const { id, description, title, color, ready, theme } = monitor;
  return (
    <div
      className="h-[388px] w-[384px] space-y-4 px-10 py-6 text-brand-500"
      style={{ backgroundColor: color }}
      data-testid={`card-${id}`}
    >
      <div className="space-y-2">
        <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
          <span>monitor</span> | <span className="capitalize">#{theme || 'Unknown'}</span>
        </div>
        <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
      </div>

      {description && <p data-testid={`card-description-${id}`}>{description}</p>}

      {ready ? (
        <div className="flex items-center space-x-2">
          <MonitorDialog {...monitor} />
          <Link
            href={`/map/${id}/datasets`}
            data-testid={`card-link-${id}`}
            className={cn(
              'flex items-center space-x-2.5 py-2 text-xs font-bold transition-colors hover:underline'
            )}
          >
            <HiOutlineArrowTopRightOnSquare className="h-5 w-5" />
            <span className="hover:underline ">Go to monitor</span>
          </Link>
        </div>
      ) : (
        <div>
          <div className="float-left flex items-center space-x-2 rounded-md bg-black/10 px-3 py-2 leading-none">
            <LuRefreshCcw className="h-5 w-5" />
            <span className="text-xs">Monitor under-development</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitorCard;
