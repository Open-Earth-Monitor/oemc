'use client';

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import { ChevronDownIcon } from 'lucide-react';

import cn from '@/lib/classnames';

import { useMonitorLayers } from '@/hooks/monitors';
import { useSyncLayersSettings } from '@/hooks/sync-query';

import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import DatasetList from '@/components/datasets/list';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar';

const DatasetPageComponent: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [showLegend, setShowLegend] = useState(false);

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
      <div className="fixed bottom-0 left-0 z-50 w-full text-sm md:hidden">
        {/* Drawer / Sheet */}
        <div
          className="
          z-50 max-h-[80vh]
           bg-black-500 text-white-500
          transition-transform
          "
          style={{
            transform: showDetails ? 'translateY(0)' : 'translateY(100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cn('relative  overflow-hidden p-4', showDetails && 'min-h-[80vh]')}>
            <div className="absolute inset-0 z-10 overflow-hidden pb-[60px]">
              <header className="sticky flex px-6 pb-2 pt-6">
                <BackToMonitorsAndGeostories />
              </header>
              <ScrollArea className="h-full">
                {isLoadingMonitorLayers ? (
                  <Loading />
                ) : !isMonitorLayersError ? (
                  <DatasetList data={data} monitorId={monitor_id} className="px-4" />
                ) : null}
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="flex h-[60px]">
          <Button
            className={cn({
              'z-60 relative flex w-full justify-between rounded-none border-none bg-black-500 px-6 py-2 text-sm text-white-500':
                true,
              'bg-accent-green text-black-500': showDetails,
            })}
            onClick={() => {
              if (showLegend) {
                setShowLegend(false);
              }

              setShowDetails(!showDetails);
            }}
          >
            <span>Monitor</span>
            <ChevronDownIcon
              size={24}
              className={cn({
                'text-accent-green transition-all': true,
                'rotate-180 text-black-500': showDetails,
              })}
            />
          </Button>
          <Button
            className={cn({
              'z-60 relative flex w-full justify-between rounded-none border-none bg-black-500 px-6 py-2  text-sm text-white-500':
                true,
              'bg-accent-green text-black-500': showLegend,
            })}
            onClick={() => {
              if (showDetails) {
                setShowDetails(false);
              }

              setShowLegend(!showLegend);
            }}
          >
            <span>Legend</span>
            <ChevronDownIcon
              size={24}
              className={cn({
                'text-accent-green transition-all': true,
                'rotate-180 text-black-500': showLegend,
              })}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DatasetPageComponent;
