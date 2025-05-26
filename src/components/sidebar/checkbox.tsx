import { useState } from 'react';

import { cn } from '@/lib/classnames';

import { Label } from '@/components/ui/label';

import { LuListFilter } from 'react-icons/lu';

import { Checkbox } from '../ui/checkbox';

function SidebarCheckbox() {
  const [showDetail, setShowDetail] = useState(false);

  const handleSelect = (value: boolean) => {
    setShowDetail(value);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-fit items-center justify-between space-x-2.5">
        <Label
          htmlFor="detail"
          className={cn({ 'text-accent-green': showDetail, 'text-white-500': !showDetail })}
        >
          Show details
        </Label>
        <div
          className={cn({
            'flex h-4 w-4 items-center justify-center rounded-full border': true,
            'border-accent-green': showDetail,
            'border-white-500': !showDetail,
          })}
        >
          <Checkbox
            id="detail"
            data-testid="detail-checkbox"
            defaultChecked
            onCheckedChange={handleSelect}
            className="h-3 w-3"
          />
        </div>
      </div>
      <div className="flex w-fit items-center justify-between space-x-2.5">
        <span className="text-white-500/50">Sort by:</span>
        <span>Title</span>
        <LuListFilter className="h-5 w-5 text-white-500" />
      </div>
    </div>
  );
}

export default SidebarCheckbox;
