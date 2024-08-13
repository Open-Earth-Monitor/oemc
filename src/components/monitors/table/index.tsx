'use client';

import { useMonitors } from '@/hooks/monitors';

import Loading from '@/components/loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import MonitorsItem from './item';

const MonitorsDirectory = () => {
  const { data, isLoading, isFetched, isError } = useMonitors();

  // Filtering monitors ready (not under development)
  const dataFiltered = data?.filter((d) => d.ready);

  return (
    <>
      {isLoading && !isFetched && <Loading />}
      {isFetched && !isError && (
        <Table className="h-full overflow-y-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Monitors</TableHead>
              <TableHead className="w-1/2">Geostories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-testid="monitors-list">
            {dataFiltered?.map((d) => (
              <TableRow key={d.id}>
                <MonitorsItem data={d} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default MonitorsDirectory;
