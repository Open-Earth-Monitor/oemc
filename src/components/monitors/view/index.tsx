import { FC } from 'react';

import { LayerParsed } from '@/types/layers';
import { Monitor } from '@/types/monitors';

import DatasetCard from '@/components/datasets/card';
import MonitorDialog from '@/components/monitors/dialog';
import DatasetCardGeostory from '@/components/sidebar/card-geostory-content';

interface MonitorViewProps {
  data: Monitor & {
    monitor_bbox: number[];
    color: string;
  };
  geostoryLayers: LayerParsed[];
}

const MonitorView: FC<MonitorViewProps> = ({ data, geostoryLayers }) => {
  const { color, description, geostories } = data || {};

  return (
    <>
      <div className="relative space-y-6 py-3">
        <p>{description}</p>
        <div className="space-y-4">
          <MonitorDialog {...data} />
        </div>
      </div>
      {/* Datasets/layers cards */}
      {!!geostoryLayers?.length ? (
        <div>
          <h2 className="py-2 font-medium">Datasets</h2>
          <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
            {geostoryLayers?.map((dataset) => {
              return (
                <li key={dataset?.layer_id}>
                  <DatasetCard
                    {...dataset}
                    id={dataset?.layer_id}
                    isGeostory={false}
                    color={color}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>No layers available for this monitor.</p>
      )}
      {/* Geostories cards */}
      {!!geostories?.length && (
        <div>
          <h2 className="py-2 font-medium">Geostories</h2>
          <ul className="space-y-4 sm:space-y-6" data-testid="geostories-list">
            {geostories?.map((geostory) => {
              return (
                <li key={geostory?.id}>
                  <DatasetCardGeostory {...geostory} color={color} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default MonitorView;
