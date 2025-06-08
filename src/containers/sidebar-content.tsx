import { useState } from 'react';

import SortBy from '@/components/sort-by';
import { SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { useMonitorsAndGeostories } from '@/hooks/datasets';
import SidebarSelect from '@/components/sidebar/select';

import SidebarCheckbox from '@/components/sidebar/checkbox';
import SidebarDatasetCard from '@/components/sidebar/card';
import { SortingCriteria } from '@/components/datasets-grid/types';
import Loading from '@/components/loading';
import { useSyncTheme, useSyncDatasetType } from '@/hooks/sync-query';
import DatasetCardMonitor from '@/components/sidebar/card-monitor-content';
import DatasetCardGeostory from '@/components/sidebar/card-geostory-content';
import { Sidebar } from 'lucide-react';

const MapSidebarContent = () => {
  const [datasetType] = useSyncDatasetType();
  const [theme] = useSyncTheme();
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>('title');
  // Show more/fewer details about the datasets
  const [showDetail, setShowDetail] = useState(false);
  const {
    data: results,
    isLoading,
    isFetched,
  } = useMonitorsAndGeostories({
    ...(datasetType !== 'all' && { type: datasetType }),
    ...(theme !== 'all' && { theme: [theme] }),
    sort_by: sortingCriteria,
  });
  return (
    <Sidebar className="h-full w-full overflow-y-auto bg-white-500 bg-opacity-5">
      {/* Header */}
      <SidebarHeader>
        <div className="grid h-full w-full grid-cols-2 items-end justify-center gap-5">
          <h1 className="max-w-1/2 text-xl text-white-500">
            Explore our{' '}
            <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
              Monitors & Geostories
            </span>
          </h1>

          <span className="flex w-fit justify-end space-x-1 place-self-end rounded-full bg-white-500 bg-opacity-5 px-2 text-sm font-medium">
            <span>{results?.length}</span>
            {}
            {!isLoading && isFetched && <span>{results?.length === 1 ? 'result' : 'results'}</span>}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="py-6">
          <SidebarSelect />
        </div>
        <div className="flex items-center justify-between">
          <SidebarCheckbox setShowDetail={setShowDetail} />
          <SortBy sortingCriteria={sortingCriteria} handleSortingCriteria={setSortingCriteria} />
        </div>
        {/* Cards - Monitors & Geostories */}
        {isLoading && !isFetched && <Loading />}
        {!isLoading && isFetched && (
          <ul>
            {results?.map((result) => {
              return (
                <li key={result.id} className="mb-4">
                  <SidebarDatasetCard {...result}>
                    {result.type === 'monitor' && (
                      <DatasetCardMonitor showMore={showDetail} {...result} />
                    )}
                    {result.type === 'geostory' && (
                      <DatasetCardGeostory showMore={showDetail} {...result} />
                    )}
                  </SidebarDatasetCard>
                </li>
              );
            })}
          </ul>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default MapSidebarContent;
