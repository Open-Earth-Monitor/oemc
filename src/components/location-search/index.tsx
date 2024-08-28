import React, { useCallback, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import { LuSearch, LuX } from 'react-icons/lu';

import { cn } from '@/lib/classnames';
import { mobile } from '@/lib/media-queries';

import Loading from '@/components/loading';
import type { Bbox } from '@/components/map/types';
import { Input } from '@/components/ui/input';

function LocationSearchComponent({
  locationSearch,
  OPTIONS,
  handleLocationSearchChange,
  handleClick,
  isLoading,
  isFetching,
  className,
}: {
  locationSearch: string;
  OPTIONS: { label: string; value: number | undefined; bbox: Bbox }[];
  handleLocationSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (option: { label: string; value: number | undefined; bbox: Bbox }) => void;
  isLoading: boolean;
  isFetching: boolean;
  className?: string;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const isMobile = useMediaQuery(mobile);

  const handleReset = useCallback(() => {
    handleLocationSearchChange({
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
    setDropdownVisible(false);
  }, [handleLocationSearchChange]);

  const handleOptionClick = (option: { label: string; value: number | undefined; bbox: Bbox }) => {
    handleClick(option);
    setDropdownVisible(false);
    handleReset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLocationSearchChange(e);
    setDropdownVisible(true);
  };

  const width = 'w-40 sm:w-72 lg:w-96 xl:w-[620px]';

  return (
    <div
      className={cn({
        'absolute right-3 top-[86px] z-50': true,
        'left-3 w-full': isMobile,
      })}
    >
      <div
        className={cn({
          'relative z-40 flex h-14 items-center rounded-t-[4px] border border-secondary-500 bg-brand-50 px-4 font-inter leading-4':
            true,
          [width]: true,
          'rounded-[4px]': !locationSearch,
          'rounded-t-[4px]': locationSearch,
          'w-[calc(100vw-34px-40px)]': isMobile,
          [className]: !!className,
        })}
      >
        <div className="flex w-full items-center space-x-4">
          <LuSearch className="h-5 w-5 text-secondary-500" />
          <Input
            type="text"
            className="inset-0 z-50 flex h-full w-full flex-1 grow border-none bg-transparent caret-secondary-700 outline-none"
            placeholder="Search"
            aria-label="Search locations"
            aria-controls="location-options"
            onChange={handleInputChange}
            value={locationSearch}
          />
        </div>
        {locationSearch && (
          <button onClick={handleReset} className="absolute right-3 text-secondary-500">
            <LuX className="h-5 w-5" />
          </button>
        )}
      </div>
      {(isLoading && isFetching) ||
        (dropdownVisible && locationSearch && !!OPTIONS.length && (
          <div className="relative">
            <div
              className={cn({
                'absolute right-0 top-0 z-50 flex-1 rounded-b-[4px] border-b border-l border-r border-secondary-500 bg-brand-50 px-10 font-inter leading-4 text-secondary-700 shadow-lg':
                  true,
                [width]: true,
                'left-0 right-3 w-[calc(100vw-34px-40px)]': isMobile,
                [className]: !!className,
              })}
            >
              {isLoading && isFetching && <Loading />}
              {locationSearch && OPTIONS.length > 0 && (
                <ul id="location-options" role="listbox" className="space-y-2 py-2">
                  {OPTIONS.map((option) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected="false"
                      tabIndex={0}
                      className="cursor-pointer rounded p-2 hover:text-secondary-500"
                      onClick={() => handleOptionClick(option)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleOptionClick(option);
                        }
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
              {locationSearch && OPTIONS.length === 0 && !isFetching && !isLoading && (
                <p className="py-6 text-secondary-500">No results found.</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default LocationSearchComponent;
