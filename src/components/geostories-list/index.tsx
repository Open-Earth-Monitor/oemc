'use client';
import { useCallback, MouseEvent } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { GeoStoryTypes } from '@/types/datasets';

import { Button } from '@/components/ui/button';

export const GeostoriesList = ({ geostories }: { geostories: GeoStoryTypes[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = useCallback(
    (evt: MouseEvent<HTMLButtonElement>) => {
      router.replace(`${pathname}/?layers=[${evt.currentTarget.id}]`);
    },
    [pathname, router]
  );
  return (
    <div className="pl-4 text-white">
      {geostories.map(({ id, author, layers, title }) => (
        <div key={id}>
          <p>Geostory: {title}</p>
          <ul className="space-y-2 pl-4">
            {layers.map(({ layer_id, title, description }) => (
              <li key={layer_id} className="space-y-2 py-4">
                <h4>Layer: {title}</h4>
                <p>Author: {author}</p>
                <p>Description: {description}</p>

                <Button id={layer_id} type="button" onClick={handleClick}>
                  Add layer
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GeostoriesList;
