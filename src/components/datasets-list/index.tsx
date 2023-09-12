'use client';

import { LayerTypes } from '@/types/datasets';

import DatasetsItem from './datasets-item';

export const DatasetsList = ({ data }: { data: LayerTypes[] }) => (
  <div className="pl-4 text-secondary-500">
    <ul>
      {data.map(({ layer_id }) => (
        <DatasetsItem key={layer_id} layer_id={layer_id} />
      ))}
    </ul>
  </div>
);

export default DatasetsList;
