import { FC, useRef } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { cn } from '@/lib/classnames';

import type { SearchProps } from './types';

const Search: FC<SearchProps> = ({
  value,
  setValue,
  label = 'Search',
  className,
  children,
  hasIcon = true,
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div
      className={cn('relative flex h-14 w-full outline-none', {
        [className]: !!className,
      })}
      aria-label="search"
      role="searchbox"
    >
      {hasIcon && (
        <HiMagnifyingGlass
          className={cn({
            'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform': true,
          })}
        />
      )}
      <label htmlFor="search">
        <span className="visually-hidden">{label}</span>
      </label>
      <input
        ref={ref}
        placeholder={placeholder}
        type="search"
        id="search"
        aria-label={label}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        data-testid="search-input"
        className="flex-1 truncate border-0 border-b-secondary-500 bg-transparent px-10 font-inter leading-4 text-secondary-700 placeholder-secondary-700 outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
      />
      {children}
      {value !== '' && (
        <button
          tabIndex={0}
          className="absolute right-3 z-10 flex items-center justify-center self-center p-0 text-secondary-700 hover:text-secondary-500"
          type="button"
          onClick={() => {
            setValue('');
            if (ref.current) {
              ref.current.focus();
            }
          }}
          aria-label="Empty search"
        >
          <Cross2Icon className="h-4 w-4 bg-transparent fill-current" />
        </button>
      )}
    </div>
  );
};

export default Search;
