import { FC } from 'react';

import Link from 'next/link';

import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

import cn from '@/lib/classnames';

import { Geostory } from '@/types/geostories';

const Card: FC<Partial<Geostory> & { color?: string; headColor?: string }> = ({
  title,
  id,
  layers,
  color,
  headColor,
}) => (
  <div
    className="min-h-[388px] w-[384px]"
    style={{ backgroundColor: color }}
    data-testid={`dataset-item-${id}`}
  >
    <div className="space-y-6 p-6 text-secondary-500" style={{ backgroundColor: headColor }}>
      <div>
        <span className="text-xs uppercase">geostories</span>
        <h2 data-testid="dataset-title" className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
      </div>
      <Link
        href={`/map/geostories/${id}`}
        data-testid="dataset-layer-toggle-button"
        className={cn(
          'flex items-center space-x-4 py-2 text-xs font-bold text-secondary-500 transition-colors hover:bg-secondary-500/20'
        )}
      >
        <HiOutlineArrowTopRightOnSquare className="h-5 w-5" />
        <span>Go to geostory</span>
      </Link>
    </div>
    <div className="p-6">
      <span className="text-xs font-medium uppercase">monitor</span>
      <ul>
        {layers.map(({ title }) => (
          <li key={id}>
            <Link href={`/map/${id}/datasets`} className="font-bold underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Card;
