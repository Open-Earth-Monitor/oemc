import { FC } from 'react';

import Link from 'next/link';

import cn from '@/lib/classnames';

import { Monitor } from '@/types/monitors';

const Card: FC<Monitor> = ({ title, id, description }) => (
  <div
    className="h-[388px] w-[384px] space-y-6 bg-green-300 p-6"
    data-testid={`dataset-item-${id}`}
  >
    <div>
      <span className="text-xs uppercase">monitor</span>
      <h2 data-testid="dataset-title" className="font-satoshi text-2xl font-bold">
        {title}
      </h2>
    </div>

    <p data-testid="dataset-description">{description}</p>

    <Link
      href={`/map/${id}/datasets`}
      data-testid="dataset-layer-toggle-button"
      className={cn(
        'flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-brand-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20'
      )}
    >
      Explore monitor
    </Link>
  </div>
);

export default Card;
