import { FC, useId, useRef } from 'react';

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
  const id = useId();

  return (
    <div
      className={cn(
        'relative flex h-14 w-fit items-center outline-none transition-colors duration-200 ease-out',
        className
      )}
      role="search"
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <input
        ref={ref}
        id={id}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testid="search-input"
        className={cn(
          'flex-1 truncate bg-transparent px-10 font-inter leading-4',
          'text-secondary-700 placeholder-secondary-700',
          'border-0 outline-none ring-0',
          'disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm'
        )}
      />

      {children}

      {value !== '' && (
        <button
          type="button"
          onClick={() => {
            setValue('');
            ref.current?.focus();
          }}
          aria-label="Clear search"
          className={cn(
            'absolute right-3 flex items-center justify-center',
            'text-secondary-700 hover:text-secondary-500',
            'transition-colors duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          )}
        >
          <Cross2Icon className="h-4 w-4 fill-current" />
        </button>
      )}

      {hasIcon && value === '' && (
        <HiMagnifyingGlass
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2',
            'text-secondary-700/70 transition-colors duration-200 ease-out'
          )}
        />
      )}
    </div>
  );
};

export default Search;
