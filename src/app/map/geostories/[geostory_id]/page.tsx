'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import type { NextPage } from 'next';
import { HiArrowLeft } from 'react-icons/hi';
import { HiOutlineNewspaper, HiOutlineGlobeAlt } from 'react-icons/hi';

import type { MonitorParsed } from '@/types/monitors';

import { useGeostory, useGeostoryLayers } from '@/hooks/geostories';
import { useMonitors } from '@/hooks/monitors';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import GeostoryHeader from '@/components/geostories/header';
import Loading from '@/components/loading';

const findMonitorByGeoStoryId = (monitors: MonitorParsed[], geoStoryId: string) =>
  monitors?.find((monitor) =>
    monitor.geostories.some((geostory) => geostory.id === geoStoryId)
  ) satisfies MonitorParsed;

const GeostoryPage: NextPage<{ params: { geostory_id: string } }> = ({
  params: { geostory_id },
}) => {
  const { data: geostory, isLoading: isLoadingGeostory } = useGeostory({ geostory_id });
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
            className="sticky top-0 z-10 block space-x-3 bg-brand-500 pb-8 font-bold"
            data-testid="back-to-monitor"
            style={{ color }}
          >
            <HiArrowLeft className="inline-block h-6 w-6" />
            <span data-testid="monitor-title-back-btn">Back to {monitorTitle}.</span>
          </Link>
        )}
        {isLoadingGeostory && <Loading />}
        {geostory && !isLoadingGeostory && <GeostoryHeader {...geostory} color={color} />}
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
      {geostory && !isLoadingGeostory && (
        <div className="divide-y divide-secondary-900">
          <div className="p-6">
            <h3 className="flex items-center space-x-2">
              <HiOutlineGlobeAlt className="h-6 w-6" />
              <span className="font-satoshi text-2xl font-bold">Use cases</span>
            </h3>
            {geostory.use_case_link.length > 0 && (
              <ul className="space-y-2 py-2 font-bold">
                {geostory.use_case_link.map(({ url, title }) => (
                  <li key={title}>
                    <a href={url} className="underline">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-6">
            <h3 className="flex items-center space-x-2">
              <HiOutlineNewspaper className="h-6 w-6" />
              <span className="font-satoshi text-2xl font-bold">Publications</span>
            </h3>
            {geostory.publications.length > 0 && (
              <ul className="space-y-2 py-2 font-bold">
                {geostory.publications.map(({ url, title }) => (
                  <li key={title}>
                    <a href={url} className="underline">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeostoryPage;
