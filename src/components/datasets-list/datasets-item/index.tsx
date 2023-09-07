'use client';
import { useCallback, useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { Button } from '@/components/ui/button';

export const DatasetsItems = ({
  layer_id,
  title,
  description,
}: {
  layer_id: string;
  title: string;
  description: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const layersId = params.get('layers');
  const layerParams = useMemo<string[]>(
    () => layersId?.substring(1, layersId?.length - 1).split(','),
    [layersId]
  ) satisfies string[];

  const isActive = layerParams?.includes(layer_id);
  const handleClick = useCallback(() => {
    isActive ? router.replace(`${pathname}`) : router.replace(`${pathname}/?layers=[${layer_id}]`);
  }, [pathname, router, isActive, layer_id]);

  return (
    <li key={layer_id} className="space-y-6 border-b border-b-brand-200 p-7.5 ">
      <h3 className="text-2xl">{title}</h3>
      <p className="inter">{description}</p>

      <Button
        id={layer_id}
        type="button"
        className={cn({ 'w-full': true, '': isActive })}
        onClick={handleClick}
        variant={isActive ? 'secondary' : 'default'}
      >
        {isActive ? 'Hide' : 'Show'} layer on the map
      </Button>
    </li>
  );
};

export default DatasetsItems;
