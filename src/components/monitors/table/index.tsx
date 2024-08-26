'use client';

import { useMonitors } from '@/hooks/monitors';

import Loading from '@/components/loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import Item from './item';
import MonitorLink from './item/monitor';
import GeostoriesLink from './item/geostory';
import { useMediaQuery } from 'react-responsive';
import { mobile } from '@/lib/media-queries';

const MonitorsDirectory = () => {
  const isMobile = useMediaQuery(mobile);
  const { data, isLoading, isFetched, isError } = useMonitors();

  // Filtering monitors ready (not under development)
  const dataFiltered = data?.filter((d) => d.ready);

  return (
    <>
      {isLoading && !isFetched && <Loading />}
      {isFetched && !isError && !isMobile && (
        <Table className="z-[2000] h-full overflow-y-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Monitors</TableHead>
              <TableHead className="w-1/2">Geostories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-testid="monitors-list">
            {dataFiltered?.map((d) => (
              <TableRow key={d.id}>
                <Item data={d} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {isFetched &&
        !isError &&
        isMobile &&
        dataFiltered?.map((d) => (
          <div
            key={d.id}
            className="space-y-3 border-b border-t border-dashed border-b-secondary-500 border-t-secondary-500 border-opacity-[0.2] p-5 first:border-t-0 last:border-b-0"
          >
            <MonitorLink {...d} />
            <GeostoriesLink {...d} />
          </div>
        ))}
    </>
  );
};

export default MonitorsDirectory;
