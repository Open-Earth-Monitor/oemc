'use client';

import { LuInfo } from 'react-icons/lu';

import { useLayerSource } from '@/hooks/map';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const DatasetsItemInfo = ({ layer_id }: { layer_id: string }) => {
  const { data } = useLayerSource({ layer_id });
  const { author } = data ?? {};

  return (
    <Popover>
      <PopoverTrigger>
        <LuInfo className="h-6 w-6 text-secondary-500" />
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
