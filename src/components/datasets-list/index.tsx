'use client';

import { LayerTypes } from '@/types/datasets';

import DatasetsItem from './datasets-item';

export const DatasetsList = ({ data }: { data: LayerTypes[] }) => (
  <div className="pl-4 text-secondary-200">
    <ul>
      {data.map(({ layer_id, title, description }) => (
        <DatasetsItem key={layer_id} layer_id={layer_id} title={title} description={description} />
      ))}
    </ul>
  </div>
);

export default DatasetsList;
