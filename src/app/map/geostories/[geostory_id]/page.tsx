'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import type { NextPage } from 'next';
import { HiArrowLeft } from 'react-icons/hi';

import type { MonitorParsed } from '@/types/monitors';

import { useGeostoryLayers } from '@/hooks/geostories';
import { useMonitors } from '@/hooks/monitors';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import GeostoryHead from '@/components/geostories/header';
import Loading from '@/components/loading';

const findMonitorByGeoStoryId = (monitors: MonitorParsed[], geoStoryId: string) =>
  monitors?.find((monitor) =>
    monitor.geostories.some((geostory) => geostory.id === geoStoryId)
  ) satisfies MonitorParsed;

const GeostoryPage: NextPage<{ params: { geostory_id: string } }> = ({
  params: { geostory_id },
}) => {
  const { data, isLoading, isFetched, isError } = useGeostoryLayers({ geostory_id });
  const { data: monitors } = useMonitors();
  const monitor = findMonitorByGeoStoryId(monitors, geostory_id);
  const [layers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const opacity = layers?.[0]?.opacity;
  const { title: monitorTitle, id: monitorId, color } = monitor || {};

  // Only show layers with position right
  const geostoryLayers = data?.filter(({ position }) => position === 'right');

  useEffect(() => {
    const comparisonLayer = data?.find(({ position }) => position === 'left');
    if (comparisonLayer && !compareLayers) {
      void setCompareLayers([{ id: comparisonLayer.layer_id, opacity }]);
    }
  }, [compareLayers, data, opacity, setCompareLayers]);

  return (
    <div className="space-y-6">
      <div className="divide-y divide-secondary-900">
        {monitorTitle && (
          <Link
            href={`/map/${monitorId}/geostories`}
            className="block space-x-3 pb-8 font-bold"
            data-testid="back-to-monitor"
            style={{ color }}
          >
            <HiArrowLeft className="inline-block h-6 w-6" />
            <span data-testid="monitor-title-back-btn">Back to {monitorTitle}.</span>
          </Link>
        )}
        <GeostoryHead geostoryId={geostory_id} color={color} />
      </div>
      <div>
        {isLoading && <Loading />}

        {isFetched && !isError && (
          <ul className="space-y-6" data-testid="datasets-list">
            {geostoryLayers.map((dataset, index) => (
              <li key={dataset.layer_id}>
                <DatasetCard
                  {...dataset}
                  type="geostory"
                  id={dataset.layer_id}
                  defaultActive={index === 0}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeostoryPage;
