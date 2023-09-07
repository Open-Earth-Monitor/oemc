'use client';

import { useLayerSource } from '@/hooks/map';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from 'components/icon';
import INFO_SVG from 'svgs/ui/info.svg?sprite';

export const DatasetsItemInfo = ({ layer_id }: { layer_id: string }) => {
  const { data } = useLayerSource({ layer_id });

  const { author } = data;

  return (
    <Popover>
      <PopoverTrigger> {<Icon icon={INFO_SVG} className="h-6 w-6 text-gray-300" />}</PopoverTrigger>
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
