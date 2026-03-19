import { FC } from 'react';

import type { GeostoryParsed } from '@/types/geostories';

import { CATEGORIES_COLORS } from '@/constants/categories';

import GeostoryDialog from '@/components/geostories/dialog';

import { TAG_STYLE } from '@/styles/constants';

const GeostoryHeader: FC<GeostoryParsed> = (data) => (
  <div className="space-y-6 p-6 text-secondary-500">
    <div className={TAG_STYLE} style={{ color: CATEGORIES_COLORS[data.theme].base }}>
      geostory
    </div>
    <h1 className="font-satoshi text-3xl font-bold sm:text-4xl ">{data.title}</h1>
    <p className="font-light sm:text-xl">{data.description}</p>
    <div className="flex items-center">
      <GeostoryDialog {...data} />
    </div>
  </div>
);

export default GeostoryHeader;
