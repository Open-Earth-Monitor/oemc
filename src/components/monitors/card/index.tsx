import { FC } from 'react';

import Link from 'next/link';

import { Monitor } from '@/types/monitors';

import { postWebTraffic } from '@/hooks/web-traffic';

import { DatasetCard, CardHeader, CardFooter } from '@/components/card-landing';

import MonitorDialog from '../dialog';

const MonitorCard: FC<Partial<Monitor> & { color?: string }> = (monitor) => {
  const { id, description } = monitor;
  const handleClick = () => {
    postWebTraffic({
      monitor_id: id,
    });
    console.info('WT6 -', 'monitors', id);
  };

  return (
    <Link
      href={`/map/${id}/datasets`}
      data-testid={`card-link-${id}`}
      className="group flex h-[456px] transform cursor-pointer flex-col justify-between bg-white-950 text-white-500 transition-transform duration-300 hover:-translate-y-4"
      style={{ borderTop: `2px solid ${monitor.color || '#000'}` }}
      onClick={handleClick}
    >
      <DatasetCard type="monitor" {...monitor}>
        <CardHeader type="monitor" {...monitor} />
        {description && (
          <p
            className="hidden text-xs leading-[1.5] sm:block"
            data-testid={`card-description-${id}`}
          >
            {description}
          </p>
        )}

        <CardFooter id={monitor.id}>
          <MonitorDialog {...monitor} />
        </CardFooter>
      </DatasetCard>
    </Link>
  );
};

export default MonitorCard;
