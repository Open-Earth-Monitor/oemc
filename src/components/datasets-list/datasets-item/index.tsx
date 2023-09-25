'use client';
import { FC, useCallback } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/classnames';

import ItemHeader from '@/components/datasets-list/datasets-item-header';
import { Button } from '@/components/ui/button';
import { useURLayerParams } from '@/hooks';

const DatasetsItem: FC<{
  id: string;
  title: string;
  download_url: string;
  description: string;
  author: string;
}> = ({ id, title, download_url, description, author }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { layerId } = useURLayerParams();

  const isActive = layerId === id;

  // Create the layers object
  const layersObject = { id, opacity: 1 };

  // Encode the layers object as a JSON string
  const encodedLayers = decodeURIComponent(JSON.stringify(layersObject));

  // Construct the URL
  const url = `${pathname}/?layers=[${encodedLayers}]`;

  const handleClick = useCallback(() => {
    isActive ? router.replace(`${pathname}`) : router.replace(url);
  }, [pathname, router, isActive, url]);
  return (
    <li
      key={id}
      className="space-y-6 border-b border-b-brand-200 p-7.5 "
      data-testid={`dataset-item-${id}`}
    >
      <ItemHeader title={title} author={author} downloadUrlBase={download_url} />
      <p data-testid="dataset-description">{description}</p>

      <Button
        id={id}
        dataset-testid={id}
        type="button"
        className={cn({ 'w-full': true, '': isActive })}
        onClick={handleClick}
        variant={isActive ? 'default_active' : 'default'}
        size="sm"
      >
        {isActive ? 'Hide' : 'Show'} layer on the map
      </Button>
    </li>
  );
};

export default DatasetsItem;
