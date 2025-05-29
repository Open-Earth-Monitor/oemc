import { useState } from 'react';

import { cn } from '@/lib/classnames';

import { Label } from '@/components/ui/label';

import { Checkbox } from '../ui/checkbox';
import SortBy from '@/components/sort-by';

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
      <SortBy />
    </div>
  );
}

export default SidebarCheckbox;
