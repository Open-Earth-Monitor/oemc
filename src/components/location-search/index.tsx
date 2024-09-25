import React, { useCallback, useState } from 'react';

import { motion } from 'framer-motion';
import { LuSearch, LuX, LuChevronRight } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import Loading from '@/components/loading';
import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import type { Bbox } from '@/components/map/types';
import { Input } from '@/components/ui/input';

function LocationSearchComponent({
  isMobile,
  locationSearch,
  OPTIONS,
  handleLocationSearchChange,
  handleClick,
  isLoading,
  isFetching,
  className,
}: {
  isMobile?: boolean;
  locationSearch: string;
  OPTIONS: { label: string; value: number | undefined; bbox: Bbox }[];
  handleLocationSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (option: { label: string; value: number | undefined; bbox: Bbox }) => void;
  isLoading: boolean;
  isFetching: boolean;
  className?: string;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [inputExpanded, setInputExpanded] = useState(false); // State for input expansion on mobile

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
    if (!dropdownVisible) {
      setDropdownVisible(true);
    }
  };

  const handleExpanded = () => {
    if (!inputExpanded) {
      setInputExpanded(true);
    }
  };

  const handleCollapsed = () => {
    setInputExpanded(false);
  };

  return (
    <div
      className={cn('relative z-50 flex items-center', {
        'w-[300px]': inputExpanded,
      })}
    >
      <motion.div
        className={cn({
          [CONTROL_BUTTON_STYLES.mobile]: isMobile,
          [CONTROL_BUTTON_STYLES.default]: !isMobile,
          [className]: !!className,
          'flex items-center': !inputExpanded, // Center the input when not expanded
          'w-[300px] justify-start bg-[#09131DCC] px-4 hover:bg-brand-500 hover:text-secondary-500':
            inputExpanded, // Expand to full width when input is expanded
          'rounded-b-none': dropdownVisible && locationSearch && !!OPTIONS.length && inputExpanded,
        })}
        onClick={handleExpanded} // Handle click to expand/collapse input
      >
        <div
          className={cn({
            'flex h-full w-full items-center justify-center space-x-2': true,
            'w-[240px] justify-start': inputExpanded,
          })}
        >
          <LuSearch
            className={cn({
              'h-5 w-5 justify-center text-secondary-500 hover:bg-secondary-500 hover:text-brand-500':
                true,
              'hover:bg-transparent hover:text-secondary-500': inputExpanded,
            })}
          />
          {inputExpanded && (
            <Input
              type="text"
              className={cn({
                'z-50 flex h-full w-full flex-1 grow border-none bg-transparent caret-secondary-700 outline-none':
                  true,
              })}
              placeholder="Search"
              aria-label="Search locations"
              aria-controls="location-options"
              onChange={handleInputChange}
              value={locationSearch}
            />
          )}
        </div>
        {locationSearch && inputExpanded && (
          <button onClick={handleReset} className="absolute right-6 text-secondary-500">
            <LuX className="h-5 w-5" />
          </button>
        )}
        {inputExpanded && (
          <button onClick={handleCollapsed} className="absolute right-1 text-secondary-500">
            <LuChevronRight className="h-5 w-5" />
          </button>
        )}
      </motion.div>

      {(isLoading && isFetching) ||
        (dropdownVisible && locationSearch && !!OPTIONS.length && inputExpanded && (
          <div className="relative">
            <div
              className={cn({
                'absolute right-0 top-[17px] z-50 max-h-[40vh] w-[300px] flex-1 overflow-y-auto rounded-b-[4px] bg-[#09131DDF] px-10 font-inter leading-4 text-secondary-700 shadow-lg':
                  true,
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
