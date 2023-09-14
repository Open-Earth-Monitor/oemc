'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { useLayerSource } from '@/hooks/map';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const DatasetsItemInfo = ({ layer_id }: { layer_id: string }) => {
  const { data } = useLayerSource({ layer_id });
  const { author } = data ?? {};

  return (
    <Popover>
      <PopoverTrigger>
        {' '}
        <InformationCircleIcon className="h-6 w-6 text-gray-300" />
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={5}>
        <div className="flex flex-col">
          <ul>Data author</ul>
          <li>{author}</li>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatasetsItemInfo;
