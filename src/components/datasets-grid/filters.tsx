import { LuChevronDown } from 'react-icons/lu';

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
  handleDatasetTypeChange: (value: (typeof DATASET_TYPES)[number]) => void;
};

const DATASET_TYPES = ['monitors', 'geostories', 'all'] as const;

const FilterByDatasetType = ({ active, handleDatasetTypeChange }: FilterByDatasetTypeProps) => {
  return (
    <div className="flex items-center justify-between space-x-2.5">
      <span>Show:</span>
      <Select value={active} onValueChange={handleDatasetTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="All" className={buttonVariants({ variant: 'outline' })}>
            <span className="capitalize">{active}</span>
            <SelectIcon>
              <LuChevronDown className="h-5 w-5" />
            </SelectIcon>
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
