'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { useMonitor, useMonitorLayers } from '@/hooks/monitors';
import { useSyncLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';
import CardHeader from '@/components/sidebar/card-header';
import MonitorDialog from '@/components/monitors/dialog';
import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

const DatasetPageComponent: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
  const {
    data: monitor,
    isLoading: isLoadingMonitor,
    isError: isMonitorError,
  } = useMonitor({ monitor_id });
  const {
    data,
    error,
    isLoading: isLoadingMonitorLayers,
    isError: isMonitorLayersError,
  } = useMonitorLayers({ monitor_id });
  const [layers, setLayers] = useSyncLayersSettings();

  // Only at beginning set the first layer
  useEffect(() => {
    if (data?.length && !layers) {
      void setLayers(
        [
          {
            id: data[0].layer_id,
            opacity: 1,
            date: data[0].range?.[0]?.value,
          },
        ],
        // Required to load layer on navigation
        { shallow: false }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error?.code === '400') return redirect('/not-found');

  const { title, theme, color, id, description, geostories } = monitor || {};
  console.log(color, 'pagina');
  return (
    <div>
      <BackToMonitorsAndGeostories />
      {isLoadingMonitorLayers && <Loading />}
      <div className="space-y-6 py-4">
        <CardHeader
          theme={theme}
          title={title}
          type="geostory"
          color={color}
          id={id}
          className="space-y-4"
          loading={isLoadingMonitor}
        />
        <p>{description}</p>
      </div>

      <MonitorDialog {...monitor} />
      <div className="space-y-6 py-8">
        {/* Datasets cards */}
        {!!data?.length && !isMonitorLayersError && (
          <div className="border-t border-white-900">
            <h2 className="py-2 font-medium">Datasets</h2>
            <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
              {data?.map((dataset) => {
                return (
                  <li key={dataset.layer_id}>
                    <DatasetCard
                      {...dataset}
                      id={dataset.layer_id}
                      isGeostory={false}
                      color={color}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {!!geostories?.length && !isMonitorLayersError && (
          <div className="border-t border-white-900">
            <h2 className="py-2 font-medium">Geostories</h2>
            <ul className="space-y-4 sm:space-y-6" data-testid="datasets-list">
              {geostories.map((geostory) => {
                return (
                  <Link href={`/map/geostories/${geostory.id}`} key={geostory.id}>
                    <li key={geostory.id} className="font-bold underline">
                      {geostory.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetPageComponent;
