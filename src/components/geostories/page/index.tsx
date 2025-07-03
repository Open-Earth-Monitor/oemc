'use client';

import { useEffect, useMemo } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import Loading from '@/components/loading';

import CardHeader from '@/components/sidebar/card-header';
import GeostoryDialog from '../dialog';
import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';
import DatasetCard from '@/components/datasets/card';

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const { data: geostoryData, isLoading: isGeostoryLoading } = useGeostoryParsed({ geostory_id });
  const { data: layersData } = useGeostoryLayers({ geostory_id });

  // Only show layers with position right
  const geostoryLayers = useMemo(
    () => layersData?.filter(({ position }) => position === 'right'),
    [layersData]
  );
  const comparisonLayer = useMemo(
    () => layersData?.find(({ position }) => position === 'left'),
    [layersData]
  );

  useEffect(() => {
    if (geostoryLayers?.length && !layers) {
      void setLayers(
        [
          {
            id: geostoryLayers[0].layer_id,
            opacity: 1,
            date: geostoryLayers[0].range?.[0]?.value,
          },
        ],
        { shallow: false }
      );

      if (comparisonLayer && !compareLayers) {
        void setCompareLayers([{ id: comparisonLayer.layer_id, opacity: 1 }], { shallow: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geostoryLayers, comparisonLayer]);
  const { title, theme, color, id, description, monitors } = geostoryData || {};

  return (
    <div className="font-satoshi">
      <BackToMonitorsAndGeostories />
      {isGeostoryLoading && <Loading />}
      <div className="space-y-6 py-4">
        <CardHeader
          theme={theme}
          title={title}
          type="geostory"
          color={color}
          id={id}
          className="space-y-4"
          loading={isGeostoryLoading}
        />
        <p>{description}</p>
      </div>

      <Image
        src={`/images/geostories/${geostoryData?.id}.jpg`}
        alt={geostoryData?.title}
        className="h-auto w-full pb-8"
        width={300}
        height={200}
      />
      <GeostoryDialog {...geostoryData} />
      {/* Datasets/layers cards */}

      {!!geostoryLayers?.length ? (
        <div className="border-t border-white-900">
          <h2 className="py-2 font-medium">Datasets</h2>
          <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
            {geostoryLayers?.map((dataset) => {
              return (
                <li key={dataset.layer_id}>
                  <DatasetCard {...dataset} id={dataset.layer_id} isGeostory={false} />
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
    </div>
  );
};

export default GeostoryPage;
