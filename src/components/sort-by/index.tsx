import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SetStateAction } from 'jotai';
import { LuListFilter } from 'react-icons/lu';

export type SortingCriteria = 'title' | 'date';

export type Dataset = 'monitors' | 'geostories' | 'all';

export const SORTING = ['title', 'date'] satisfies SortingCriteria[];

type SortByProps = {
  sortingCriteria: string;
  handleSortingCriteria: (value: string) => SetStateAction<SortingCriteria>;
};

const SortBy = ({ sortingCriteria, handleSortingCriteria }: SortByProps) => {
  return (
    <Select value={sortingCriteria} onValueChange={handleSortingCriteria}>
      <SelectTrigger className="w-fit border-none outline-none hover:bg-transparent">
        <div className="flex items-center justify-between space-x-9">
          <div className="space-x-2.5">
            <span className="text-white-500/50">Sort by:</span>
            <span className="capitalize">{sortingCriteria}</span>
          </div>
          <LuListFilter className="h-5 w-5 text-white-500" />
        </div>
      </SelectTrigger>
      <SelectContent className="min-w-fit p-2">
        {SORTING.map((sort) => (
          <SelectItem
            key={sort}
            value={sort}
            className="capitalize data-[highlighted]:bg-accent data-[highlighted]:text-white-900"
            data-testid={`${sort}-button`}
          >
            {sort}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortBy;
