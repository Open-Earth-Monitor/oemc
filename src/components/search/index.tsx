import { FC, useRef, ChangeEvent, useCallback } from 'react';

import { HiOutlineChevronUp } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { cn } from '@/lib/classnames';

import { Button } from '@/components/ui/button';

import { THEME } from './constants';
import type { SearchProps } from './types';

const Search: FC<SearchProps> = ({
  theme = 'dark',
  value,
  setValue,
  label = 'Search',
  children = false,
  ...rest
}: SearchProps) => {
  const { placeholder } = rest;
  const ref = useRef<HTMLInputElement>();
  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e?.target?.value);
    },
    [setValue]
  );

  return (
    <form
      className={cn('relative flex h-14 w-full border-b border-secondary-700', {
        [THEME[theme]]: true,
      })}
      role="search"
      action=""
      method="get"
      onSubmit={(e) => e.preventDefault()}
    >
      <HiMagnifyingGlass
        className={cn({
          'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform': true,
          [THEME[theme]]: true,
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
        value={value}
        data-testid="search-input"
        className={cn(
          'flex-1 truncate bg-transparent px-10 font-inter leading-4 text-secondary-700 placeholder-secondary-700',
          {
            [THEME[theme]]: true,
          }
        )}
      />
      {!!children && <div className="h-full items-center">{children}</div>}
      {value !== '' && (
        <Button
          tabIndex={0}
          className="absolute right-3 z-10 flex h-5 w-5 items-center justify-center self-center p-0"
          type="button"
          variant="ghost"
          onClick={() => {
            setValue('');
            if (ref.current) {
              ref.current.focus();
            }
          }}
          aria-label="Empty search"
        >
          <HiOutlineChevronUp />
        </Button>
      )}
    </form>
  );
};

export default Search;
