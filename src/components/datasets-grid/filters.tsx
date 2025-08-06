import cn from '@/lib/classnames';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectValue,
} from '@/components/ui/select';

import { buttonVariants } from '../ui/button';

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
    <div className={cn('flex items-center justify-between gap-2.5', className)}>
      <span>Show:</span>
      <Select value={active} onValueChange={handleDatasetTypeChange}>
        <SelectTrigger>
          <SelectValue
            placeholder="All"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
          >
            <span className="capitalize">{active}</span>
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
