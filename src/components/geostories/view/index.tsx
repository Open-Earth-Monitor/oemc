import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Geostory } from '@/types/geostories';
import { LayerParsed } from '@/types/layers';

import DatasetCard from '@/components/datasets/card';
import CardHeader from '@/components/sidebar/card-header';

import GeostoryDialog from '../dialog';

interface GeostoriesViewProps {
  data: Geostory & {
    geostory_bbox: number[];
    color: string;
  };
  geostoryLayers: LayerParsed[];
}

const GeostoriesView: FC<GeostoriesViewProps> = ({ data, geostoryLayers }) => {
  const { title, theme, color, id, description, monitors, geostory_bbox } = data || {};

  return (
    <>
      <div className="relative space-y-6 py-3">
        <p>{description}</p>
        <div className="space-y-4">
          {/* Geostory image */}
          {data?.id && (
            <Image
              src={`/images/geostories/${data?.id}.jpg`}
              alt={data?.title || 'geostory'}
              className="h-auto w-full py-4"
              width={300}
              height={200}
            />
          )}
          <GeostoryDialog {...data} />
        </div>
      </div>
      {/* Datasets/layers cards */}
      {!!geostoryLayers?.length ? (
        <div className="border-t border-white-900">
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
        <p>No layers available for this geostory.</p>
      )}
      {/* Monitors list */}
      {!!monitors?.length && (
        <div className="space-y-4 pt-1 text-xs">
          <p>Monitors</p>
          <ul className="space-y-2.5">
            {monitors.map((monitor) => (
              <li key={monitor.id} className="font-bold underline">
                <Link href={`/explore/monitor/${monitor.id}`}>{monitor.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default GeostoriesView;
