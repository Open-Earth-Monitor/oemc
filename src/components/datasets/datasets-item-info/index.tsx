'use client';

import { FiInfo } from 'react-icons/fi';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const DatasetsItemInfo = ({ author }: { author: string }) => (
  <Popover>
    <PopoverTrigger data-testid="dataset-info-button">
      <FiInfo className="h-6 w-6 text-secondary-500" title="info" />
    </PopoverTrigger>
    <PopoverContent align="center" sideOffset={5} data-testid="dataset-info-content">
      <div className="flex flex-col">
        <ul>Data author</ul>
        <li>{author}</li>
      </div>
    </PopoverContent>
  </Popover>
);

export default DatasetsItemInfo;
