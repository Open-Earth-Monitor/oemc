import { FC, useCallback, MouseEvent } from 'react';

import cx from 'clsx';
import { AiTwotoneStar } from 'react-icons/ai';
import { useLocalStorage } from 'usehooks-ts';

import type { BookmarkControlProps } from './types';

export const BookmarkControl: FC<BookmarkControlProps> = ({
  bounds,
  className,
}: BookmarkControlProps) => {
  const [value, setValue] = useLocalStorage('map-bookmarks', '');
  const handleBookmark = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setValue('My bookmark value');
    },
    [setValue]
  );
  return (
    <button
      aria-label="Fit to bounds"
      className={cx({
        'rounded-sm bg-brand-500 p-1 text-secondary-500 disabled:cursor-default disabled:opacity-50':
          true,
        'hover:bg-gray-700 active:bg-gray-600': !!bounds,
        [className]: !!className,
      })}
      type="button"
      disabled={!bounds}
      onClick={handleBookmark}
    >
      <AiTwotoneStar />
    </button>
  );
};

export default BookmarkControl;
