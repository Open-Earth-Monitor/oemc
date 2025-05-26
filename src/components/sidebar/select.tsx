import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { HiChevronDown } from 'react-icons/hi';

type DatasetValue = 'monitors' | 'geostories' | 'all';

function SidebarSelect() {
  const [currentDataset, setDatasetType] = useState<DatasetValue>('monitors');

  const handleSelect = (value: DatasetValue) => {
    setDatasetType(value);
  };

  return (
    <div className="flex w-fit items-center justify-between space-x-2">
      <span className="text-white-700/50">Show:</span>
      <Select value={currentDataset} onValueChange={handleSelect}>
        <SelectTrigger className="w-fit rounded-full border border-white-700/50 bg-transparent px-3.5 py-2 text-white-500 hover:bg-secondary-900 focus:ring-secondary-700/50 focus-visible:ring-0 ">
          <>
            <SelectValue />
            <SelectIcon className="w-full">
              <HiChevronDown className="h-5 w-5" />
            </SelectIcon>
          </>
        </SelectTrigger>
        <SelectContent
          className="z-[1000] flex w-full items-center px-3.5 text-left"
          alignOffset={0}
          sideOffset={0}
        >
          <SelectItem className="px-2" value="monitors">
            <span className="rounded-sm px-2 py-1 hover:bg-secondary-900">Monitors</span>
          </SelectItem>
          <SelectItem className="px-2" value="geostories">
            <span className="rounded-sm px-2 py-1 hover:bg-secondary-900">Geostories</span>
          </SelectItem>
          <SelectItem className="px-2" value="all">
            <span className="rounded-sm px-2 py-1 hover:bg-secondary-900">All</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SidebarSelect;
