import cn from '@/lib/classnames';

import { buttonVariants } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectValue,
} from '@/components/ui/select';

type FilterByDatasetTypeProps = {
  active: (typeof DATASET_TYPES)[number];
  className?: HTMLDivElement['className'];
  handleDatasetTypeChange: (value: (typeof DATASET_TYPES)[number]) => void;
};

const DATASET_TYPES = ['monitors', 'geostories', 'all'] as const;

const FilterByDatasetType = ({
  active,
  className,
  handleDatasetTypeChange,
}: FilterByDatasetTypeProps) => {
  return (
    <div className={cn('grid grid-cols-12 items-center justify-between gap-2', className)}>
      <span className="col-span-3">Show</span>
      <Select value={active} onValueChange={handleDatasetTypeChange}>
        <SelectTrigger className="col-span-9">
          <SelectValue
            placeholder="All"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'flex h-9 w-full justify-between'
            )}
          >
            <span className="text-sm capitalize">{active}</span>
            <SelectIcon />
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {DATASET_TYPES.map((type) => (
            <SelectItem key={type} value={type} data-testid={`${type}-option`}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByDatasetType;
