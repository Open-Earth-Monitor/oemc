'use client';

import { LuInfo } from 'react-icons/lu';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const DatasetsItemInfo = ({ author }: { author: string }) => (
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

export default DatasetsItemInfo;
