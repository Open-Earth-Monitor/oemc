'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';
import { useSyncLayersSettings } from '@/hooks/sync-query';

import MobileExploreToolbar from '@/containers/explore/toolbar/mobile/toolbar';
import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import DatasetList from '@/components/datasets/list';
import Loading from '@/components/loading';
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar';

const DatasetPageComponent: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
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

  return (
    <>
      <div className="relative hidden md:block">
        <Sidebar className=" w-96 bg-black-400 px-9 py-12">
          <div>
            <BackToMonitorsAndGeostories />
            {isLoadingMonitorLayers ? (
              <Loading />
            ) : !isMonitorLayersError ? (
              <DatasetList data={data} monitorId={monitor_id} />
            ) : null}
          </div>
        </Sidebar>
        <div className="hidden w-full md:block">
          <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
            {/* Map + Trigger */}

            <SidebarTrigger />
          </div>
        </div>
      </div>
      <MobileExploreToolbar>
        {isLoadingMonitorLayers ? (
          <Loading />
        ) : !isMonitorLayersError ? (
          <DatasetList data={data} monitorId={monitor_id} />
        ) : null}
      </MobileExploreToolbar>
    </>
  );
};

export default DatasetPageComponent;
