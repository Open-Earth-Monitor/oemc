'use client';

import { useMonitors } from '@/hooks/monitors';

import Loading from '@/components/loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import MonitorsItem from './monitors-item';

const MonitorsDirectory = () => {
  const { data, isLoading, isFetched } = useMonitors();

  return (
    <>
      <Loading visible={isLoading && !isFetched} className="m-auto flex justify-center py-4" />
      {isFetched && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Monitors</TableHead>
              <TableHead>Geostories</TableHead>
              <TableHead>Publications</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
