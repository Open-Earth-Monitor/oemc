import { FC } from 'react';

import Link from 'next/link';

import type { CategoryId } from '@/constants/categories';

export type ThemeQueryParam = CategoryId[] | [];

type ItemProps = {
  id: string;
  title: string;
  theme: ThemeQueryParam;
  color: string;
  type: 'monitor' | 'geostory';
};
const WebTrafficRankingContentItem: FC<ItemProps> = ({
  title,
  theme,
  color,
  type,
  id,
}: ItemProps) => {
  return (
    <li key={title} className="relative flex h-full space-x-4 bg-white-950 p-6 font-medium">
      <Link href={`/${type}/${id}`}>
        <span style={{ backgroundColor: color }} className="absolute bottom-0 left-0 top-0 w-1" />

        <div>
          <div className="flex items-start space-x-3 divide-x divide-white-900">
            <span className="inline-flex capitalize">{type}</span>
            <span className="inline-flex pl-3" style={{ color }}>
              {theme}
            </span>
          </div>
          <p className="text-2xl" style={{ color }}>
            {title}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default WebTrafficRankingContentItem;
