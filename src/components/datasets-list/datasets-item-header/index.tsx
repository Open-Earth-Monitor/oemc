'use client';

import { FC } from 'react';

import { HiOutlineShare } from 'react-icons/hi';
import { HiArrowDownTray } from 'react-icons/hi2';

import Info from '@/components/datasets-list/datasets-item-info';

type DatasetsItemHeaderTypes = {
  layer_id: string;
  title: string;
  info?: string;
  downloadUrlBase?: string;
};
export const DatasetsItemHeader: FC<DatasetsItemHeaderTypes> = ({
  layer_id,
  title,
  downloadUrlBase,
}) => (
  <div className="flex items-start justify-between">
    <h3 className="text-2xl">{title}</h3>
    <div className="flex items-baseline space-x-2 pt-2">
      <Info layer_id={layer_id} />
      {!!downloadUrlBase && (
        <a href={downloadUrlBase} target="_blank" rel="noopener noreferrer">
          <HiArrowDownTray className="h-6 w-6 text-gray-300" />
        </a>
      )}
      {<HiOutlineShare className="h-6 w-6 text-gray-300" />}
    </div>
  </div>
);

export default DatasetsItemHeader;
