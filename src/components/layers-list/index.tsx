'use client';
import { useCallback, MouseEvent } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useLayers } from '@/hooks/map';

import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';

export const LayersList = () => {
  const { data, isLoading, isFetched, isError } = useLayers();
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      router.replace(`${pathname}/?layers=[${evt.currentTarget.id}]`);
    },
    [pathname, router]
  );
  return (
    <ul className="text-white">
      <Loading visible={isLoading} />
      {isFetched &&
        !isError &&
        data.map(({ layer_id, title, author, description, license }) => (
          <li key={layer_id} className="space-y-2 py-4">
            <h4>{title}</h4>
            <p>Author: {author}</p>
            <p>Description: {description}</p>
            <p>License: {license}</p>
            <Button id={layer_id} type="button" onClick={handleClick}>
              Add layer
            </Button>
          </li>
        ))}
    </ul>
  );
};

export default LayersList;
