import { FC, useCallback, MouseEvent } from 'react';

import cx from 'clsx';
import { useLocalStorage } from 'usehooks-ts';

import Icon from 'components/icon';
import BOOKMARK_SVG from 'svgs/map/bookmark.svg?sprite';

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
        'rounded-sm bg-brand-600 p-1 text-secondary-200 disabled:cursor-default disabled:opacity-50':
          true,
        'hover:bg-gray-700 active:bg-gray-600': !!bounds,
        [className]: !!className,
      })}
      type="button"
      disabled={!bounds}
      onClick={handleBookmark}
    >
      <Icon icon={BOOKMARK_SVG} />
    </button>
  );
};

export default BookmarkControl;
