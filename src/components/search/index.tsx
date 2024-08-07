import { FC, useRef, ChangeEvent, useCallback, useState } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { cn } from '@/lib/classnames';

import type { SearchProps } from './types';

// Debounce function using useState and useCallback
const useDebouncedValue = (callback: (value: string) => void, delay: number) => {
  const [value, setValue] = useState('');
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | null>(null);

  const debounce = useCallback(
    (val: string) => {
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef?.current);
      }
      if (callbackRef?.current) {
        timeoutRef.current = window.setTimeout(() => {
          callbackRef?.current(val);
          timeoutRef.current = null;
        }, delay);
      }
    },
    [delay]
  );

  const setDebouncedValue = useCallback(
    (val: string) => {
      if (value) {
        setValue(val);
        debounce(val);
      }
    },
    [debounce, value]
  );

  return [value, setDebouncedValue] as const;
};

const Search: FC<SearchProps> = ({
  setValue,
  label = 'Search',
  className,
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useDebouncedValue(setValue, 300);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={cn('relative flex h-14 w-full outline-none focus:border-red-400', {
        [className]: !!className,
      })}
      aria-label="search"
      role="searchbox"
    >
      <HiMagnifyingGlass
        className={cn({
          'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform': true,
        })}
      />

      <label htmlFor="search">
        <span className="visually-hidden">{label}</span>
      </label>
      <input
        ref={ref}
        placeholder={placeholder}
        type="search"
        id="search"
        aria-label={label}
        onInput={onInput}
        value={inputValue}
        data-testid="search-input"
        className="flex-1 truncate border-none bg-transparent px-10 font-inter leading-4 text-secondary-700 placeholder-secondary-700 outline-none focus:border-secondary-500"
        {...rest}
      />
      {inputValue !== '' && (
        <button
          tabIndex={0}
          className="absolute right-3 z-10 flex items-center justify-center self-center p-0 text-secondary-700 hover:text-secondary-500"
          type="button"
          onClick={() => {
            setInputValue('');
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
