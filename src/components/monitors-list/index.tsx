'use client';
import { useMonitors } from '@/hooks/monitors';

import GeostoriesList from '@/components/geostories-list';
import Loading from '@/components/loading';

export const MonitorsList = () => {
  const { data, isLoading, isFetched, isError } = useMonitors();

  return (
    <ul className="text-white">
      <Loading visible={isLoading} />
      {isFetched &&
        !isError &&
        data?.map(({ id, title, author, description, geostories }) => (
          <li key={id} className="space-y-2 py-4">
            <h2 className="text-lg">{title}</h2>
            <p className="text-sm">Author: {author}</p>
            <p className="text-sm">Description: {description}</p>
            <GeostoriesList geostories={geostories} />
          </li>
        ))}
    </ul>
  );
};

export default MonitorsList;
