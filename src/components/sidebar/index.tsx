'use client';

import { useDatasets } from '@/hooks/datasets';

import Badge from '@/components/badge';
import Loading from '@/components/loading';
import CardList from '@/components/sidebar/card-list';
import SidebarCheckbox from '@/components/sidebar/checkbox';
import SidebarSelect from '@/components/sidebar/select';
import SortBy from '@/components/sort-by';
import { SidebarContent, SidebarHeader } from '@/components/ui/sidebar';

function MapSidebar() {
  const {
    results,
    isLoading,
    isFetched,
    sortingCriteria,
    showDetail,
    setShowDetail,
    setSortingCriteria,
  } = useDatasets();

  return (
    <>
      <SidebarHeader className="p-0">
        <div className="grid h-full w-full grid-cols-2 items-end justify-center gap-5">
          <h1 className="max-w-1/2 text-xl text-white-500">
            Explore our <br />
            <span className="bg-[linear-gradient(131.67deg,_#1EEDBF_0%,_#75A1FF_100%)] bg-clip-text text-transparent">
              Monitors & Geostories
            </span>
          </h1>

          <Badge className="justify-end place-self-end">
            <span>{results?.length}</span>
            {}
            {!isLoading && isFetched && <span>{results?.length === 1 ? 'result' : 'results'}</span>}
          </Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="w-60 py-6">
          <SidebarSelect />
        </div>
        <div className="flex items-center justify-between">
          <SidebarCheckbox setShowDetail={setShowDetail} />
          <SortBy sortingCriteria={sortingCriteria} handleSortingCriteria={setSortingCriteria} />
        </div>
        {/* Cards - Monitors & Geostories */}
        {isLoading && !isFetched && <Loading />}
        {!isLoading && isFetched && results && <CardList data={results} showMore={showDetail} />}
      </SidebarContent>
    </>
  );
}

export default MapSidebar;
