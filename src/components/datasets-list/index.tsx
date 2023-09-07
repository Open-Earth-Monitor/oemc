'use client';

import { LayerTypes } from '@/types/datasets';

import DatasetsItem from './datasets-item';

export const DatasetsList = ({ data }: { data: LayerTypes[] }) => (
  <div className="pl-4 text-secondary-200">
    <ul>
      {data.map(({ layer_id, title, description, filename, download_url, range }) => (
        <DatasetsItem
          key={layer_id}
          layer_id={layer_id}
          title={title}
          description={description}
          downloadUrlBase={download_url}
          filename={filename}
          range={range}
        />
      ))}
    </ul>
  </div>
);

export default DatasetsList;
