import { FC } from 'react';

import Image from 'next/image';
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
      className="flex min-h-[260px] flex-col justify-between px-6 py-6 text-brand-500 sm:h-[468px] sm:px-8"
      style={{ backgroundColor: color, color: ready && '#000' }}
      data-testid={`card-${id}`}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
            <span>monitor</span> | <span className="capitalize">#{theme || 'Unknown'}</span>
          </div>
          <h2 data-testid={`card-title-${id}`} className="font-satoshi text-2xl font-bold">
            {title}
          </h2>
        </div>

        {description && (
          <p className="hidden sm:block" data-testid={`card-description-${id}`}>
            {description}
          </p>
        )}

        {ready ? (
          <div className="flex items-center space-x-2 sm:space-x-8">
            <MonitorDialog {...monitor} />
            <Link
              href={`/map/${id}/datasets`}
              data-testid={`card-link-${id}`}
              className={cn(
                'sm:tno-underline flex items-center space-x-2.5 py-2 font-bold underline transition-colors hover:underline sm:text-xs'
              )}
            >
              <HiOutlineArrowTopRightOnSquare className="hidden h-5 w-5 sm:flex" />
              <span className="hover:underline">Go to monitor</span>
            </Link>
          </div>
        ) : (
          <div>
            <div className="float-left flex items-center space-x-2 rounded-md bg-black/10 px-3 py-2 leading-none">
              <LuRefreshCcw className="h-5 w-5" />
              <span className="text-xs font-bold">Monitor under-development</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <div className="relative h-[40px] w-[40px] sm:h-[60px] sm:w-[60px]">
          <Image src={`/svgs/theme-icons/${theme?.toLowerCase()}.svg`} fill alt={theme} />
        </div>
      </div>
    </div>
  );
};

export default MonitorCard;
