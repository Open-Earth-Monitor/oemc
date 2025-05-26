import { FC } from 'react';

import Link from 'next/link';

import { LuRefreshCcw, LuArrowRight } from 'react-icons/lu';

import { Geostory } from '@/types/geostories';

import { postWebTraffic } from '@/hooks/web-traffic';

import { TAG_STYLE } from '@/styles/constants';

import GeostoryDialog from '../dialog';

const GeostoryCard: FC<Partial<Geostory> & { color?: string; colorHead?: string }> = (geostory) => {
  const { id, title, color, ready, theme, monitors } = geostory;

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
      <div className="flex h-full flex-1 flex-col justify-between space-y-11 p-7">
        <div className="space-y-3">
          <div data-testid={`card-type-${id}`} className={TAG_STYLE}>
            <span>geostory</span> |{' '}
            <span className="capitalize" style={{ color: ready ? color : '#000' }}>
              #{theme || 'Unknown'}
            </span>
          </div>
          <h2
            data-testid={`card-title-${id}`}
            className="font-satoshi text-2xl font-bold group-hover:underline"
            style={{ color: ready ? color : '#000' }}
          >
            {title}
          </h2>
        </div>

        {ready ? (
          <div className="flex h-full flex-1 flex-col justify-between space-y-4">
            {!!monitors?.length && (
              <div className="items-center border-t border-white-900 text-xs">
                <span className="inline-block py-4 font-medium uppercase leading-[1.2]">
                  monitor
                </span>
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
            <div className="flex items-center justify-between">
              <GeostoryDialog {...geostory} />
              <div
                className="rounded-full bg-white-950 p-2 group-hover:bg-white-500 group-hover:text-black-500"
                data-testid={`card-${id}`}
              >
                <LuArrowRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-black/10 float-left flex items-center space-x-2 rounded-md px-3 py-2 leading-none">
              <LuRefreshCcw className="h-5 w-5" />
              <span className="text-xs font-bold">Geostory under-development</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default GeostoryCard;
