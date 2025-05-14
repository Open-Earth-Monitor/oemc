import { useMemo } from 'react';

import { LuCheck } from 'react-icons/lu';
import { Theme, THEMES } from '@/constants/themes';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown';
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

type SortByProps = {
  sortingCriteria: string;
  handleSortingCriteria: (value: string) => void;
};

const SortBy = ({ sortingCriteria, handleSortingCriteria }: SortByProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="font-inter flex h-full items-center border-0 px-0 py-2.5 hover:bg-brand-500 sm:border sm:border-secondary-900 sm:px-3 sm:hover:bg-secondary-900">
        <div>
          <span className="w-full">
            Sort <span className="hidden sm:inline"> by:</span>{' '}
          </span>
          <span className="hidden font-bold capitalize sm:inline">{sortingCriteria}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit p-4" sideOffset={-1} alignOffset={0} align="start">
        <RadioGroup
          defaultValue="title"
          value={sortingCriteria}
          className="font-inter flex w-full flex-1 font-medium"
          onValueChange={handleSortingCriteria}
        >
          <div className="align-left flex flex-col justify-start space-y-4">
            {SORTING.map((sort) => (
              <div
                key={sort}
                className="flex items-center space-x-3"
                data-testid={`${sort}-button`}
              >
                <RadioGroupItem value={sort} id={sort} />
                <Label htmlFor={sort} className="capitalize">
                  {sort}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
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
