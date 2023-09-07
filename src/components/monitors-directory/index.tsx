'use client';

import { useMonitors } from '@/hooks/monitors';

import Loading from '@/components/loading';

import MonitorsItem from './monitors-item';

const MonitorsDirectory = () => {
  const { data, isLoading, isFetched } = useMonitors();

  return (
    <div className="bg-secondary-500 px-5 pb-1 pt-5">
      <h3 className="max-w-[55%] pb-10 text-5xl font-bold text-brand-500">Monitors directory.</h3>
      <Loading visible={isLoading} />
      {isFetched && data?.map((d) => <MonitorsItem key={d.id} data={d} />)}
    </div>
  );
};

export default MonitorsDirectory;
