'use client';

import { FC } from 'react';

import { LayerTypes } from '@/types/datasets';

import DatasetsItem from './datasets-item';

export const DatasetsList: FC<{ data: LayerTypes[] }> = ({ data }) => (
  <div className="pl-4 text-secondary-500">
    <ul>
      {data.map(({ layer_id }) => (
        <DatasetsItem key={layer_id} layer_id={layer_id} />
      ))}
    </ul>
  </div>
);

export default DatasetsList;
