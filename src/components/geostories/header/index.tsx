import { FC } from 'react';

import type { GeostoryParsed } from '@/types/geostories';

import { THEMES_COLORS } from '@/constants/themes';

import GeostoryDialog from '@/components/geostories/dialog';
import { TAG_STYLE } from '@/styles/constants';

const GeostoryHeader: FC<GeostoryParsed> = (data) => (
  <div className="space-y-6 p-6">
    <div className={TAG_STYLE} style={{ color: THEMES_COLORS[data.theme].base }}>
      geostory
    </div>
    <h1 className="font-satoshi text-4xl font-bold">{data.title}</h1>
    <p className="text-xl font-light">{data.description}</p>
    <div className="flex items-center">
      <GeostoryDialog {...data} />
    </div>
  </div>
);

export default GeostoryHeader;
