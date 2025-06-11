import { FC } from 'react';

import Link from 'next/link';

import { Geostory } from '@/types/geostories';

import { postWebTraffic } from '@/hooks/web-traffic';

import { DatasetCard, CardHeader, CardFooter } from '@/components/card-landing';

import GeostoryDialog from '../dialog';

const GeostoryCard: FC<Partial<Geostory> & { color?: string; colorHead?: string }> = (geostory) => {
  const { id, monitors } = geostory;

  const handleClick = (key) => {
    postWebTraffic({
      [key]: id,
    });
    console.info('WT1 -', key, id);
  };

  return (
    <Link
      href={`/map/geostories/${id}`}
      data-value="geostory_id"
      data-testid={`card-${id}`}
      className="group flex h-[456px] transform cursor-pointer flex-col justify-between bg-white-950 text-white-500 transition-transform duration-300 hover:-translate-y-4"
      onClick={handleClick}
    >
      <DatasetCard type="geostory" {...geostory}>
        <CardHeader type="geostory" {...geostory} />

        <div className="flex h-full flex-1 flex-col justify-between space-y-4">
          {!!monitors?.length && (
            <div className="items-center border-t border-white-900 text-xs">
              <span className="inline-block py-4 font-medium uppercase leading-[1.2]">monitor</span>
              <ul className="space-y-3">
                {monitors.map((monitor) => (
                  <li
                    data-testid={`geostory-card-monitor-title-${id}`}
                    key={`geostory-card-monitor-link-${monitor.id}`}
                    className="underline"
                  >
                    {monitor.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <CardFooter id={geostory.id}>
            <GeostoryDialog {...geostory} />
          </CardFooter>
        </div>
      </DatasetCard>
    </Link>
  );
};

export default GeostoryCard;
