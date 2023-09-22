'use client';

import { useMonitors } from '@/hooks/monitors';

import Loading from '@/components/loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import MonitorsItem from './item';

const MonitorsDirectory = () => {
  const { data, isLoading, isFetched, isError } = useMonitors();
  return (
    <>
      <Loading visible={isLoading && !isFetched} className="m-auto flex justify-center py-4" />
      {isFetched && !isError && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Monitors</TableHead>
              <TableHead>Geostories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-testid="monitors-list">
            {data?.map((d) => (
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
