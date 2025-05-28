import { useMemo, useState } from 'react';

import { LuCheck } from 'react-icons/lu';
import { LuListFilter } from 'react-icons/lu';
import { Theme, THEMES } from '@/constants/themes';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TAG_STYLE } from '@/styles/constants';

import { Checkbox, CheckboxIndicator } from '../ui/checkbox';
import { RadioGroupItem, RadioGroup } from '../ui/radio-group';

import { SORTING } from './constants';
import { Dataset } from './types';

type FilterByCategoriesProps = {
  activeThemes: Theme[];
  handleThemes: (
    e: React.MouseEvent<
      Omit<
        HTMLButtonElement,
        'id' & {
          id: Theme;
        }
      >
    >
  ) => void;
};

type SortByProps = {
  sortingCriteria: string;
  handleSortingCriteria: (value: string) => void;
};

const FilterByCategories = ({ activeThemes, handleThemes }: FilterByCategoriesProps) => {
  const filteredThemes = useMemo(() => THEMES.filter((theme) => theme !== 'Unknown'), []);

  return (
    <>
      {filteredThemes.map((theme) => (
        <div
          key={`menu-item-${theme}`}
          className="flex w-full flex-1 items-center space-x-4 p-2 text-secondary-500"
        >
          <Checkbox
            id={theme}
            data-testid={`${theme}-checkbox`}
            onClick={handleThemes}
            defaultChecked
            checked={activeThemes.includes(theme)}
            className="h-5 w-5 border border-secondary-500 bg-transparent text-brand-500 outline-none ring-0 hover:bg-secondary-900 data-[state=checked]:border-none"
          >
            <CheckboxIndicator className="h-full w-full border-none bg-secondary-500 text-brand-500 outline-0 ring-0 hover:bg-secondary-900">
              <LuCheck className="h-4 w-4 fill-current" />
            </CheckboxIndicator>
          </Checkbox>
          <Label
            htmlFor={theme}
            className="flex w-full flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            {theme}
          </Label>
        </div>
      ))}
    </>
  );
};

const SortBy = ({ sortingCriteria, handleSortingCriteria }: SortByProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <div className="flex items-center justify-between space-x-6">
      <Select value={sortingCriteria} onValueChange={handleSortingCriteria}>
        <SelectTrigger className="w-fit min-w-[100px] border-none outline-none hover:bg-transparent">
          <div className="space-x-2.5">
            <span className="text-white-500/50">Sort by:</span>
            <span className="capitalize">{sortingCriteria}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="dropdown-menu-content">
          {SORTING.map((sort) => (
            <SelectItem key={sort} value={sort} data-testid={`${sort}-button`}>
              {sort}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <LuListFilter
        className="h-5 w-5 text-white-500"
        onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
      />
    </div>
  );
};

type FilterByFormatProps = {
  handleCategoriesFilter: (id: Dataset) => void;
  active: Dataset;
};

const FilterByFormat = ({ active, handleCategoriesFilter }: FilterByFormatProps) => {
  return (
    <RadioGroup
      defaultValue={active}
      className="font-inter items-center gap-4 py-3 pl-4 font-medium sm:flex sm:gap-2 sm:space-x-10 sm:pl-0"
      onValueChange={handleCategoriesFilter}
    >
      <div className="flex items-center space-x-2.5" data-testid="monitors-button-checkbox">
        <RadioGroupItem value="monitors" id="monitors" />
        <Label htmlFor="monitors" className={TAG_STYLE}>
          monitors
        </Label>
      </div>
      <div className="flex items-center space-x-2.5" data-testid="geostories-button-checkbox">
        <RadioGroupItem value="geostories" id="geostories" />
        <Label htmlFor="geostories" className={TAG_STYLE}>
          Geostories
        </Label>
      </div>
      <div className="flex items-center space-x-2.5" data-testid="all-button">
        <RadioGroupItem value="all" id="all" />
        <Label htmlFor="all" className={TAG_STYLE}>
          All
        </Label>
      </div>
    </RadioGroup>
  );
};

export { FilterByCategories, SortBy, FilterByFormat };
