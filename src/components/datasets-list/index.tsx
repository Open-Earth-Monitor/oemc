'use client';
import { useCallback, MouseEvent } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { LayerTypes } from '@/types/datasets';

import { Button } from '@/components/ui/button';

export const DatasetsList = ({ data }: { data: LayerTypes[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      router.replace(`${pathname}/?layers=[${evt.currentTarget.id}]`);
    },
    [pathname, router]
  );
  return (
    <div className="pl-4 text-secondary-200">
      <ul>
        {data.map(({ layer_id, title, description }) => (
          <li key={layer_id} className="space-y-6 border-b border-b-brand-200 p-7.5 ">
            <h3 className="text-2xl">{title}</h3>
            <p className="inter">{description}</p>

            <Button id={layer_id} type="button" className="w-full" onClick={handleClick}>
              Show layer on the map
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatasetsList;
